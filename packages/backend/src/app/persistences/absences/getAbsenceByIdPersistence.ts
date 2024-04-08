// Status Codes
import { StatusCodes } from "http-status-codes";
// Utils
import { getOrSetCache } from "../../../utils/redis";
// Client
import { absenceClient } from "../../../db/postgres";

const getAbsenceByIdPersistence = async (absenceId: string, userId: string) => {
  if (!absenceId) {
    return {
      msg: "Please enter a valid absence id!",
      absence: {},
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  const foundAbsence = await getOrSetCache(
    `${userId}:absences:${absenceId}`,
    async () => {
      const absence = await absenceClient.findUnique({
        where: { absence_uid: absenceId },
      });
      return absence;
    }
  );

  if (!foundAbsence) {
    return {
      msg: `Could not find any absences with the following id:${absenceId}!`,
      absence: {},
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  return {
    msg: `Successfully found an absence!`,
    absence: foundAbsence,
    statusCode: StatusCodes.OK,
  };
};

export default getAbsenceByIdPersistence;
