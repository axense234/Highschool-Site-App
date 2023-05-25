// Express
import express, { Response, Request } from "express";
// Async Error Wrapper
require("express-async-errors");
// Dotenv
import * as dotenv from "dotenv";
import path from "path";
// Security Middleware
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
// DB
import { connectToPostgres } from "./db/postgres";
import { connectToRedis } from "./db/redis";
// Routers
import authRouter from "./routers/auth";
import announcementsRouter from "./routers/announcements";
import teachersRouter from "./routers/teachers";
import usersRouter from "./routers/users";
// Middleware
import errorHandlerMiddleware from "./middleware/errorHandler";

dotenv.config({ path: path.resolve("../../", ".env") });

const app = express();
const PORT = process.env.SERVER_PORT || 4000;
console.log(process.env.SERVER_PORT);

app.use(cookieParser());
app.use(express.json());
app.use(express.raw());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://highschool-site-app-ca.netlify.app",
    ],
    credentials: true,
  })
);
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ msg: "Working." });
});

app.use("/", [announcementsRouter, teachersRouter, usersRouter, authRouter]);
app.use(errorHandlerMiddleware);

const startServer = async () => {
  try {
    await connectToRedis().then(() => {
      console.log("Connected to Redis! / Conectat la Redis!");
    });
    await connectToPostgres().then(() =>
      console.log("Connected to PostgreSQL! / Conectat la PostgreSQL!")
    );
    app.listen(PORT, () => {
      console.log(
        `Server is listening on port:${PORT}... / Serverul asculta pe portul:${PORT}`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
