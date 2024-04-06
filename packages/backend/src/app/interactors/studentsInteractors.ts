// Express
import { Request, Response } from "express";
// Persistences
import getAllStudentsPersistence from "../persistences/students/getAllStudentsPersistence";
import getStudentByIdPersistence from "../persistences/students/getStudentByIdPersistence";
import updateStudentByIdPersistence from "../persistences/students/updateStudentByIdPersistence";
import deleteStudentByIdPersistence from "../persistences/students/deleteStudentByIdPersistence";

declare module "express-serve-static-core" {
  export interface Request {
    user: any;
    cookies: any;
  }
}

const getAllStudents = async (req: Request, res: Response) => {
  const { classLabel } = req.query;
  const foundStudentsPayload = await getAllStudentsPersistence(
    classLabel as string
  );
  return res.status(foundStudentsPayload.statusCode).json(foundStudentsPayload);
};

const getStudentById = async (req: Request, res: Response) => {
  const studentId =
    req.params.userId === "false" || !req.params.userId
      ? req.user.userId
      : req.params.userId;

  const { includeStudentCard, includeBookmarks } = req.query;

  const foundStudentPayload = await getStudentByIdPersistence(
    "student_uid",
    studentId,
    includeStudentCard as string,
    includeBookmarks as string
  );
  return res.status(foundStudentPayload.statusCode).json(foundStudentPayload);
};

const updateStudentById = async (req: Request, res: Response) => {
  const studentId =
    req.params.studentId === "false" || !req.params.studentId
      ? req.user.studentId
      : req.params.studentId;

  const studentBody = req.body;
  delete studentBody.student_card;

  const updatedStudentPayload = await updateStudentByIdPersistence(
    studentId,
    studentBody
  );

  return res
    .status(updatedStudentPayload.statusCode)
    .json(updatedStudentPayload);
};

const deleteStudentById = async (req: Request, res: Response) => {
  const { studentId } = req.params;

  const deletedStudentPayload = await deleteStudentByIdPersistence(studentId);
  return res
    .status(deletedStudentPayload.statusCode)
    .json(deletedStudentPayload);
};

// EXPORTS
export { getStudentById, deleteStudentById, getAllStudents, updateStudentById };
