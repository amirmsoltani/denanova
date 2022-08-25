import {
  ApiHandler,
  withApiHandler,
  withAuthApi,
  withErrorHandler,
} from "../../../../lib";

class FileHandler extends ApiHandler {
  async get() {
    const pagination = this.pagination!;
    const search = (this.req.query.search as string) || "";

    const files = await this.prisma.file.findMany({
      where: { name: { contains: search } },
      take: pagination.pageSize,
      skip: pagination.pageSize * (pagination.page - 1),
    });
    pagination!.counts = await this.prisma.file.count();
    pagination!.lastPage = Math.ceil(pagination.counts / pagination.pageSize);

    this.res.status(200).json({ pagination, contents: files });
    this.res.end();
  }
}

export default withErrorHandler(withAuthApi(withApiHandler(FileHandler)));
