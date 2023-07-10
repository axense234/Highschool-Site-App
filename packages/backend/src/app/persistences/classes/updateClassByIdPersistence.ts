// Prisma
import { Class } from "@prisma/client";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { classClient } from "../../../db/postgres";

const updateClassByIdPersistence = async (
  classId: string,
  classBody: Class
) => {
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

  const updatedClass = await classClient.update({
    where: { class_uid: classId },
    data: { ...classBody },
  });

  if (!updatedClass) {
    return {
      msg: `Could not find class with id:${classId} in order to update it!`,
      class: {},
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }

  return {
    msg: `Successfully updated class with id:${classId}!`,
    class: updatedClass,
    statusCode: StatusCodes.OK,
  };
};

export default updateClassByIdPersistence;
