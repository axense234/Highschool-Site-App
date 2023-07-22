import { StatusCodes } from "http-status-codes";
import { webPushSubscriptionClient } from "../../../db/postgres";

const removeUserSubscriptionPersistence = async (
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

  if (!foundSubscription) {
    return {
      msg: "Could not find subscription in order to delete it!",
      statusCode: StatusCodes.NOT_FOUND,
      subscription: {},
    };
  }

  const removedSubscription = await webPushSubscriptionClient.delete(
    queryObject
  );

  if (!removedSubscription) {
    return {
      msg: "Something went wrong when trying to remove a user's subscription!",
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      subscription: {},
    };
  }

  return {
    msg: `Successfully removed user subscription!`,
    statusCode: StatusCodes.OK,
    subscription: removedSubscription,
  };
};

export default removeUserSubscriptionPersistence;
