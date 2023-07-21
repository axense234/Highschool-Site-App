// Notifications
import webpush from "web-push";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Templates
import { TemplateAdminType } from "../../../core/types/templateAdminType";
import { TemplateTeacherType } from "../../../core/types/templateTeacherType";
import { TemplateStudentType } from "../../../core/types/templateStudentType";

const notifyUserPersistence = async (
  publicVapidKey: string,
  privateVapidKey: string,
  notificationTitle: string,
  notifcationMessage: string,
  user: TemplateAdminType | TemplateTeacherType | TemplateStudentType
) => {
  webpush.setVapidDetails(
    "mailto:contact@pomana.com",
    publicVapidKey,
    privateVapidKey
  );

  if (!user.subscription) {
    return {
      msg: `User is not subscribed!`,
      statusCode: StatusCodes.NO_CONTENT,
    };
  }

  const userSubscription = JSON.parse(user.subscription as string);
  console.log(user.profile_img_url);

  const notificationRes = await webpush.sendNotification(
    userSubscription,
    JSON.stringify({
      title: notificationTitle,
      body: notifcationMessage,
      image: user.profile_img_url,
    })
  );

  return {
    msg: notificationRes.body,
    statusCode: notificationRes.statusCode,
  };
};

export default notifyUserPersistence;
