// Prisma
import { Student } from "@prisma/client";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { studentClient } from "../../../db/postgres";

const createStudentPersistence = async (
  studentBody: Student,
  includeStudentCard: string
) => {
  const includeObject = {} as any;

  if (includeStudentCard === "true") {
    includeObject.student_card = {
      include: { content: { include: { absences: true, grades: true } } },
    };
  }

  const createdStudent = await studentClient.create({
    data: { ...studentBody },
    include: includeObject,
  });

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
