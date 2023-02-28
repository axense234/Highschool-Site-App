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
// Routers
import announcementsRouter from "./routers/announcements";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ msg: "Working." });
});

app.use("/", [announcementsRouter]);

const startServer = async () => {
  try {
    await connectToPostgres().then(() =>
      console.log("Connected to PostgreSQL!")
    );
    app.listen(PORT, () => {
      console.log(`Server is listening on port:${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
