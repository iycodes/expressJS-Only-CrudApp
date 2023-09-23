import express from "express";
import "express-async-errors"; // to throw our custom errors during async operations
import { PrismaClient } from "@prisma/client";
import helmet from "helmet";
// import HTTPErrors from "http-errors";
// import HTTPStatuses from "statuses";
import { transports, createLogger } from "winston";
import { json } from "body-parser";
import { errorHandler } from "./middlewares/myErrorHandler";
import { router } from "./routes/fruits";

export const prisma = new PrismaClient();
// const logger = createLogger({
//   transports: [new transports.Console()],
// });
export const server = express();

// middlewares
server.use(
  helmet({
    crossOriginEmbedderPolicy: false,
  })
);

server.use(json());
server.use(router);
server.use(errorHandler);
server.disable("x-powered-by");
server.use(express.static("public"));
