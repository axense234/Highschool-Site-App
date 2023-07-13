// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { teacherClient } from "../../../db/postgres";

const getAllTeachersPersistence = async (
  sortByFilter?: string,
  filter?: string,
  filterQuery?: string
) => {
  const foundTeachers = await teacherClient.findMany({
    orderBy: { [sortByFilter || "description"]: "desc" },
    where: {
      [filter || "fullname"]: { contains: filterQuery, mode: "insensitive" },
    },
  });

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
