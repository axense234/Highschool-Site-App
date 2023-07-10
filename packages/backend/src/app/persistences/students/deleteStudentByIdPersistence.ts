// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { studentClient } from "../../../db/postgres";

const deleteStudentByIdPersistence = async (studentId: string) => {
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

  const deletedStudent = await studentClient.delete({
    where: { student_uid: studentId },
  });

  if (!deletedStudent) {
    return {
      msg: `Could not find any students to delete with the id:${studentId}!`,
      student: {},
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }

  return {
    msg: `Successfully deleted student:${deletedStudent.fullname}!`,
    student: deletedStudent,
    statusCode: StatusCodes.OK,
  };
};

export default deleteStudentByIdPersistence;
