import { StatusCodes } from "http-status-codes";
import { webPushSubscriptionClient } from "../../../db/postgres";

const getSingleSubscriptionPersistence = async (
  userId: string,
  userType: "ADMIN" | "PROFESOR" | "ELEV"
) => {
  if (!userId) {
    return {
      msg: "Please enter an userId!",
      statusCode: StatusCodes.BAD_REQUEST,
      subscription: {},
    };
  }

  const queryObject = {} as any;

  switch (userType) {
    case "ADMIN":
      queryObject.where = { created_by_admin_uid: userId };
      break;
    case "PROFESOR":
      queryObject.where = { created_by_teacher_uid: userId };
      break;
    case "ELEV":
      queryObject.where = { created_by_student_uid: userId };
      break;
    default:
      break;
  }

  const foundSubscription = await webPushSubscriptionClient.findUnique(
    queryObject
  );

  console.log(foundSubscription);

  if (!foundSubscription) {
    return {
      msg: `Could not find any subscriptions with userId: ${userId} and userType: ${userType}!`,
      statusCode: StatusCodes.NOT_FOUND,
      subscription: {},
    };
  }

  return {
    msg: `Successfully found subscription!`,
    statusCode: StatusCodes.OK,
    subscription: foundSubscription,
  };
};

export default getSingleSubscriptionPersistence;
