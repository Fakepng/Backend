import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import mqtt from "mqtt";

import corsOptions from "@/configs/cors.config";
import checkEnvironment from "@/utils/environment.util";
import httpCode from "@/constants/http.code.constant";
import logger from "@/utils/logger.util";
import baseMiddleware from "@/middlewares/base.middleware";
import baseRoute from "@/routes/base.route";
import { mqttController, mqttSubscribe } from "@/utils/mqtt.util";

dotenv.config();
checkEnvironment();

const app = express();
const swaggerDocument = YAML.load("./swagger.yaml");
const mqttClient = mqtt.connect(process.env.MQTT_BROKER!);

app.use(helmet());
app.disable("x-powered-by");
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

app.use(baseMiddleware);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res
    .status(httpCode.INTERNAL_SERVER_ERROR)
    .json({ message: "Something went wrong" });
});

// Handle routes
app.use("/", baseRoute);

if (process.env.NODE_ENV !== "production" || process.env.DOCS === "true") {
  logger.info("Swagger UI is running at /api-docs");
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpCode.NOT_FOUND).json({ message: "Not found" });
});

mqttClient.on("connect", async () => {
  await mqttSubscribe(mqttClient);
  logger.info("MQTT Broker connected 🌐");
});

mqttClient.on("error", (error) => {
  logger.error(`MQTT Broker error ❌\n${error}`);
});

mqttClient.on("message", async (topic, message) => {
  await mqttController(topic, message);
});

app.listen(parseInt(process.env.PORT || "3000"), () => {
  logger.info(`Server running at port ${process.env.PORT || "3000"} 🚀`);
});
