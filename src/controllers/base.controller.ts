import type { Request, Response } from "express";
import httpCode from "@/constants/http.code.constant";

function hello(req: Request, res: Response) {
  res.status(httpCode.OK).json({ message: "Hello world!" });
}

export { hello };
