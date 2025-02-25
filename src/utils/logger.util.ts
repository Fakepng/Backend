import winston from "winston";
import loggerOption from "@/configs/logger.config";

const logger = winston.createLogger(loggerOption.create);

logger.configure(loggerOption.config);
logger.on("data", async (log) => {
  switch (log.level) {
    case "error":
      switch (process.env.NOTIFICATION) {
        case "gotify":
          await notifyGotify(log.message);
          break;

        default:
          break;
      }
      break;

    default:
      break;
  }
});

async function notifyGotify(message: string) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GOTIFY_TOKEN}`,
    },
    body: JSON.stringify({
      title: `${process.env.GOTIFY_TITLE}`,
      message: message,
    }),
  };

  await fetch(process.env.GOTIFY_URL!, options);
}

export default logger;
