/* eslint-disable no-console */
// App
import { app } from "..";
// Database Connectors
import { connectToPostgres } from "../db/postgres";
import { connectToRedis } from "../db/redis";

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connectToRedis().then(() => {
      console.log("Connected to Redis!");
    });
    await connectToPostgres();
    app.listen(PORT, () => {
      console.log(`Server is listening on port:${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

export default startServer;
