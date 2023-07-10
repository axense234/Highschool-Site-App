// Prisma
import { Student } from "@prisma/client";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { studentClient } from "../../../db/postgres";
// Utils
import { encryptPassword } from "../../../utils/bcrypt";

const updateStudentByIdPersistence = async (
  studentId: string,
  studentBody: Student
) => {
  if (studentBody.password) {
    const encryptedPassword = await encryptPassword(studentBody.password);
    studentBody.password = encryptedPassword;
  }

  if (!studentId) {
    return {
      msg: "Could not any studentId in the request params!",
      student: {},
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  const foundStudent = await studentClient.findUnique({
    where: { student_uid: studentId },
  });

  if (!foundStudent) {
    return {
      msg: `Could not find student with id:${studentId}!`,
      student: {},
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  const updatedStudent = await studentClient.update({
    where: { student_uid: studentId },
    data: { ...studentBody },
  });

  if (!updatedStudent) {
    return {
      msg: `Could not find student with id:${studentId} to update or the update body was invalid!`,
      student: {},
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }

  return {
    msg: `Successfully updated student:${updatedStudent.fullname}!`,
    student: updatedStudent,
    statusCode: StatusCodes.OK,
  };
};

export default updateStudentByIdPersistence;
