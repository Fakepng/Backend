import { z } from "zod";
import profaneWords from "profane-words";

const tbsSendEmailResponse = z.object({
  message_id: z.string(),
  credit_type: z.enum(["email"]),
  credit_used: z.number(),
  credit_remain: z.number(),
});

const environmentStatus = z.object({
  t: z.number(),
  h: z.number(),
  p: z.number(),
});

const particulateMatterStatus = z.object({
  pm1: z.number(),
  pm25: z.number(),
  pm10: z.number(),
});

const nonAllowedWords = [
  "admin",
  "root",
  "superuser",
  "moderator",
  "staff",
  ...profaneWords,
];

const emailSchema = z.string().email();

const usernameSchema = z
  .string()
  .min(3)
  .max(20)
  .refine((value) => !nonAllowedWords.includes(value.toLowerCase()), {
    message: "Username contains a non-allowed word",
  });

const passwordSchema = z
  .string()
  .min(6)
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");
// .regex(
//   /[^a-zA-Z0-9]/,
//   "Password must contain at least one special character"
// );

export {
  tbsSendEmailResponse,
  environmentStatus,
  particulateMatterStatus,
  emailSchema,
  usernameSchema,
  passwordSchema,
};
