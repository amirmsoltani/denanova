import { v4 } from "uuid";
import dayjs from "dayjs";
import formidable from "formidable";
import fs from "fs";

import {
  ApiHandler,
  errorException,
  withApiHandler,
  withAuthApi,
  withErrorHandler,
} from "../../../lib";

/* Don't miss that! */
export const config = {
  api: {
    bodyParser: false,
  },
};

class UploadImageHandler extends ApiHandler {
  async post() {
    const form = new formidable.IncomingForm();
    form.parse(this.req, async (err, fields, files) => {
      const name = fields.name as string;
      const file = files.image as formidable.File;

      if (err) {
        this.res.status(err.httpCode || 400).json({ message: String(err) });
        return;
      } else if (
        [undefined, null, ""].includes(name) ||
        typeof name !== "string"
      ) {
        this.res
          .status(400)
          .json(errorException("form")(["فیلد نام نا معتبر"]));
        return;
      } else if (file.size > 1024 * 1024 * 4) {
        this.res
          .status(400)
          .json(errorException("form")(["فیلد image نا معتبر"]));
        return;
      }

      const data = fs.readFileSync(file.filepath);
      const filePath = `./${
        process.env.NODE_ENV === "development" ? "public/" : ""
      }uploadedImages/${dayjs().format("MM-DD-YYYY")}`;

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      const path = `${filePath}/${v4()}.${
        file.originalFilename?.split(/\./g)?.reverse()[0]
      }`;
      fs.writeFileSync(path, data);

      const prismaFile = await this.prisma.file.create({
        data: { filePath: path.replace("./public", ""), name },
      });

      fs.unlinkSync(file.filepath);
      return this.res.status(201).json(prismaFile);
    });
  }
}

export default withErrorHandler(
  withAuthApi(withApiHandler(UploadImageHandler))
);
