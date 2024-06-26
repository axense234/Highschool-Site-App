// Prisma
import { Student } from "@prisma/client";
// Types
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TemplateStudentType } from "core/types/TemplateStudentType";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Utils
import { deleteCache, setCache } from "../../../utils/redis";
// Client
import { studentClient } from "../../../db/postgres";
// Data
import { defaultBookmarksStudent } from "../../../data";

const createStudentPersistence = async (
  studentBody: TemplateStudentType,
  includeStudentCard: string,
  createDefaultBookmarks: string
) => {
  const includeObject = {} as any;

  if (includeStudentCard === "true") {
    includeObject.student_card = {
      include: { content: { include: { absences: true, grades: true } } },
    };
  }

  if (createDefaultBookmarks === "true") {
    studentBody.bookmarks = {
      createMany: {
        data: studentBody.class_label
          ? defaultBookmarksStudent
          : defaultBookmarksStudent.slice(
              0,
              defaultBookmarksStudent.length - 1
            ),
      },
    };
  }

  const createdStudent = await studentClient.create({
    data: { ...(studentBody as Student) },
    include: includeObject,
  });

  if (!createdStudent) {
    return {
      msg: `Something went wrong while creating a student!`,
      student: {},
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  await deleteCache("students");
  await setCache(`students:${createdStudent.student_uid}`, createdStudent);

  return {
    msg: `Successfully created a student with id:${createdStudent.student_uid}`,
    student: createdStudent,
    statusCode: StatusCodes.CREATED,
  };
};

export default createStudentPersistence;
