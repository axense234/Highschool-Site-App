// Express
import { Request, Response } from "express";
// Persistences
import getAllCardsPersistence from "../persistences/cards/getAllCardsPersistence";
import getCardByIdPersistence from "../persistences/cards/getCardByIdPersistence";
import deleteCardByIdPersistence from "../persistences/cards/deleteCardByIdPersistence";
import updateCardByIdPersistence from "../persistences/cards/updateCardByIdPersistence";
import createCardPersistence from "../persistences/cards/createCardPersistence";

const getAllCards = async (req: Request, res: Response) => {
  const foundCardsPayload = await getAllCardsPersistence();
  return res.send(foundCardsPayload.statusCode).json(foundCardsPayload);
};

const getCardById = async (req: Request, res: Response) => {
  const { cardId } = req.params;

  const foundCardPayload = await getCardByIdPersistence(cardId);
  return res.status(foundCardPayload.statusCode).json(foundCardPayload);
};

const deleteCardById = async (req: Request, res: Response) => {
  const { cardId } = req.params;

  const deletedCardPayload = await deleteCardByIdPersistence(cardId);
  return res.status(deletedCardPayload.statusCode).json(deletedCardPayload);
};

const updateCardById = async (req: Request, res: Response) => {
  const { cardId } = req.params;
  const cardBody = req.body;

  const updatedCardPayload = await updateCardByIdPersistence(cardId, cardBody);
  return res.status(updatedCardPayload.statusCode).json(updatedCardPayload);
};

const createCard = async (req: Request, res: Response) => {
  const createdCardPayload = await createCardPersistence();
  return res.status(createdCardPayload.statusCode).json(createdCardPayload);
};

export { getAllCards, getCardById, deleteCardById, updateCardById, createCard };
