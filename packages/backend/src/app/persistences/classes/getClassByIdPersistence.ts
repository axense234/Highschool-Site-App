// Status Codes
import { StatusCodes } from "http-status-codes";
// Utils
import { getOrSetCache } from "utils/redis";
// Client
import { classClient } from "../../../db/postgres";

const getClassByIdPersistence = async (
  classId: string,
  includeTeachers: string,
  includeStudents: string,
  includeMasterTeacher: string,
  includeCatalogue: string
) => {
  const includeObject = {} as any;

  if (includeMasterTeacher === "true") {
    includeObject.master_teacher = true;
  }

  if (includeStudents === "true") {
    includeObject.students = {
      include: {
        student_card: {
          include: {
            content: {
              include: {
                absences: { orderBy: { absence_uid: "desc" } },
                grades: { orderBy: { value: "desc" } },
              },
            },
          },
        },
      },
    };
  }

  if (includeTeachers === "true") {
    includeObject.teachers = true;
  }

  if (includeCatalogue === "true") {
    includeObject.catalogue = {
      include: {
        sections: {
          include: {
            content: {
              include: {
                absences: { orderBy: { absence_uid: "asc" } },
                grades: { orderBy: { value: "asc" } },
              },
            },
          },
        },
      },
    };
  }

  if (!classId) {
    return {
      msg: "Please provide a classId!",
      class: {},
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  const foundClass = await getOrSetCache(`classes:${classId}`, async () => {
    const foundClassEntity = await classClient.findUnique({
      where: { class_uid: classId },
      include: includeObject,
    });
    return foundClassEntity;
  });

  if (!foundClass) {
    return {
      msg: `Could not find any classes with the id:${classId}.`,
      class: {},
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  return {
    msg: `Successfully found class with id:${classId}.`,
    class: foundClass,
    statusCode: StatusCodes.OK,
  };
};

export default getClassByIdPersistence;
