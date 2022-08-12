import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const withErrorHandler = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (e: any) {
      if (e.isHandledError) {
        res.status(e.status).json({ message: e.message });
        res.end();
        return void 0;
      }
      console.log(e);
      res.status(500).json({ message: "Internal Server Erro" });
    }
  };
};
