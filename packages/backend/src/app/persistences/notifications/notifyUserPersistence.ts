// Notifications
import webpush from "web-push";
// Prisma
import { Admin, WebPushSubscription } from "@prisma/client";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Persistences
import getAdminByIdPersistence from "../admins/getAdminByIdPersistence";
import { TemplateAdminType } from "../../../core/types/templateAdminType";
import { TemplateWebPushSubscription } from "../../../core/types/templateWebPushSubscription";

const notifyUserPersistence = async (
  publicVapidKey: string,
  privateVapidKey: string,
  userId: string,
  notificationTitle: string,
  notifcationMessage: string
) => {
  webpush.setVapidDetails(
    "mailto:contact@pomana.com",
    publicVapidKey,
    privateVapidKey
  );

  let responseMessage = "Yes";

  const foundUserPayload = await getAdminByIdPersistence(
    "admin_uid",
    userId,
    "false"
  );
  if (foundUserPayload.statusCode === 200) {
    const foundUser = foundUserPayload.admin as TemplateAdminType;
    webpush
      .sendNotification(
        foundUser.subscription as TemplateWebPushSubscription,
        JSON.stringify({
          title: notificationTitle,
          body: notifcationMessage,
          image: foundUser.profile_img_url,
        })
      )
      .catch((err: any) => {
        responseMessage = "No";
      });
  }

  return {
    msg: responseMessage,
    statusCode:
      responseMessage === "Yes" ? StatusCodes.OK : StatusCodes.BAD_REQUEST,
  };
};

export default notifyUserPersistence;
