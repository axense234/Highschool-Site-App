// Express
import express, { Response, Request } from "express";
// Async Error Wrapper
require("express-async-errors");
// Dotenv
import * as dotenv from "dotenv";
// Security Middleware
import cors from "cors";
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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.raw());
app.use(cors());

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
