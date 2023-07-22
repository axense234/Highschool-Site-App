// Express
import express from "express";

// Controllers and Middleware
import {
  notifyUser,
  subscribeUser,
  removeUserSubscription,
} from "../app/interactors/notificationsInteractors";
import authenticationMiddleware from "../middleware/authentication";

const router = express.Router();

router.post(
  "/notifications/notify/:userId/:userType",
  authenticationMiddleware,
  notifyUser
);

router.post(
  "/notifications/subscribe/:userId/:userType",
  authenticationMiddleware,
  subscribeUser
);

router.delete(
  "/notifications/unsubscribe/:userId/:userType",
  authenticationMiddleware,
  removeUserSubscription
);

export default router;
