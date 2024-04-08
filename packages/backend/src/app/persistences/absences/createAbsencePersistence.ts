// Status Codes
import { StatusCodes } from "http-status-codes";
// Utils
import { deleteCache, setCache } from "../../../utils/redis";
// Client
import { absenceClient } from "../../../db/postgres";

const createAbsencePersistence = async (
  card_section_uid: string,
  userId: string
) => {
  if (!card_section_uid) {
    return {
      msg: "Please enter a card section uid!",
      absence: {},
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  console.log(card_section_uid);

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

  await deleteCache("students");
  await deleteCache(`students:${userId}`);

  await deleteCache("absences");
  await deleteCache(`${userId}:absences`);

  await setCache(
    `${userId}:absences:${createdAbsence.absence_uid}`,
    createdAbsence
  );

  return {
    msg: `Successfully created an absence with id:${createdAbsence.absence_uid}`,
    absence: createdAbsence,
    statusCode: StatusCodes.CREATED,
  };
};

export default createAbsencePersistence;
