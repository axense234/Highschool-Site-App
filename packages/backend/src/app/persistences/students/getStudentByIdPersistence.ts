// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { studentClient } from "../../../db/postgres";

const getStudentByIdPersistence = async (
  filter: string,
  filterValue: string,
  includeStudentCard: string,
  includeBookmarks: string
) => {
  const includeObject = {} as any;
  const filterCondition = {} as any;
  filterCondition[filter] = filterValue;

  if (includeBookmarks === "true") {
    includeObject.bookmarks = true;
  }

  if (includeStudentCard === "true") {
    includeObject.student_card = {
      include: {
        content: {
          include: {
            grades: { orderBy: { value: "desc" } },
            absences: { orderBy: { absence_uid: "asc" } },
          },
        },
      },
    };
  }

  const foundStudent = await studentClient.findUnique({
    where: filterCondition,
    include: includeObject,
  });

  if (!foundStudent) {
    return {
      msg: `Could not find student with ${filter}:${filterValue}!`,
      student: {},
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  return {
    msg: `Successfully found student:${foundStudent.fullname}!`,
    student: foundStudent,
    statusCode: StatusCodes.OK,
  };
};

export default getStudentByIdPersistence;
