// Express
import { Request, Response } from "express";
// Prisma
import { Class } from "@prisma/client";
// Persistences
import getAllClassesPersistence from "../persistences/classes/getAllClassesPersistence";
import getClassByIdPersistence from "../persistences/classes/getClassByIdPersistence";
import createClassPersistence from "../persistences/classes/createClassPersistence";
import deleteClassByIdPersistence from "../persistences/classes/deleteClassByIdPersistence";
import updateClassByIdPersistence from "../persistences/classes/updateClassByIdPersistence";

const getAllClasses = async (req: Request, res: Response) => {
  const { includeStudents, userId } = req.query;
  const foundClassesPayload = await getAllClassesPersistence(
    includeStudents as string,
    userId as string
  );
  return res.status(foundClassesPayload.statusCode).json(foundClassesPayload);
};

const getClassById = async (req: Request, res: Response) => {
  const { classId } = req.params;
  const {
    includeTeachers,
    includeStudents,
    includeMasterTeacher,
    includeCatalogue,
  } = req.query;

  const foundClassPayload = await getClassByIdPersistence(
    classId,
    includeTeachers as string,
    includeStudents as string,
    includeMasterTeacher as string,
    includeCatalogue as string
  );

  return res.status(foundClassPayload.statusCode).json(foundClassPayload);
};

const createClass = async (req: Request, res: Response) => {
  const classBody = req.body;
  const { userId } = req.query;

  const createdClassPayload = await createClassPersistence(
    classBody,
    userId as string
  );
  return res.status(createdClassPayload.statusCode).json(createdClassPayload);
};

const deleteClassById = async (req: Request, res: Response) => {
  const { classId } = req.params;
  const { userId } = req.query;

  const deletedClassPayload = await deleteClassByIdPersistence(
    classId,
    userId as string
  );
  return res.status(deletedClassPayload.statusCode).json(deletedClassPayload);
};

const updateClassById = async (req: Request, res: Response) => {
  const { classId } = req.params;
  const classBody = req.body as Class;
  const { userId } = req.query;

  const updatedClassPayload = await updateClassByIdPersistence(
    classId,
    classBody,
    userId as string
  );
  return res.status(updatedClassPayload.statusCode).json(updatedClassPayload);
};

// EXPORTS
export {
  getAllClasses,
  createClass,
  getClassById,
  deleteClassById,
  updateClassById,
};
