// Status Codes
import { StatusCodes } from "http-status-codes";
// Clinet
import { teacherClient } from "../../../db/postgres";

const deleteTeacherByIdPersistence = async (teacherId: string) => {
  if (!teacherId) {
    return {
      msg: "Please provide a teacherId!",
      teacher: {},
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  const foundTeacher = await teacherClient.findUnique({
    where: { teacher_uid: teacherId },
  });

  if (!foundTeacher) {
    return {
      msg: `Could not find any teachers with id: ${teacherId}.`,
      teacher: {},
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  const deletedTeacher = await teacherClient.delete({
    where: { teacher_uid: teacherId },
  });

  if (!deletedTeacher) {
    return {
      msg: `Could not delete teacher with id:${teacherId}!`,
      teacher: {},
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }

  return {
    msg: `Successfully deleted teacher with fullname:${deletedTeacher.fullname}!`,
    teacher: deletedTeacher,
    statusCode: StatusCodes.OK,
  };
};

export default deleteTeacherByIdPersistence;
