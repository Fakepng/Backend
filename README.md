# Node.js Express TypeScript Boilerplate

This is a boilerplate project for building a Node.js application using Express and TypeScript. It includes a Docker setup for containerization.

## Features

- Express.js for building the server
- TypeScript for type safety
- Docker for containerization
- Winston for logging
- Environment variable management with dotenv
- Swagger for API documentation
- Helmet for security
- CORS support

## Getting Started

### Prerequisites

- Node.js (>= 14)
- Docker (optional, for containerization)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Fakepng/node-express-typescript-boilerplate.git
   cd node-express-typescript-boilerplate
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

### Running the Application

#### Development

To run the application in development mode with hot-reloading:

```bash
pnpm run dev
```

#### Production

To build and run the application in production mode:

```bash
pnpm run build
pnpm start
```

### Docker

#### Build Docker Image

To build the Docker image:

```bash
docker build -t <image-name> .
```

#### Run Docker Container

To run the Docker container:

```bash
docker run -d -e NODE_ENV=production -v ${PWD}/logs:/app/logs -p 3000:3000 <image-name>
```

### Project Structure

```
.
├── src
│   ├── configs
│   │   ├── cors.config.ts
│   │   ├── logger.config.ts
│   │   └── cors.config.ts
│   ├── constants
│   │   └── http.code.constants.ts
│   ├── controllers
│   │   └── base.controller.ts
│   ├── database
│   ├── middlewares
│   │   └── base.middleware.ts
│   ├── routes
│   │   └── base.route.ts
│   ├── types
│   │   └── environment.d.ts
│   ├── utils
│   │   ├── environment.util.ts
│   │   └── logger.util.ts
│   └── app.ts
├── dist
├── logs
├── .env
├── Dockerfile
├── nodemon.json
├── package.json
├── tsconfig.json
├── .dockerignore
├── .gitignore
├── README.md
└── swagger.yaml
```

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```
NODE_ENV=development
PORT=3000
DOCS=true
```

### Logging

Logs are managed using Winston and are stored in the `logs` directory. You can configure the logging settings in `src/config/logger.config.ts`.

### API Documentation

API documentation is generated using Swagger. The documentation will be available at `/api-docs` under one of the following conditions:

1. `NODE_ENV` is not set to `production`
2. `DOCS` environment variable is set to `true`

To edit the Swagger documentation, modify the `swagger.yaml` file located in the root directory.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request.

### License

This project is licensed under the MIT License.
