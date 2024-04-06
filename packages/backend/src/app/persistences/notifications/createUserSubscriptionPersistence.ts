// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { webPushSubscriptionClient } from "../../../db/postgres";
// Types
import { TemplateWebPushSubscription } from "../../../core/types/TemplateWebPushSubscription";

const createUserSubscriptionPersistence = async (
  subBody: TemplateWebPushSubscription,
  user_uid: string,
  userType: "ADMIN" | "PROFESOR" | "ELEV"
) => {
  let userIdKeyUsed;
  switch (userType) {
    case "ADMIN":
      userIdKeyUsed = "created_by_admin_uid";
      break;
    case "PROFESOR":
      userIdKeyUsed = "created_by_teacher_uid";
      break;
    case "ELEV":
      userIdKeyUsed = "created_by_student_uid";
      break;
    default:
      break;
  }

  if (!user_uid) {
    return {
      msg: "Please enter user_uid!",
      statusCode: StatusCodes.BAD_REQUEST,
      subscription: {},
    };
  }

  const foundSub = await webPushSubscriptionClient.findUnique({
    where: { endpoint: subBody.endpoint as string },
  });

  if (foundSub) {
    return {
      msg: "User is already subscribed!",
      statusCode: StatusCodes.CONFLICT,
      subscription: foundSub,
    };
  }

  const createdSub = await webPushSubscriptionClient.create({
    data: {
      auth: subBody.auth as string,
      endpoint: subBody.endpoint as string,
      p256dh: subBody.p256dh as string,
      [userIdKeyUsed as string]: user_uid,
    },
  });

  if (!createdSub) {
    return {
      msg: `Could not create web push subscription!`,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      subscription: {},
    };
  }

  return {
    msg: `Successfully created web subscription!`,
    statusCode: StatusCodes.CREATED,
    subscription: createdSub,
  };
};

export default createUserSubscriptionPersistence;
