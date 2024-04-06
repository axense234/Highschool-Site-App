// Status Codes
import { StatusCodes } from "http-status-codes";
// Utils
import { deleteCache } from "utils/redis";
// Client
import { classClient } from "../../../db/postgres";

const deleteClassByIdPersistence = async (classId: string, userId: string) => {
  if (!classId) {
    return {
      msg: "Please provide a classId!",
      class: {},
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  const foundClass = await classClient.findUnique({
    where: { class_uid: classId },
  });

  if (!foundClass) {
    return {
      msg: `Couldn't find any classes with id:${classId}.`,
      class: {},
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  const deletedClass = await classClient.delete({
    where: { class_uid: classId },
  });

  if (!deletedClass) {
    return {
      msg: `Could not delete class with id:${classId}!`,
      class: {},
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }

  await deleteCache(`classes`);
  await deleteCache(`${userId}:classes`);
  await deleteCache(`${userId}:classes:${deletedClass.class_uid}`);

  return {
    msg: `Successfully deleted class with id:${classId}!`,
    class: deletedClass,
    statusCode: StatusCodes.OK,
  };
};

export default deleteClassByIdPersistence;
