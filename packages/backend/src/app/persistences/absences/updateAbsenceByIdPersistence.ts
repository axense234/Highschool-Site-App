// Status Codes
import { StatusCodes } from "http-status-codes";
// Prisma
import { Absence } from "@prisma/client";
// Utils
import { deleteCache, setCache } from "../../../utils/redis";
// Client
import { absenceClient } from "../../../db/postgres";

const updateAbsenceByIdPersistence = async (
  absenceId: string,
  absenceBody: Absence,
  userId: string
) => {
  if (!absenceId) {
    return {
      msg: "Please enter a absence id!",
      absence: {},
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  const foundAbsence = await absenceClient.findUnique({
    where: { absence_uid: absenceId },
  });

  if (!foundAbsence) {
    return {
      msg: `Could not find the absence you wanted to update!(id:${absenceId})`,
      absence: {},
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  if (!absenceBody.reasoned) {
    absenceBody.reasoned = !foundAbsence.reasoned;
  }

  const updatedAbsence = await absenceClient.update({
    where: { absence_uid: absenceId },
    data: { ...absenceBody },
  });

  if (!updatedAbsence) {
    return {
      msg: `Something went wrong while trying to update an absence!`,
      absence: {},
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }

  await deleteCache(`absences`);
  await deleteCache(`${userId}:absences`);
  await setCache(`${userId}:absences:${absenceId}`, updatedAbsence);

  return {
    msg: `Successfully updated absence with id: ${absenceId}`,
    absence: updatedAbsence,
    statusCode: StatusCodes.OK,
  };
};

export default updateAbsenceByIdPersistence;
