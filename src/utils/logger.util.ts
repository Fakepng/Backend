import winston from "winston";
import loggerOption from "@/configs/logger.config";

const logger = winston.createLogger(loggerOption.create);

logger.configure(loggerOption.config);

export default logger;
