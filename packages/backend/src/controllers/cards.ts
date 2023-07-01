// Express
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
// Prisma
import { studentCardClient } from "../db/postgres";
// Data
import { defaultSubjects } from "../data";

const getAllCards = async (req: Request, res: Response) => {
  const foundCards = await studentCardClient.findMany({});

  if (foundCards.length < 1) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Could not find any cards at the moment.", cards: [] });
  }

  return res.status(StatusCodes.OK).json({
    nbHits: foundCards.length,
    msg: "Successfully fetched student cards!",
    cards: foundCards,
  });
};

const getCardById = async (req: Request, res: Response) => {
  const { cardId } = req.params;

  if (!cardId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: `Could not find the card id!`, card: {} });
  }

  const foundCard = await studentCardClient.findUnique({
    where: { student_card_uid: cardId },
  });

  if (!foundCard) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any student card with id:${cardId}!`,
      card: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully fetched student card with id:${foundCard.student_card_uid}!`,
    card: foundCard,
  });
};

const deleteCardById = async (req: Request, res: Response) => {
  const { cardId } = req.params;

  if (!cardId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: `Could not find the card id!`, card: {} });
  }

  const foundCard = await studentCardClient.findUnique({
    where: { student_card_uid: cardId },
  });

  if (!foundCard) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any student cards with the id:${cardId}`,
      card: {},
    });
  }

  const deletedCard = await studentCardClient.delete({
    where: { student_card_uid: cardId },
  });

  if (!deletedCard) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find the card with id:${cardId} to delete it or something went wrong!`,
      card: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully deleted card with id:${cardId}!`,
    card: deletedCard,
  });
};

const updateCardById = async (req: Request, res: Response) => {
  const { cardId } = req.params;
  const cardBody = req.body;

  if (!cardId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: `Could not find the card id!`, card: {} });
  }

  const foundCard = await studentCardClient.findUnique({
    where: { student_card_uid: cardId },
  });

  if (!foundCard) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any student cards with the id:${cardId}.`,
      card: {},
    });
  }

  const updatedCard = await studentCardClient.update({
    where: { student_card_uid: cardId },
    data: { ...cardBody },
  });

  if (!updatedCard) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find card with id:${cardId} to update or something is wrong with the request body!`,
      card: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully updated student card with id:${cardId}!`,
    card: updatedCard,
  });
};

const createCard = async (req: Request, res: Response) => {
  const createdCard = await studentCardClient.create({
    data: {
      content: {
        createMany: {
          data: [
            { subject: defaultSubjects[0] },
            { subject: defaultSubjects[1] },
            { subject: defaultSubjects[2] },
            { subject: defaultSubjects[3] },
            { subject: defaultSubjects[4] },
            { subject: defaultSubjects[5] },
            { subject: defaultSubjects[6] },
            { subject: defaultSubjects[7] },
            { subject: defaultSubjects[8] },
            { subject: defaultSubjects[9] },
            { subject: defaultSubjects[10] },
            { subject: defaultSubjects[11] },
            { subject: defaultSubjects[12] },
            { subject: defaultSubjects[13] },
            { subject: defaultSubjects[14] },
            { subject: defaultSubjects[15] },
            { subject: defaultSubjects[16] },
            { subject: defaultSubjects[17] },
          ],
        },
      },
    },
  });

  console.log(createdCard);

  if (!createdCard) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: `Could not create a student card, probably a server error.`,
      card: {},
    });
  }

  return res.status(StatusCodes.CREATED).json({
    msg: `Successfully created a student card with id:${createdCard.student_card_uid}`,
    card: createdCard,
  });
};

export { getAllCards, getCardById, deleteCardById, updateCardById, createCard };
