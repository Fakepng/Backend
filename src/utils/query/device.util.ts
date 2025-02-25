import prisma from "@/database/prisma.database";
import { Prisma, Sensor } from "@prisma/client";

async function getDeviceById(id: string, select: Prisma.DeviceSelect) {
  return prisma.device.findUnique({
    where: {
      id: id,
      deletedAt: null,
    },
    select: select,
  });
}

async function getDeviceBySerial(serial: string, select: Prisma.DeviceSelect) {
  return prisma.device.findUnique({
    where: {
      serialNumber: serial,
      deletedAt: null,
    },
    select: select,
  });
}

async function getDevices(
  select: Prisma.DeviceSelect,
  where: Prisma.DeviceWhereInput
) {
  return prisma.device.findMany({
    where: where,
    select: select,
  });
}

async function writeEnvironmentData(
  deviceId: string,
  data: {
    temperature: number;
    humidity: number;
    pressure: number;
  }
) {
  return prisma.device.update({
    where: {
      serialNumber: deviceId,
    },
    data: {
      DeviceEnvironment: {
        create: {
          temperature: data.temperature,
          humidity: data.humidity,
          pressure: data.pressure,
        },
      },
    },
  });
}

async function writeParticulateMatterData(
  deviceId: string,
  data: {
    pm1: number;
    pm2_5: number;
    pm10: number;
  }
) {
  return prisma.device.update({
    where: {
      serialNumber: deviceId,
    },
    data: {
      DeviceParticulateMatter: {
        create: {
          pm1: data.pm1,
          pm2_5: data.pm2_5,
          pm10: data.pm10,
        },
      },
    },
  });
}

async function writeSensorData(
  deviceId: string,
  sensor: Sensor,
  value: boolean
) {
  return prisma.device.update({
    where: {
      serialNumber: deviceId,
    },
    data: {
      DeviceSensor: {
        create: {
          sensor: sensor,
          value: value,
        },
      },
    },
  });
}

async function getDeviceSensor(
  deviceId: string,
  sensor: Sensor,
  select: Prisma.DeviceSensorSelect
) {
  return prisma.deviceSensor.findFirst({
    where: {
      deviceId: deviceId,
      sensor: sensor,
    },
    select: select,
  });
}

export {
  getDeviceById,
  getDeviceBySerial,
  getDevices,
  writeEnvironmentData,
  writeParticulateMatterData,
  writeSensorData,
  getDeviceSensor,
};
