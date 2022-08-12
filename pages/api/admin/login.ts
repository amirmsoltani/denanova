import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { PrismaClient } from "prisma/prisma-client";
import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { setCookie } from "cookies-next";
import { errorException, options, withErrorHandler } from "../../../lib";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;

  const prisma = new PrismaClient();

  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (user && compareSync(body.password, user.password!)) {
    const jwt = sign(
      {
        id: user!.id!,
        email: user!.email,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      },
      accessTokenSecret!
    );

    setCookie(process.env.COOKIE_TOKEN_NAME!, jwt, {
      req,
      res,
      maxAge: 60 * 60 * 24 * 7,
    });
    req.session.jwtToken = jwt;
    await req.session.save();

    res.status(200).json({ token: jwt });
    res.end();

    return void 0;
  }
  throw errorException("login");
};

export default withErrorHandler(withIronSessionApiRoute(handler, options));
