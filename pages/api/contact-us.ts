import {
  ApiHandler,
  errorException,
  withApiHandler,
  withErrorHandler,
} from "../../lib";

import { checkSchema, validationResult } from "express-validator";

const validations = checkSchema({
  email: {
    isEmail: {
      errorMessage: "پترن ایمیل صحیح نمی باشد",
    },
  },
  subject: {
    isString: {
      errorMessage: "مقدار ارسالی اشتباه است",
    },
    isLength: {
      options: {
        min: 6,
        max: 100,
      },
      errorMessage: "طول جمله باید بین ۶ تا ۱۰۰ حرف باشد.",
    },
  },
  fullName: {
    isString: {
      errorMessage: "مقدار ارسالی اشتباه است",
    },
    isLength: {
      options: { min: 6, max: 30 },
      errorMessage: "طول اسم باید بین ۶ تا ۳۰ حرف باشد.",
    },
  },
  content: {
    isString: {
      errorMessage: "مقدار ارسالی اشتباه است",
    },
    isLength: {
      options: { min: 10, max: 1500 },
      errorMessage: "طول پیام باید بین ۱۰ تا ۱۵۰۰ حرف باشد.",
    },
  },
});

class ContactUsHandler extends ApiHandler {
  async post() {
    const body = this.req.body;

    await Promise.all(
      validations.map((validation) => validation.run(this.req))
    );
    const errors = validationResult(this.req);

    if (!errors.isEmpty()) {
      throw errorException("form")(errors.array());
    }

    const postCreated = await this.prisma.contactUs.create({
      data: {
        email: body.email,
        subject: body.subject,
        fullName: body.fullName,
        content: body.content,
      },
    });

    this.res.status(200).json(postCreated);
    this.res.end();
  }
}

export default withErrorHandler(withApiHandler(ContactUsHandler));
