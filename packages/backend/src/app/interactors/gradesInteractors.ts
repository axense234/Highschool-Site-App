// Express and Others
import { Request, Response } from "express";
// Persistences
import getAllGradesPersistence from "../persistences/grades/getAllGradesPersistence";
import getGradeByIdPersistence from "../persistences/grades/getGradeByIdPersistence";
import updateGradeByIdPersistence from "../persistences/grades/updateGradeByIdPersistence";
import deleteGradeByIdPersistence from "../persistences/grades/deleteGradeByIdPersistence";
import createGradePersistence from "../persistences/grades/createGradePersistence";

const getAllGrades = async (req: Request, res: Response) => {
  const foundGradesPayload = await getAllGradesPersistence();

  return res.status(foundGradesPayload.statusCode).json(foundGradesPayload);
};

const getGradeById = async (req: Request, res: Response) => {
  const { gradeId } = req.params;

  const foundGradePayload = await getGradeByIdPersistence(gradeId);

  return res.status(foundGradePayload.statusCode).json(foundGradePayload);
};

const updateGradeById = async (req: Request, res: Response) => {
  const { gradeId } = req.params;
  const gradeBody = req.body;

  const updatedGradePayload = await updateGradeByIdPersistence(
    gradeId,
    gradeBody
  );
  return res.status(updatedGradePayload.statusCode).json(updatedGradePayload);
};

const deleteGradeById = async (req: Request, res: Response) => {
  const { gradeId } = req.params;

  const deletedGradePayload = await deleteGradeByIdPersistence(gradeId);
  return res.status(deletedGradePayload.statusCode).json(deletedGradePayload);
};

const createGrade = async (req: Request, res: Response) => {
  const gradeBody = req.body;

  delete gradeBody.grade_uid;
  delete gradeBody.date;

  const createdGradePayload = await createGradePersistence(gradeBody);

  return res.status(createdGradePayload.statusCode).json(createdGradePayload);
};

export {
  getAllGrades,
  getGradeById,
  updateGradeById,
  deleteGradeById,
  createGrade,
};
