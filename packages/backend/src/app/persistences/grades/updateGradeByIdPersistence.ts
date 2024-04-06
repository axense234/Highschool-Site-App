// Prisma
import { Grade } from "@prisma/client";
// Utils
import { deleteCache, setCache } from "utils/redis";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { gradeClient } from "../../../db/postgres";

const updateGradeByIdPersistence = async (
  gradeId: string,
  gradeBody: Grade,
  userId: string
) => {
  if (!gradeId) {
    return {
      msg: "Please enter a grade id!",
      grade: {},
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  const foundGrade = await gradeClient.findUnique({
    where: { grade_uid: gradeId },
  });

  if (!foundGrade) {
    return {
      msg: `Could not find any grades with the following id:${gradeId}!`,
      grade: {},
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  const updatedGrade = await gradeClient.update({
    where: { grade_uid: gradeId },
    data: { ...gradeBody },
  });

  if (!updatedGrade) {
    return {
      msg: `Something went wrong while trying to update a grade!`,
      grade: {},
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }

  await deleteCache(`grades`);
  await deleteCache(`${userId}:grades`);
  await setCache(`${userId}:grades:${gradeId}`, updatedGrade);

  return {
    msg: `Successfully updated grade with id: ${gradeId}`,
    grade: updatedGrade,
    statusCode: StatusCodes.OK,
  };
};

export default updateGradeByIdPersistence;
