// Prisma
import { Bookmark, Prisma, Student } from "@prisma/client";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { studentClient } from "../../../db/postgres";
// Types
import { TemplateStudentType } from "../../../core/types/templateStudentType";
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
    studentBody.bookmarks = { createMany: { data: defaultBookmarksStudent } };
  }

  const createdStudent = await studentClient.create({
    data: { ...(studentBody as Student) },
    include: includeObject,
  });

  console.log(createdStudent);

  if (!createdStudent) {
    return {
      msg: `Something went wrong while creating a student!`,
      student: {},
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  return {
    msg: `Successfully created a student with id:${createdStudent.student_uid}`,
    student: createdStudent,
    statusCode: StatusCodes.OK,
  };
};

export default createStudentPersistence;
