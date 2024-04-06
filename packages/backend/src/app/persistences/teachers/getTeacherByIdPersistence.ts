// Status Codes
import { StatusCodes } from "http-status-codes";
// Utils
import { getOrSetCache } from "utils/redis";
// Client
import { teacherClient } from "../../../db/postgres";

const getTeacherByIdPersistence = async (
  filter: string,
  filterValue: string,
  includeClassrooms: string,
  includeBookmarks: string
) => {
  const includeObject = {} as any;
  const filterCondition = {} as any;
  filterCondition[filter] = filterValue;

  includeObject.classes = Boolean(includeClassrooms);
  includeObject.bookmarks = Boolean(includeBookmarks);

  const foundTeacher = await getOrSetCache(
    `teachers:${filterValue}`,
    async () => {
      const teacher = await teacherClient.findUnique({
        where: filterCondition,
        include: includeObject,
      });
      return teacher;
    }
  );

  if (!foundTeacher) {
    return {
      msg: `Could not find any teachers with ${filter}: ${filterValue}.`,
      teacher: {},
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  return {
    msg: `Successfully found teacher with ${filter}:${filterValue} and fullname:${foundTeacher.fullname}`,
    teacher: foundTeacher,
    statusCode: StatusCodes.OK,
  };
};

export default getTeacherByIdPersistence;
