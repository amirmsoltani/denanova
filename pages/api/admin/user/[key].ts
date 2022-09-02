import { checkSchema, validationResult } from "express-validator";
import {
  ApiHandler,
  errorException,
  withApiHandler,
  withErrorHandler,
} from "../../../../lib";
import { hashSync, genSaltSync } from "bcryptjs";

const validations = checkSchema({
  key: {
    equals: {
      errorMessage: "key is wrong",
      options: process.env.NEW_USER_KEY,
    },
  },
  email: {
    isEmail: {
      errorMessage: "email is wrong",
    },
  },
  fullName: {
    isLength: {
      errorMessage: "The fullName must be between 5 and 30 characters",
      options: { max: 30, min: 5 },
    },
  },
  password: {
    isStrongPassword: {
      errorMessage:
        "The password must contain 8 letters, symbols, small words, capital words and numbers",
      options: {
        minLength: 8,
        minSymbols: 1,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
      },
    },
  },
});

class FileHandler extends ApiHandler {
  async get() {
    const { fullName, email, password } = this.req.query;
    await Promise.all(
      validations.map((validation) => validation.run(this.req))
    );
    const errors = validationResult(this.req);

    if (!errors.isEmpty()) {
      throw errorException("form")(errors.array());
    }

    const user = await this.prisma.user.create({
      data: {
        email: email as string,
        fullname: fullName as string,
        password: hashSync(password as string, genSaltSync()),
        active: true,
      },
      select: { email: true, fullname: true },
    });

    this.res.status(200).json(user);
    this.res.end();
  }
}

export default withErrorHandler(withApiHandler(FileHandler));
