import type { Request, Response } from "express";
import httpCode from "@/constants/http.code.constant";

async function loginV1(req: Request, res: Response) {
  res.status(httpCode.CREATED).json({ message: "Register successfully" });
}

export { loginV1 };
