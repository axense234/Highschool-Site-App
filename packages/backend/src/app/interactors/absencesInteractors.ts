// Express and Others
import { Request, Response } from "express";
// Prisma
import { Absence } from "@prisma/client";
// Persistences
import getAllAbsencesPersistence from "../persistences/absences/getAllAbsencesPersistence";
import getAbsenceByIdPersistence from "../persistences/absences/getAbsenceByIdPersistence";
import updateAbsenceByIdPersistence from "../persistences/absences/updateAbsenceByIdPersistence";
import deleteAbsenceByIdPersistence from "../persistences/absences/deleteAbsenceByIdPersistence";
import createAbsencePersistence from "../persistences/absences/createAbsencePersistence";

const getAllAbsences = async (req: Request, res: Response) => {
  const { userId } = req.query;

  const foundAbsencesPayload = await getAllAbsencesPersistence(
    userId as string
  );
  return res.status(foundAbsencesPayload.statusCode).json(foundAbsencesPayload);
};

const getAbsenceById = async (req: Request, res: Response) => {
  const { absenceId } = req.params;
  const { userId } = req.query;

  const foundAbsencePayload = await getAbsenceByIdPersistence(
    absenceId,
    userId as string
  );

  return res.status(foundAbsencePayload.statusCode).json(foundAbsencePayload);
};

const updateAbsenceById = async (req: Request, res: Response) => {
  const { absenceId } = req.params;
  const absenceBody = req.body as Absence;
  const { userId } = req.query;

  const updatedAbsencePayload = await updateAbsenceByIdPersistence(
    absenceId,
    absenceBody,
    userId as string
  );

  return res
    .status(updatedAbsencePayload.statusCode)
    .json(updatedAbsencePayload);
};

const deleteAbsenceById = async (req: Request, res: Response) => {
  const { absenceId } = req.params;
  const { userId } = req.query;

  const deletedAbsencePayload = await deleteAbsenceByIdPersistence(
    absenceId,
    userId as string
  );

  return res
    .status(deletedAbsencePayload.statusCode)
    .json(deletedAbsencePayload);
};

const createAbsence = async (req: Request, res: Response) => {
  const { card_section_uid } = req.body;
  const { userId } = req.query;

  const createdAbsencePayload = await createAbsencePersistence(
    card_section_uid,
    userId as string
  );

  return res
    .status(createdAbsencePayload.statusCode)
    .json(createdAbsencePayload);
};

export {
  getAbsenceById,
  getAllAbsences,
  updateAbsenceById,
  deleteAbsenceById,
  createAbsence,
};
