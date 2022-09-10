import {
  ApiHandler,
  errorException,
  withApiHandler,
  withAuthApi,
  withErrorHandler,
} from "../../../../lib";
import { checkSchema, validationResult } from "express-validator";

class PostHandler extends ApiHandler {
  async getPost(files?: boolean) {
    const id = this.req.query.id as string;

    if (!/^\d$/g.test(id as string)) {
      throw errorException("notFound");
    }

    const post = await this.prisma.post.findUnique({
      where: { id: +id },
      include: {
        files: {
          select: {
            file: { select: { filePath: true, id: true } },
            type: true,
          },
        },
      },
    });

    if (!post) {
      throw errorException("notFound");
    }

    return post;
  }

  async delete() {
    const post = await this.getPost(true);
    await this.prisma.post.delete({ where: { id: post.id } });
    this.res.status(200).json({ message: "post deleted" });
    this.res.end();
  }

  async get() {
    const post = await this.getPost();
    this.res.status(200).json(post);
    this.res.end();
  }

  async put() {
    const post = await this.getPost();
    const body = this.req.body;
    const titleExist = await this.prisma.post.findFirst({
      where: { title: body.title, id: { not: post.id } },
    });

    const validations = checkSchema({
      type: {
        isString: { errorMessage: "مقدار ارسالی اشتباه است" },
        isIn: {
          options: [["company", "product"]],
          errorMessage: "type باید یکی از مقادیر company , product باشد",
        },
      },
      title: {
        isString: {
          if: () => !!titleExist,
          errorMessage:
            "مقدار ارسالی اشتباه است یا قبلا با این عوان پست دیگری وجود دارد",
        },
        isLength: {
          options: { max: 100, min: 5 },
          errorMessage: "طول رشته باید بین ۵ تا ۱۰۰ حرف باشد",
        },
      },
      content: {
        optional: true,
        isString: { errorMessage: "مقدار ارسالی اشتباه است" },
        isLength: {
          options: { min: 10 },
          errorMessage: "طول رشته باید حداقال ۱۰ حرف باشد",
        },
      },
      files: {
        optional: true,
        isArray: { errorMessage: "مقدار ارسالی اشتباه است" },
        isLength: {
          options: { min: 1 },
          errorMessage: "تعداد عکس های ارسالی باید حداقل ۱ عکس باشد",
        },
      },
      "files.*.fileId": {
        isInt: { errorMessage: "مقدار ارسالی اشتباه است" },
        isIn: {
          options: [
            (
              await this.prisma.file.findMany({
                select: { id: true },
                where: {
                  id: { in: body.files?.map((file: any) => file.fileId) },
                },
              })
            ).map((file) => file.id),
          ],
          errorMessage: "عکس ارسالی در دیتابیس وجود ندارد",
        },
      },
      "files.*.type": {
        isString: { errorMessage: "مقدار ارسالی اشتباه است" },
        isIn: {
          options: [["slide", "post"]],
          errorMessage: "نوع ارسالی باید یکی از گزینه های slide,post باشد",
        },
      },
      description: {
        isString: { errorMessage: "مقدار ارسالی اشتباه است" },
        isLength: {
          options: { max: 255, min: 5 },
          errorMessage: "طول رشته باید بین ۵ تا ۲۵۵ حرف باشد",
        },
      },
    });

    await Promise.all(
      validations.map((validation) => validation.run(this.req))
    );
    const errors = validationResult(this.req);

    if (!errors.isEmpty()) {
      throw errorException("form")(errors.array());
    }

    await this.prisma.postFile.deleteMany({
      where: {
        postId: post.id,
      },
    });

    const updated = await this.prisma.post.update({
      where: { id: post.id },
      data: {
        title: body.title,
        content: body.content,
        description: body.description,
        type: body.type,
        files: {
          create: body.files?.map(
            (file: { fileId: number; type: "slide" | "post" }) => ({
              fileId: file.fileId,
              type: file.type,
            })
          ),
        },
      },
      include: { files: { select: { file: true, type: true } } },
    });

    this.res.status(201).json(updated);
    this.res.end();
  }
}

export default withErrorHandler(withAuthApi(withApiHandler(PostHandler)));
