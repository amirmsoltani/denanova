import {
  ApiHandler,
  errorException,
  withApiHandler,
  withAuthApi,
  withErrorHandler,
} from "../../../../lib";

class PostHandler extends ApiHandler {
  async delete() {
    const id = this.req.query.id as string;
    if (!/\d/g.test(id as string)) {
      throw errorException("notFound");
    }
    const post = await this.prisma.post.findUnique({
      where: { id: +id },
    });

    if (!post) {
      throw errorException("notFound");
    }

    await this.prisma.post.delete({ where: { id: +id } });

    this.res.status(200).json({ message: "post deleted" });
  }
}

export default withErrorHandler(withAuthApi(withApiHandler(PostHandler)));
