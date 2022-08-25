import { withIronSessionSsr } from "iron-session/next";
import { getCookie, deleteCookie } from "cookies-next";
import { verify } from "jsonwebtoken";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { options } from "./ironSession";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

type PayloadType = { id: number; email: string };

export const withAuthSsr = <
  P extends {
    [key: string]: unknown;
  } = {
    [key: string]: unknown;
  }
>(
  handler: (
    context: GetServerSidePropsContext,
    payload?: PayloadType
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
  redirectTo: string = "/admin/login"
) => {
  return withIronSessionSsr(async ({ req, res, ...context }) => {
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

        return await handler({ res, req, ...context }, payload);
      }

      return { redirect: { destination: redirectTo, permanent: false } };
    } catch (e: any) {
      if (
        ["NotBeforeError", "JsonWebTokenError", "TokenExpiredError"].includes(
          e.name
        )
      ) {
        req.session.destroy();
        deleteCookie(process.env.COOKIE_TOKEN_NAME!, { res, req });
        return { redirect: { destination: redirectTo, permanent: false } };
      }
      throw e;
    }
  }, options);
};
