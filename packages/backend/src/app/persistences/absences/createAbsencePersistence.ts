// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { absenceClient } from "../../../db/postgres";

const createAbsencePersistence = async (card_section_uid: string) => {
  if (!card_section_uid) {
    return {
      msg: "Please enter a card section uid!",
      absence: {},
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  const createdAbsence = await absenceClient.create({
    data: { card_section_uid },
  });

  if (!createdAbsence) {
    return {
      msg: `Something went wrong when creating an absence!`,
      absence: {},
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  return {
    msg: `Successfully created an absence with id:${createdAbsence.absence_uid}`,
    absence: createdAbsence,
    statusCode: StatusCodes.CREATED,
  };
};

export default createAbsencePersistence;
