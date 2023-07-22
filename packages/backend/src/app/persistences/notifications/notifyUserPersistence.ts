// Notifications
import webpush, { PushSubscription } from "web-push";
// Status Codes
import { StatusCodes } from "http-status-codes";
import { TemplateWebPushSubscription } from "../../../core/types/TemplateWebPushSubscription";

const notifyUserPersistence = async (
  publicVapidKey: string,
  privateVapidKey: string,
  notificationTitle: string,
  notifcationMessage: string,
  subscription: TemplateWebPushSubscription
) => {
  webpush.setVapidDetails(
    "mailto:contact@pomana.com",
    publicVapidKey,
    privateVapidKey
  );

  if (!subscription) {
    return {
      msg: `User is not subscribed!`,
      statusCode: StatusCodes.NO_CONTENT,
    };
  }

  const usableNotification = {
    endpoint: subscription.endpoint,
    keys: {
      auth: subscription.auth,
      p256dh: subscription.p256dh,
    },
  } as PushSubscription;

  const notificationRes = await webpush.sendNotification(
    usableNotification,
    JSON.stringify({
      title: notificationTitle,
      body: notifcationMessage,
      image: process.env.NOTIFICATION_IMAGE_URL,
    })
  );

  console.log(notificationRes);

  return {
    msg: notificationRes.body,
    statusCode: notificationRes.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };
};

export default notifyUserPersistence;
