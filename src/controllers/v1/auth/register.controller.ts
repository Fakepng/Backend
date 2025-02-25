import type { Request, Response } from "express";
import httpCode from "@/constants/http.code.constant";

import prisma from "@/database/prisma.database";
import bcrypt from "bcrypt";
import {
  emailSchema,
  usernameSchema,
  passwordSchema,
} from "@/utils/schema.util";
import { sentVerificationEmail } from "@/utils/email.util";

async function registerV1(req: Request, res: Response) {
  const { email, username, password } = req.body;

  try {
    emailSchema.safeParse(email);
    usernameSchema.safeParse(username);
    passwordSchema.safeParse(password);

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    await sentVerificationEmail(email, "token");

    return res
      .status(httpCode.CREATED)
      .json({ message: "Register successfully" });
  } catch (error) {
    return res.status(httpCode.BAD_REQUEST);
  }
}

export { registerV1 };
