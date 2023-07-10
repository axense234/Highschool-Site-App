// Express
import { Request, Response } from "express";
// Persistences
import getAllCardSectionsPersistence from "../persistences/cardSections/getAllCardSectionsPersistence";
import getCardSectionByIdPersistence from "../persistences/cardSections/getCardSectionByIdPersistence";
import updateCardSectionByIdPersistence from "../persistences/cardSections/updateCardSectionByIdPersistence";
import deleteCardSectionByIdPersistence from "../persistences/cardSections/deleteCardSectionByIdPersistence";
import createCardSectionPersistence from "../persistences/cardSections/createCardSectionPersistence";

const getAllCardSections = async (req: Request, res: Response) => {
  const foundCardSectionsPayload = await getAllCardSectionsPersistence();
  return res
    .send(foundCardSectionsPayload.statusCode)
    .json(foundCardSectionsPayload);
};

const getCardSectionById = async (req: Request, res: Response) => {
  const { sectionId } = req.params;

  const foundCardSectionPayload = await getCardSectionByIdPersistence(
    sectionId
  );
  return res
    .status(foundCardSectionPayload.statusCode)
    .json(foundCardSectionPayload);
};

const updateCardSectionById = async (req: Request, res: Response) => {
  const { sectionId } = req.params;
  const cardSectionBody = req.body;

  const updatedCardSectionBody = await updateCardSectionByIdPersistence(
    sectionId,
    cardSectionBody
  );
  return res
    .status(updatedCardSectionBody.statusCode)
    .json(updatedCardSectionBody);
};

const deleteCardSectionById = async (req: Request, res: Response) => {
  const { sectionId } = req.params;

  const deletedCardSectionPayload = await deleteCardSectionByIdPersistence(
    sectionId
  );
  return res
    .status(deletedCardSectionPayload.statusCode)
    .json(deletedCardSectionPayload);
};

const createCardSection = async (req: Request, res: Response) => {
  const cardSectionBody = req.body;

  const createdCardSectionPayload = await createCardSectionPersistence(
    cardSectionBody
  );
  return res
    .status(createdCardSectionPayload.statusCode)
    .json(createdCardSectionPayload);
};

export {
  getAllCardSections,
  getCardSectionById,
  updateCardSectionById,
  deleteCardSectionById,
  createCardSection,
};
