// Prisma
import { Teacher } from "@prisma/client";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { teacherClient } from "../../../db/postgres";

const createTeacherPersistence = async (teacherBody: Teacher) => {
  const createdTeacher = await teacherClient.create({
    data: { ...teacherBody },
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
    statusCode: StatusCodes.OK,
  };
};

export default createTeacherPersistence;
