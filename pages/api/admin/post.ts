import { NextApiRequest, NextApiResponse } from "next";
import {
  ApiHandler,
  errorException,
  PayloadType,
  withApiHandler,
  withAuthApi,
  withErrorHandler,
} from "../../../lib";

import { checkSchema, validationResult } from "express-validator";

class PostHandler extends ApiHandler {
  async post() {
    const body = this.req.body;
    const titleExist = this.prisma.post.findUnique({
      where: { title: body.title },
    });
    
    const validations = checkSchema({
      title: {
        isString: {
          if: () => !!titleExist,
        },
        isLength: {
          options: { max: 100, min: 5 },
        },
      },
      content: {
        isString: true,
        isLength: {
          options: { min: 10 },
        },
      },
      files: {
        isArray: true,
        isLength: { options: { min: 1 } },
      },
      "files.*.fileId": {
        isInt: true,
        isIn: {
          options: [
            (
              await this.prisma.file.findMany({
                select: { id: true },
                where: {
                  id: { in: body.files.map((file: any) => file.fileId) },
                },
              })
            ).map((file) => file.id),
          ],
        },
      },
      "files.*.type": {
        isString: true,
        isIn: { options: ["slide", "post"] },
      },
      "file.*.name": {
        isString: true,
        isLength: {
          options: { min: 3 },
          errorMessage: "تعداد حرف های اسم باید بیشتر از ۳ باشد.",
        },
      },
      description: {
        isString: true,
        isLength: { options: { max: 255, min: 5 } },
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
        author: { connect: { id: this.payload!.id } },
        files: {
          create: body.files.map(
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
