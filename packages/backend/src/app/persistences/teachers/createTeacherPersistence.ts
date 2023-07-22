// Prisma
import { Teacher } from "@prisma/client";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { teacherClient } from "../../../db/postgres";
// Types
import { TemplateTeacherType } from "../../../core/types/TemplateTeacherType";
// Data
import { defaultBookmarksTeacher } from "../../../data";

const createTeacherPersistence = async (
  teacherBody: TemplateTeacherType,
  createDefaultBookmarks: string
) => {
  if (createDefaultBookmarks === "true") {
    teacherBody.bookmarks = { createMany: { data: defaultBookmarksTeacher } };
  }

  const createdTeacher = await teacherClient.create({
    data: { ...(teacherBody as Teacher) },
  });

  if (!createdTeacher) {
    return {
      msg: `Something went wrong while creating a teacher!`,
      teacher: {},
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  return {
    msg: `Successfully created a teacher with id:${createdTeacher.teacher_uid}`,
    teacher: createdTeacher,
    statusCode: StatusCodes.CREATED,
  };
};

export default createTeacherPersistence;
