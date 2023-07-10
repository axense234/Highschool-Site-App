// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { teacherClient } from "../../../db/postgres";

const getAllTeachersPersistence = async () => {
  const foundTeachers = await teacherClient.findMany({});

  if (foundTeachers.length < 1) {
    return {
      msg: "Could not find any teachers at the moment!",
      teachers: [],
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  return {
    nbHits: foundTeachers.length,
    msg: `Successfully fetched ${foundTeachers.length} teachers!`,
    teachers: foundTeachers,
    statusCode: StatusCodes.OK,
  };
};

export default getAllTeachersPersistence;
