// Prisma
import { StudentCard } from "@prisma/client";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { studentCardClient } from "../../../db/postgres";

const updateCardByIdPersistence = async (
  cardId: string,
  cardBody: StudentCard
) => {
  if (!cardId) {
    return {
      msg: `Could not find the card id!`,
      card: {},
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  const foundCard = await studentCardClient.findUnique({
    where: { student_card_uid: cardId },
  });

  if (!foundCard) {
    return {
      msg: `Could not find any student cards with the id:${cardId}.`,
      card: {},
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  const updatedCard = await studentCardClient.update({
    where: { student_card_uid: cardId },
    data: { ...cardBody },
  });

  if (!updatedCard) {
    return {
      msg: `Could not find card with id:${cardId} to update or something is wrong with the request body!`,
      card: {},
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }

  return {
    msg: `Successfully updated student card with id:${cardId}!`,
    card: updatedCard,
    statusCode: StatusCodes.OK,
  };
};

export default updateCardByIdPersistence;
