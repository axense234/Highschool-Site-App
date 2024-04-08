// Prisma
import { Grade } from "@prisma/client";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Utils
import { deleteCache, setCache } from "../../../utils/redis";
// Client
import { gradeClient } from "../../../db/postgres";

const createGradePersistence = async (gradeBody: Grade, userId: string) => {
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

  await deleteCache("students");
  await deleteCache(`students:${userId}`);

  await deleteCache("grades");
  await deleteCache(`${userId}:grades`);

  await setCache(`${userId}:grades:${createdGrade.grade_uid}`, createdGrade);

  return {
    msg: `Successfully created a grade with id:${createdGrade.grade_uid}`,
    grade: createdGrade,
    statusCode: StatusCodes.CREATED,
  };
};

export default createGradePersistence;
