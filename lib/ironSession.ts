import type { IronSessionOptions } from "iron-session";

export const options: IronSessionOptions = {
  cookieName: process.env.COOKIE_NAME!,
  password: process.env.PASSWORD!,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: undefined,
    expires: undefined,
  },
};
