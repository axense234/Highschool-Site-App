// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { absenceClient } from "../../../db/postgres";

const deleteAbsenceByIdPersistence = async (absenceId: string) => {
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
      msg: `Could not find any absences with the id:${absenceId}.`,
      absence: {},
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  const deletedAbsence = await absenceClient.delete({
    where: { absence_uid: absenceId },
  });

  if (!deletedAbsence) {
    return {
      msg: `Could not find any absences with id:${absenceId} or something went wrong!`,
      absence: {},
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }

  return {
    msg: `Successfully deleted absence with id:${absenceId}!`,
    absence: deletedAbsence,
    statusCode: StatusCodes.OK,
  };
};

export default deleteAbsenceByIdPersistence;
