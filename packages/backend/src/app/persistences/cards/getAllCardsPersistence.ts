// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { studentCardClient } from "../../../db/postgres";

const getAllCardsPersistence = async () => {
  const foundCards = await studentCardClient.findMany({});

  if (foundCards.length < 1) {
    return {
      msg: "Could not find any cards at the moment.",
      cards: [],
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  return {
    nbHits: foundCards.length,
    msg: "Successfully fetched student cards!",
    cards: foundCards,
    statusCode: StatusCodes.OK,
  };
};

export default getAllCardsPersistence;
