declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      PORT: string;
      DATABASE_URL: string;
      NOTIFICATION: string;
      GOTIFY_TITLE: string;
      GOTIFY_URL: string;
      GOTIFY_TOKEN: string;
      TBS_API_KEY: string;
      TBS_API_SECRET: string;
      MQTT_BROKER: string;
      MQTT_DEFAULT_TOPIC: string;
      JWT_ACCESS_SECRET: string;
      JWT_REFRESH_SECRET: string;
    }
  }
}

export {};
