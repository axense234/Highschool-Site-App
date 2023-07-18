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
// Swagger
import expressUI from "swagger-ui-express";
// DB
import { connectToPostgres } from "./db/postgres";
import { connectToRedis } from "./db/redis";
// Routers
import absencesRouter from "./routers/absences";
import adminsRouter from "./routers/admins";
import announcementsRouter from "./routers/announcements";
import authRouter from "./routers/auth";
import cardsRouter from "./routers/cards";
import cardSectionsRouter from "./routers/cardSections";
import cataloguesRouter from "./routers/catalogues";
import emailRouter from "./routers/email";
import gradesRouter from "./routers/grades";
import studentsRouter from "./routers/students";
import teachersRouter from "./routers/teachers";
import booksRouter from "./routers/books";
import classesRouter from "./routers/classes";
import bookmarksRouter from "./routers/bookmarks";
import notificationsRouter from "./routers/notifications";
// Middleware
import errorHandlerMiddleware from "./middleware/errorHandler";
import swaggerDocs from "./utils/swagger";
import startServer from "./app/invoker";

dotenv.config({ path: path.resolve("../../", ".env") });

export const app = express();

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

app.use("/", [
  absencesRouter,
  adminsRouter,
  announcementsRouter,
  authRouter,
  cardsRouter,
  cardSectionsRouter,
  cataloguesRouter,
  emailRouter,
  gradesRouter,
  studentsRouter,
  teachersRouter,
  booksRouter,
  classesRouter,
  bookmarksRouter,
  notificationsRouter,
]);
app.use("/api/1.0.0/en/docs", expressUI.serve, expressUI.setup(swaggerDocs));
app.use(errorHandlerMiddleware);

startServer();
