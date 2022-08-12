import { withIronSessionApiRoute } from "iron-session/next";
import { getCookie, deleteCookie } from "cookies-next";
import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { options } from "./ironSession";
import { errorException } from "./errors";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

export type PayloadType = { id: number; email: string };

export const withAuthApi = <T = any>(
  handler: (
    req: NextApiRequest,
    res: NextApiResponse<T>,
    payload: PayloadType
  ) => unknown | Promise<unknown>
) => {
  return withIronSessionApiRoute(async (req, res) => {
    try {
      const token =
        req.session.jwtToken ||
        getCookie(process.env.COOKIE_TOKEN_NAME!, { req, res })?.toString();

      if (token) {
        const payload = verify(token, accessTokenSecret!) as PayloadType;

        if (!req.session.jwtToken) {
          req.session.jwtToken = token;
          await req.session.save();
        }
        return await handler(req, res, payload);
      }
      throw errorException("auth");
    } catch (e: any) {
      if (
        ["NotBeforeError", "JsonWebTokenError", "TokenExpiredError"].includes(
          e.name
        )
      ) {
        req.session.destroy();
        deleteCookie(process.env.COOKIE_TOKEN_NAME!, { res, req });
        throw errorException("authInvalid");
      }
      throw e;
    }
  }, options);
};
