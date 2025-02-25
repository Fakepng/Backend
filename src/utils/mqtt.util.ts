import mqtt from "mqtt";

import {
  getDevices,
  writeEnvironmentData,
  writeParticulateMatterData,
  writeSensorData,
} from "@/utils/query/device.util";
import {
  environmentStatus,
  particulateMatterStatus,
} from "@/utils/schema.util";
import { Sensor } from "@prisma/client";

enum Topics {
  BASE = 0,
  SN = 1,
  SENSOR = 2,
  TYPE = 3,
}

const Sensors = [
  "environment",
  "particulatematter",
  "door",
  "light",
  "ventilation",
  "ozone",
  "uv",
];

async function mqttController(topic: string, message: Buffer) {
  const topics = topic.split("/");
  if (topics[Topics.BASE] !== process.env.MQTT_DEFAULT_TOPIC) return;

  switch (topics[Topics.SENSOR]) {
    case "environment":
      const environment = environmentStatus.safeParse(
        JSON.parse(message.toString())
      );
      if (!environment.success) return;

      await writeEnvironmentData(topics[Topics.SN], {
        temperature: environment.data.t,
        humidity: environment.data.h,
        pressure: environment.data.p,
      });
      break;

    case "particulatematter":
      const particulateMatter = particulateMatterStatus.safeParse(
        JSON.parse(message.toString())
      );
      if (!particulateMatter.success) return;

      await writeParticulateMatterData(topics[Topics.SN], {
        pm1: particulateMatter.data.pm1,
        pm2_5: particulateMatter.data.pm25,
        pm10: particulateMatter.data.pm10,
      });
      break;

    case "door":
    case "light":
    case "ventilation":
    case "ozone":
    case "uv":
      const value = message.toString() === "ON" ? true : false;
      const sensor = topics[Topics.SENSOR].toUpperCase();
      if (!Object.values(Sensor).includes(sensor as Sensor)) return;
      const sensorValue = sensor as Sensor;

      await writeSensorData(topics[Topics.SN], sensorValue, value);
      break;

    default:
      break;
  }
}

async function mqttSubscribe(client: mqtt.MqttClient) {
  const devices = await getDevices({ serialNumber: true }, { deletedAt: null });

  devices.forEach((device) => {
    Sensors.forEach((sensor) => {
      client.subscribe(
        `${process.env.MQTT_DEFAULT_TOPIC}/${device.serialNumber}/${sensor}/stat_t`
      );
    });
  });
}

export { mqttController, mqttSubscribe };
