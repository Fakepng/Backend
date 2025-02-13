import winston, { LoggerOptions } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, printf } = winston.format;

const loggerOption: {
  create: LoggerOptions;
  config: LoggerOptions;
} = {
  create: {
    format: combine(
      timestamp(),
      printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
  },
  config: {
    transports: [
      new DailyRotateFile({
        filename: "logs/%DATE%-error.log",
        level: "error",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
      }),
      new DailyRotateFile({
        filename: "logs/%DATE%-combined.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
      }),
      new winston.transports.Console(),
    ],
  },
};

export default loggerOption;
