import logger from "@/utils/logger.util";

async function checkEnvironment() {
  const env = process.env;

  const errors: string[] = [];

  if (!env.NODE_ENV) {
    errors.push("NODE_ENV is not defined");
  }

  if (!env.DATABASE_URL) {
    errors.push("DATABASE_URL is not defined");
  }

  if (env.NOTIFICATION === "gotify") {
    if (!env.GOTIFY_TITLE) {
      errors.push("GOTIFY_TITLE is not defined");
    }

    if (!env.GOTIFY_URL) {
      errors.push("GOTIFY_URL is not defined");
    }

    if (!env.GOTIFY_TOKEN) {
      errors.push("GOTIFY_TOKEN is not defined");
    }
  }

  if (!env.TBS_API_KEY) {
    errors.push("TBS_API_KEY is not defined");
  }

  if (!env.TBS_API_SECRET) {
    errors.push("TBS_API_SECRET is not defined");
  }

  if (!env.MQTT_BROKER) {
    errors.push("MQTT_BROKER is not defined");
  }

  if (!env.MQTT_DEFAULT_TOPIC) {
    errors.push("MQTT_DEFAULT_TOPIC is not defined");
  }

  if (!env.JWT_ACCESS_SECRET) {
    errors.push("JWT_ACCESS_SECRET is not defined");
  }

  if (!env.JWT_REFRESH_SECRET) {
    errors.push("JWT_REFRESH_SECRET is not defined");
  }

  if (errors.length > 0) {
    logger.error({
      message: `(environment.util.ts) Environment variables are not set ❌\n${errors}`,
    });
    throw new Error(`\n${errors.join("\n")}`);
  }

  logger.log({
    level: "info",
    message: `(environment.util.ts) Environment variables are all set ✅`,
  });
}

export default checkEnvironment;
