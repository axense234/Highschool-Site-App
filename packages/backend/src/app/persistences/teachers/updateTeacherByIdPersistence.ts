// Prisma
import { Teacher } from "@prisma/client";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Utils
import { deleteCache, setCache } from "utils/redis";
import { encryptPassword } from "../../../utils/bcrypt";
// Client
import { teacherClient } from "../../../db/postgres";

const updateTeacherByIdPersistence = async (
  teacherId: string,
  teacherBody: Teacher
) => {
  if (teacherBody.password) {
    const encryptedPassword = await encryptPassword(teacherBody.password);
    teacherBody.password = encryptedPassword;
  }

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

  const updatedTeacher = await teacherClient.update({
    where: { teacher_uid: teacherId },
    data: { ...teacherBody },
  });

  if (!updatedTeacher) {
    return {
      msg: `Could not find teacher with id:${teacherId} in order to update them!`,
      teacher: {},
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }

  await deleteCache(`teachers`);
  await setCache(`teachers:${updatedTeacher.teacher_uid}`, updatedTeacher);

  return {
    msg: `Successfully updated teacher: ${updatedTeacher.fullname}!`,
    teacher: updatedTeacher,
    statusCode: StatusCodes.OK,
  };
};

export default updateTeacherByIdPersistence;
