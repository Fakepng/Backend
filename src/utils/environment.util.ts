import logger from "@/utils/logger.util";

async function checkEnvironment() {
  const env = process.env.NODE_ENV;

  const errors: string[] = [];

  if (!env) {
    errors.push("NODE_ENV is not defined");
  }

  if (errors.length > 0) {
    logger.error({
      message: `(environment.util.ts) Environment variables are not set ❌`,
      errors: errors,
    });
    throw new Error(`\n${errors.join("\n")}`);
  }

  logger.log({
    level: "info",
    message: `(environment.util.ts) Environment variables are all set ✅`,
  });
}

export default checkEnvironment;
