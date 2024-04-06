// Status Codes
import { StatusCodes } from "http-status-codes";
// Utils
import { deleteCache } from "utils/redis";
// Client
import { gradeClient } from "../../../db/postgres";

const deleteGradeByIdPersistence = async (gradeId: string, userId: string) => {
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

  const deletedGrade = await gradeClient.delete({
    where: { grade_uid: gradeId },
  });

  if (!deletedGrade) {
    return {
      msg: `Could not find any grades with id:${gradeId} or something went wrong!`,
      grade: {},
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }

  await deleteCache(`grades`);
  await deleteCache(`${userId}:grades`);
  await deleteCache(`${userId}:grades:${deletedGrade.grade_uid}`);

  return {
    msg: `Successfully deleted grade with id:${gradeId}!`,
    grade: deletedGrade,
    statusCode: StatusCodes.OK,
  };
};

export default deleteGradeByIdPersistence;
