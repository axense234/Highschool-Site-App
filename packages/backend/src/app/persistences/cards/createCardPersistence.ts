// Status Codes
import { StatusCodes } from "http-status-codes";
// Data
import { defaultSubjects } from "../../../data";
// Client
import { studentCardClient } from "../../../db/postgres";

const createCardPersistence = async () => {
  const createdCard = await studentCardClient.create({
    data: {
      content: {
        createMany: {
          data: [
            { subject: defaultSubjects[0] },
            { subject: defaultSubjects[1] },
            { subject: defaultSubjects[2] },
            { subject: defaultSubjects[3] },
            { subject: defaultSubjects[4] },
            { subject: defaultSubjects[5] },
            { subject: defaultSubjects[6] },
            { subject: defaultSubjects[7] },
            { subject: defaultSubjects[8] },
            { subject: defaultSubjects[9] },
            { subject: defaultSubjects[10] },
            { subject: defaultSubjects[11] },
            { subject: defaultSubjects[12] },
            { subject: defaultSubjects[13] },
            { subject: defaultSubjects[14] },
            { subject: defaultSubjects[15] },
            { subject: defaultSubjects[16] },
            { subject: defaultSubjects[17] },
          ],
        },
      },
    },
  });

  if (!createdCard) {
    return {
      msg: `Could not create a student card, probably a server error.`,
      card: {},
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }

  return {
    msg: `Successfully created a student card with id:${createdCard.student_card_uid}`,
    card: createdCard,
    statusCode: StatusCodes.CREATED,
  };
};

export default createCardPersistence;
