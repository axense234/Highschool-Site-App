// Prisma
import { Grade } from "@prisma/client";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { gradeClient } from "../../../db/postgres";

const createGradePersistence = async (gradeBody: Grade) => {
  if (gradeBody.value && (gradeBody.value > 10 || gradeBody.value < 1)) {
    return {
      msg: "Provide a grade between 1 and 10.",
      grade: {},
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  const createdGrade = await gradeClient.create({
    data: { ...gradeBody },
  });

  if (!createdGrade) {
    return {
      msg: `Something went wrong when creating a grade!`,
      grade: {},
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  return {
    msg: `Successfully created a grade with id:${createdGrade.grade_uid}`,
    grade: createdGrade,
    statusCode: StatusCodes.CREATED,
  };
};

export default createGradePersistence;
