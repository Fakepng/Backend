import { z } from "zod";

import emailConfig from "@/configs/email.config";
import { tbsSendEmailResponse } from "@/utils/schema.util";
import logger from "@/utils/logger.util";

async function generateConfirmationEmail(
  email: string,
  username: string,
  token: string
) {
  const apiAuth = Buffer.from(
    `${process.env.TBS_API_KEY}:${process.env.TBS_API_SECRET}`
  ).toString("base64");

  const payload = {
    FIRST_NAME: username,
    EMAIL_ADDRESS: email,
    TBS_VERIFY_URL: emailConfig.verifyUrl.replace("{{token}}", token),
  };

  const subject = `Welcome to DressSense, ${username}!🎉`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${apiAuth}`,
    },
    body: JSON.stringify({
      template_uuid: emailConfig.template_uuid,
      payload: payload,
      mail_from: emailConfig.mail_from,
      mail_to: {
        email: email,
      },
      subject: subject,
    }),
  };

  const response = await fetch(emailConfig.endpoint, options);
  if (response.status !== 201) {
    const responseText = await response.text();
    logger.error({
      message: `(email.util.ts) Failed to send confirmation email ❌\n${responseText}`,
    });

    return null;
  }

  const parsedResponse = tbsSendEmailResponse.safeParse(await response.json());
  if (!parsedResponse.success) {
    logger.error({
      message: `(email.util.ts) Failed to parse tbs api response ❌\n${parsedResponse.error}`,
    });
  }
}

async function sentVerificationEmail(email: string, token: string) {
  await generateConfirmationEmail(email, "User", token);
}

export { sentVerificationEmail };
