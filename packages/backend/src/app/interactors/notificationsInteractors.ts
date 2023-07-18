// Express
import { Request, Response } from "express";
// Persistences
import notifyUserPersistence from "../persistences/notifications/notifyUserPersistence";

const publicVapidKey = (process.env.WEB_PUSH_PUBLIC_KEY as string) || "";
const privateVapidKey = (process.env.WEB_PUSH_PRIVATE_KEY as string) || "";

const notifyUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { notificationTitle, notificationMessage } = req.body;

  const notifiedUserPayload = await notifyUserPersistence(
    publicVapidKey,
    privateVapidKey,
    userId,
    notificationTitle,
    notificationMessage
  );

  console.log(notifiedUserPayload);

  return res.status(notifiedUserPayload.statusCode).json(notifiedUserPayload);
};

export { notifyUser };
