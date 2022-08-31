import {
  ApiHandler,
  errorException,
  withApiHandler,
  withAuthApi,
  withErrorHandler,
} from "../../../../lib";

import { checkSchema, validationResult } from "express-validator";

class PostHandler extends ApiHandler {
  async post() {
    const body = this.req.body;
    const titleExist = this.prisma.post.findUnique({
      where: { title: body.title },
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
          errorMessage: "مقدار ارسالی اشتباه است",
        },
        isLength: {
          options: { max: 100, min: 5 },
          errorMessage: "طول رشته باید بین ۵ تا ۱۰۰ حرف باشد",
        },
      },
      content: {
        isString: { errorMessage: "مقدار ارسالی اشتباه است" },
        isLength: {
          options: { min: 10 },
          errorMessage: "طول رشته باید حداقال ۱۰ حرف باشد",
        },
      },
      files: {
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
      // "file.*.name": {
      //   isString: { errorMessage: "مقدار ارسالی اشتباه است" },
      //   isLength: {
      //     options: { min: 3 },
      //     errorMessage: "طول رشته باید حداقال ۳ حرف باشد",
      //   },
      // },
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

    const postCreated = await this.prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        description: body.description,
        type: body.type,
        author: { connect: { id: this.payload!.id } },
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

    this.res.status(200).json(postCreated);
    this.res.end();
  }
}

export default withErrorHandler(withAuthApi(withApiHandler(PostHandler)));
