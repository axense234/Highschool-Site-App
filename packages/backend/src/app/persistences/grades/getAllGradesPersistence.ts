// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { gradeClient } from "../../../db/postgres";

const getAllGradesPersistence = async () => {
  const foundGrades = await gradeClient.findMany({});

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
