const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const pino = require("pino-http");
const pinoHttpPrint = require("pino-http-print");
const platformRouter = require("./controllers/platform");
const middlewares = require("./middlewares");
const config = require("./config");

/**
 * Initializes the server
 * @returns {express.Express}
 */
const initServer = () => {
  const app = express();

  // Initalize middlewares
  app.use(pino(pinoHttpPrint()));
  app.use(compression());
  app.use(helmet());
  app.use(express.json());
  app.use(
    cors({
      origin: config.whitelist
    })
  );

  // Setup routes
  app.get("/", (_req, res) => {
    res.json({
      message: "🌱🦄🌈✨👋🌎🌍🌏✨🌈🦄🌱"
    });
  });

  app.use("/api/v1", platformRouter);

  // Error handling
  app.use(middlewares.notFound);
  app.use(middlewares.errorHandler);

  return app;
};

module.exports = { initServer };
