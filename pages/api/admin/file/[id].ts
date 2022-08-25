import {
  ApiHandler,
  errorException,
  withApiHandler,
  withAuthApi,
  withErrorHandler,
} from "../../../../lib";
import fs from "fs";

class FileHandler extends ApiHandler {
  async delete() {
    const id = this.req.query.id as string;
    if (!/\d/g.test(id as string)) {
      throw errorException("notFound");
    }

    const file = await this.prisma.file.findUnique({ where: { id: +id } });

    if (!file) {
      throw errorException("notFound");
    }

    const posts = await this.prisma.post.findMany({
      where: { files: { none: { fileId: +id } } },
    });

    if (posts.length) {
      throw errorException("used");
    }
    fs.unlinkSync("./public/"+file.filePath);
    await this.prisma.file.delete({ where: { id: +id } });

    this.res.status(200).json({ message: "file deleted" });
  }
}

export default withErrorHandler(withAuthApi(withApiHandler(FileHandler)));
