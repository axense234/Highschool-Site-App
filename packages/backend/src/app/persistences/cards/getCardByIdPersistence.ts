// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { studentCardClient } from "../../../db/postgres";

const getCardByIdPersistence = async (cardId: string) => {
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
      msg: `Could not find any student card with id:${cardId}!`,
      card: {},
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  return {
    msg: `Successfully fetched student card with id:${foundCard.student_card_uid}!`,
    card: foundCard,
    statusCode: StatusCodes.OK,
  };
};

export default getCardByIdPersistence;
