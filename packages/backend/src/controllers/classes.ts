// Express
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
// Prisma
import { Class } from "@prisma/client";
import { classClient, studentClient, teacherClient } from "../db/postgres";
// Data
import { classLabelPattern } from "../data";

// GET ALL CLASSES
const getAllClasses = async (req: Request, res: Response) => {
  const foundClasses = await classClient.findMany({
    include: { students: true },
  });

  if (foundClasses.length < 1) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Could not find any classes!", classes: [] });
  }

  return res.status(StatusCodes.OK).json({
    nbHits: foundClasses.length,
    msg: `Successfully found ${foundClasses.length} classes!`,
    classes: foundClasses,
  });
};

// GET CLASS BY ID
const getClassById = async (req: Request, res: Response) => {
  const { classId } = req.params;
  const {
    includeTeachers,
    includeStudents,
    includeMasterTeacher,
    includeCatalogue,
  } = req.query;

  const includeObject = {} as any;

  if (includeMasterTeacher === "true") {
    includeObject.master_teacher = true;
  }

  if (includeStudents === "true") {
    includeObject.students = true;
  }

  if (includeTeachers === "true") {
    includeObject.teachers = true;
  }

  if (includeCatalogue === "true") {
    includeObject.catalogue = {
      include: {
        sections: {
          include: { content: { include: { absences: true, grades: true } } },
        },
      },
    };
  }

  if (!classId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide a classId!", class: {} });
  }

  const foundClass = await classClient.findUnique({
    where: { class_uid: classId },
    include: includeObject,
  });

  if (!foundClass) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any classes with the id:${classId}.`,
      class: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully found class with id:${classId}.`,
    class: foundClass,
  });
};

// CREATE CLASS
const createClass = async (req: Request, res: Response) => {
  const classBody = req.body;

  if (classBody.master_teacher) {
    delete classBody.master_teacher;
  }

  if (!classLabelPattern.test(classBody.label)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: `Etichetă de clasă invalidă!`, class: {} });
  }

  if (classBody.students) {
    classBody.students = {
      connect: classBody.students.map((student: string) => {
        return { student_uid: student };
      }),
    };
  }

  if (classBody.teachers) {
    classBody.teachers = {
      connect: classBody.teachers.map((teacher: string) => {
        return { teacher_uid: teacher };
      }),
    };
  }

  if (classBody.master_teacher_uid) {
    const foundTeacher = await teacherClient.findUnique({
      where: { teacher_uid: classBody.master_teacher_uid },
    });

    if (foundTeacher) {
      classBody.master_teacher_name = foundTeacher.fullname;
    } else {
      throw new Error("Something went very wrong when creating a class.");
    }
  }

  const createdClass = await classClient.create({
    data: { ...classBody },
  });

  if (!createdClass) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Could not create a class with the data received!",
      class: {},
    });
  }

  await studentClient.updateMany({
    where: { class_label: createdClass.label },
    data: {
      class_uid: createdClass.class_uid,
      class_label: createdClass.label,
    },
  });

  if (createdClass.master_teacher_uid) {
    await teacherClient.update({
      where: { teacher_uid: createdClass.master_teacher_uid },
      data: {
        master: true,
        master_class: { connect: { class_uid: createdClass.class_uid } },
        master_class_uid: createdClass.class_uid,
        master_class_label: createdClass.label,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json({
    msg: `Successfully created class with uid:${createdClass.class_uid}!`,
    class: createdClass,
  });
};

// DELETE CLASS BY ID
const deleteClassById = async (req: Request, res: Response) => {
  const { classId } = req.params;

  if (!classId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide a classId!", class: {} });
  }

  const foundClass = await classClient.findUnique({
    where: { class_uid: classId },
  });

  if (!foundClass) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Couldn't find any classes with id:${classId}.`,
      class: {},
    });
  }

  const deletedClass = await classClient.delete({
    where: { class_uid: classId },
  });

  if (!deletedClass) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not delete class with id:${classId}!`,
      class: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully deleted class with id:${classId}!`,
    class: deletedClass,
  });
};

// UPDATE CLASS BY ID
const updateClassById = async (req: Request, res: Response) => {
  const { classId } = req.params;
  const classBody = req.body as Class;

  if (!classId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide a classId!", class: {} });
  }

  const foundClass = await classClient.findUnique({
    where: { class_uid: classId },
  });

  if (!foundClass) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Couldn't find any classes with id:${classId}.`,
      class: {},
    });
  }

  const updatedClass = await classClient.update({
    where: { class_uid: classId },
    data: { ...classBody },
  });

  if (!updatedClass) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find class with id:${classId} in order to update it!`,
      class: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully updated class with id:${classId}!`,
    class: updatedClass,
  });
};

// EXPORTS
export {
  getAllClasses,
  createClass,
  getClassById,
  deleteClassById,
  updateClassById,
};
