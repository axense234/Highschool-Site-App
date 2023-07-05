// Express
import { Request, Response } from "express";
// Prisma Types
import { Class, Student } from "@prisma/client";
// Others
import { StatusCodes } from "http-status-codes";
import * as uuid from "uuid";
import { encryptPassword } from "../utils/bcrypt";
// Prisma
import { studentClient } from "../db/postgres";

// ADD USER TO REQUEST(need feedback)
declare module "express-serve-static-core" {
  export interface Request {
    user: any;
    cookies: any;
  }
}

// GET ALL STUDENTS
const getAllStudents = async (req: Request, res: Response) => {
  const { classLabel } = req.query;

  const queryObject = {} as Student;

  if (classLabel) {
    queryObject.class_label = classLabel as string;
  }

  const foundStudents = await studentClient.findMany({ where: queryObject });

  if (foundStudents.length < 1) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Could not find any students!", students: [] });
  }

  return res.status(StatusCodes.OK).json({
    nbHits: foundStudents.length,
    msg: `Successfully found ${foundStudents.length} students!`,
    students: foundStudents,
  });
};

// GET SINGLE STUDENT by STUDENT UID
const getStudentById = async (req: Request, res: Response) => {
  const studentId =
    req.params.userId === "false" || !req.params.userId
      ? req.user.userId
      : req.params.userId;

  const { includeStudentCard } = req.query;

  const includeObject = {} as any;

  if (!studentId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Please enter a studentId in the request params!",
      student: {},
    });
  }

  if (includeStudentCard === "true") {
    includeObject.student_card = {
      include: {
        content: {
          include: {
            grades: { orderBy: { value: "desc" } },
            absences: { orderBy: { absence_uid: "asc" } },
          },
        },
      },
    };
  }

  const foundStudent = await studentClient.findUnique({
    where: { student_uid: studentId },
    include: includeObject,
  });

  if (!foundStudent) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find student with id:${studentId}!`,
      student: {},
    });
  }

  console.log(foundStudent.grades);

  return res.status(StatusCodes.OK).json({
    msg: `Successfully found student:${foundStudent.fullname}!`,
    student: foundStudent,
  });
};

// UPDATE STUDENT by STUDENT ID
const updateStudentById = async (req: Request, res: Response) => {
  const studentId =
    req.params.studentId === "false" || !req.params.studentId
      ? req.user.studentId
      : req.params.studentId;

  const studentBody = req.body;

  if (studentBody.password && studentBody.password === "PAROLA") {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Vă rog să introduceți altă parola în afară de PAROLA",
      student: {},
    });
  }

  if (
    studentBody.password &&
    studentBody.passwordVer &&
    studentBody.password !== studentBody.passwordVer
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Introduceti parole identice!", teacher: {} });
  }

  delete studentBody.passwordVer;
  delete studentBody.student_card;

  if (studentBody.password) {
    const encryptedPassword = await encryptPassword(studentBody.password);

    studentBody.password = encryptedPassword;
  }

  if (!studentId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Could not any studentId in the request params!",
      student: {},
    });
  }

  const foundStudent = await studentClient.findUnique({
    where: { student_uid: studentId },
  });

  if (!foundStudent) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find student with id:${studentId}!`,
      student: {},
    });
  }

  const updatedStudent = await studentClient.update({
    where: { student_uid: studentId },
    data: { ...studentBody },
  });

  if (!updatedStudent) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: `Could not find student with id:${studentId} to update or the update body was invalid!`,
      student: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully updated student:${updatedStudent.fullname}!`,
    student: updatedStudent,
  });
};

// DELETE STUDENT by STUDENT UID or JWT
const deleteStudentById = async (req: Request, res: Response) => {
  const { studentId } = req.params;

  if (!studentId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Could not any studentId in the request params!",
      student: {},
    });
  }

  const foundStudent = await studentClient.findUnique({
    where: { student_uid: studentId },
  });

  if (!foundStudent) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find student with id:${studentId}!`,
      student: {},
    });
  }

  const deletedStudent = await studentClient.delete({
    where: { student_uid: studentId },
  });

  if (!deletedStudent) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any students to delete with the id:${studentId}!`,
      student: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully deleted student:${deletedStudent.fullname}!`,
    student: deletedStudent,
  });
};

// EXPORTS
export { getStudentById, deleteStudentById, getAllStudents, updateStudentById };
