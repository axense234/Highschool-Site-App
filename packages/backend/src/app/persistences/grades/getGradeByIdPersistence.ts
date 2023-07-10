// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { gradeClient } from "../../../db/postgres";

const getGradeByIdPersistence = async (gradeId: string) => {
  if (!gradeId) {
    return {
      msg: "Please enter a valid grade id!",
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

  return {
    msg: `Successfully found a grade!`,
    grade: foundGrade,
    statusCode: StatusCodes.OK,
  };
};

export default getGradeByIdPersistence;
