import { Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
  definition: {
    info: {
      title: "Node.js Express typescript Boilerplate",
      version: "1.0.0",
      description: "A boilerplate for Node.js Express typescript",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Swagger",
        url: "https://swagger.io",
        email: "",
      },
    },
    produces: ["application/json"],
    consumes: ["application/json"],
  },
  apis: ["./src/routes/*.ts"],
};

export default swaggerOptions;
