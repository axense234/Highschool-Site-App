// Express
import express from "express";

// Controllers and Middleware
import { notifyUser } from "../app/interactors/notificationsInteractors";
import authenticationMiddleware from "../middleware/authentication";

const router = express.Router();

router.post(
  "/notifications/notify/:userId",
  authenticationMiddleware,
  notifyUser
);

export default router;
