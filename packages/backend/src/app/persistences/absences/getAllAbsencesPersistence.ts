// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { absenceClient } from "../../../db/postgres";

const getAllAbsencesPersistence = async () => {
  const foundAbsences = await absenceClient.findMany({});

  if (foundAbsences.length < 1) {
    return {
      msg: "Could not find any absences, please try again later!",
      absences: [],
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  return {
    msg: `Successfully found ${foundAbsences.length} absences!`,
    absences: foundAbsences,
    nbHits: foundAbsences.length,
    statusCode: StatusCodes.OK,
  };
};

export default getAllAbsencesPersistence;
