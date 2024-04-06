// Status Codes
import { StatusCodes } from "http-status-codes";
// Utils
import { deleteCache, setCache } from "utils/redis";
// Types
import { Class } from "@prisma/client";
import { TemplateClassType } from "../../../core/types/templateClassType";
// Data
import { classLabelPattern } from "../../../data";
// Clients
import {
  teacherClient,
  classClient,
  studentClient,
} from "../../../db/postgres";

const createClassPersistence = async (
  classBody: TemplateClassType,
  userId: string
) => {
  if (classBody.master_teacher) {
    delete classBody.master_teacher;
  }

  if (!classLabelPattern.test(classBody.label as string)) {
    return {
      msg: `Etichetă de clasă invalidă!`,
      class: {},
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  if (classBody.students) {
    classBody.students = {
      connect: (classBody.students as string[]).map((student: string) => {
        return { student_uid: student };
      }),
    };
  }

  if (classBody.teachers) {
    classBody.teachers = {
      connect: (classBody.teachers as string[]).map((teacher: string) => {
        return { teacher_uid: teacher };
      }),
    };
  }

  if (classBody.master_teacher_uid) {
    const foundTeacher = await teacherClient.findUnique({
      where: { teacher_uid: classBody.master_teacher_uid as string },
    });

    if (foundTeacher) {
      classBody.master_teacher_name = foundTeacher.fullname;
    }
  } else {
    delete classBody.master_teacher_name;
    delete classBody.master_teacher_uid;
  }

  const createdClass = await classClient.create({
    data: { ...(classBody as Class) },
  });

  if (!createdClass) {
    return {
      msg: "Could not create a class with the data received!",
      class: {},
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  await deleteCache("classes");
  await deleteCache(`${userId}:classes`);

  await setCache(`${userId}:classes:${createdClass.class_uid}`, createdClass);

  await studentClient.updateMany({
    where: { class_label: createdClass.label },
    data: {
      class_uid: createdClass.class_uid,
      class_label: createdClass.label,
    },
  });

  await deleteCache("students");

  if (createdClass.master_teacher_uid) {
    const updatedTeacher = await teacherClient.update({
      where: { teacher_uid: createdClass.master_teacher_uid },
      data: {
        master: true,
        master_class: { connect: { class_uid: createdClass.class_uid } },
        master_class_uid: createdClass.class_uid,
        master_class_label: createdClass.label,
      },
    });
    await deleteCache("teachers");
    await setCache(`teachers:${updatedTeacher.teacher_uid}`, updatedTeacher);
  }

  return {
    msg: `Successfully created class with uid:${createdClass.class_uid}!`,
    class: createdClass,
    statusCode: StatusCodes.CREATED,
  };
};

export default createClassPersistence;
