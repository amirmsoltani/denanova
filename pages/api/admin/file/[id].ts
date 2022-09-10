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
    if (!/^\d$/g.test(id as string)) {
      throw errorException("notFound");
    }

    const file = await this.prisma.file.findUnique({
      where: { id: +id },
      include: { _count: { select: { posts: true } } },
    });

    if (!file) {
      throw errorException("notFound");
    }

    if (file._count.posts) {
      throw errorException("used");
    }

    await this.prisma.file.delete({ where: { id: +id } });
    fs.unlinkSync("./public/" + file.filePath);

    this.res.status(200).json({ message: "file deleted" });
  }
}

export default withErrorHandler(withAuthApi(withApiHandler(FileHandler)));
