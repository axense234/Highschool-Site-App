// Express
import { Request, Response } from "express";
// Persistences
import notifyUserPersistence from "../persistences/notifications/notifyUserPersistence";
import createUserSubscriptionPersistence from "../persistences/notifications/createUserSubscriptionPersistence";
// Templates
import getSingleSubscriptionPersistence from "../persistences/notifications/getSingleSubscriptionPersistence";
import removeUserSubscriptionPersistence from "../persistences/notifications/removeUserSubscriptionPersistence";

const publicVapidKey = (process.env.PUBLIC_VAPID_KEY as string) || "";
const privateVapidKey = (process.env.PRIVATE_VAPID_KEY as string) || "";

const subscribeUser = async (req: Request, res: Response) => {
  const subBody = req.body;
  const { userId, userType } = req.params;

  const createdSubPayload = await createUserSubscriptionPersistence(
    subBody,
    userId as string,
    userType as "ADMIN" | "PROFESOR" | "ELEV"
  );

  return res.status(createdSubPayload.statusCode).json(createdSubPayload);
};

const notifyUser = async (req: Request, res: Response) => {
  const { userId, userType } = req.params;
  const { notificationTitle, notificationMessage } = req.body;

  const foundSubscriptionPayload = await getSingleSubscriptionPersistence(
    userId,
    userType as "ADMIN" | "PROFESOR" | "ELEV"
  );

  if (
    foundSubscriptionPayload.statusCode === 200 &&
    foundSubscriptionPayload.subscription
  ) {
    const notificationPayload = await notifyUserPersistence(
      publicVapidKey,
      privateVapidKey,
      notificationTitle,
      notificationMessage,
      foundSubscriptionPayload.subscription
    );

    return res.status(notificationPayload.statusCode).json(notificationPayload);
  }

  return res
    .status(foundSubscriptionPayload.statusCode)
    .json(foundSubscriptionPayload);
};

const removeUserSubscription = async (req: Request, res: Response) => {
  const { userId, userType } = req.params;

  const removedSubscriptionPayload = await removeUserSubscriptionPersistence(
    userId,
    userType as "ADMIN" | "ELEV" | "PROFESOR"
  );

  return res
    .status(removedSubscriptionPayload.statusCode)
    .json(removedSubscriptionPayload);
};

export { notifyUser, subscribeUser, removeUserSubscription };
