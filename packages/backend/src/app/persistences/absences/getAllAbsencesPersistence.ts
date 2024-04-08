// Status Codes
import { StatusCodes } from "http-status-codes";
// Utils
import { getOrSetCache } from "../../../utils/redis";
// Client
import { absenceClient } from "../../../db/postgres";

const getAllAbsencesPersistence = async (userId: string) => {
  const foundAbsences = await getOrSetCache(`absences`, async () => {
    const absences = await absenceClient.findMany({});
    return absences;
  });

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
