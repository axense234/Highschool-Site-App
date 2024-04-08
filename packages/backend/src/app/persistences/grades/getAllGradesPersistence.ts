// Status Codes
import { StatusCodes } from "http-status-codes";
// Utils
import { getOrSetCache } from "../../../utils/redis";
// Client
import { gradeClient } from "../../../db/postgres";

const getAllGradesPersistence = async (userId: string) => {
  const foundGrades = await getOrSetCache("grades", async () => {
    const grades = await gradeClient.findMany({});
    return grades;
  });

  if (foundGrades.length < 1) {
    return {
      msg: "Could not find any grades, please try again later!",
      grades: [],
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  return {
    msg: `Successfully found ${foundGrades.length} grades!`,
    nbHits: foundGrades.length,
    grades: foundGrades,
    statusCode: StatusCodes.OK,
  };
};

export default getAllGradesPersistence;
