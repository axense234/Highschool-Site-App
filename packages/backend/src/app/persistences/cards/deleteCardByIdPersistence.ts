// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { studentCardClient } from "../../../db/postgres";

const deleteCardByIdPersistence = async (cardId: string) => {
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
      msg: `Could not find any student cards with the id:${cardId}`,
      card: {},
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  const deletedCard = await studentCardClient.delete({
    where: { student_card_uid: cardId },
  });

  if (!deletedCard) {
    return {
      msg: `Could not find the card with id:${cardId} to delete it or something went wrong!`,
      card: {},
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }

  return {
    msg: `Successfully deleted card with id:${cardId}!`,
    card: deletedCard,
    statusCode: StatusCodes.OK,
  };
};

export default deleteCardByIdPersistence;
