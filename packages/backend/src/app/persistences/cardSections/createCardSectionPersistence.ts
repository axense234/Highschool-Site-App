// Prisma
import { StudentCardSection } from "@prisma/client";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { studentCardSectionClient } from "../../../db/postgres";

const createCardSectionPersistence = async (
  cardSectionBody: StudentCardSection
) => {
  const createdCardSection = await studentCardSectionClient.create({
    data: { ...cardSectionBody },
  });

  if (!createdCardSection) {
    return {
      msg: "Please enter a valid request body!",
      section: {},
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  return {
    msg: `Successfully created a card section with id:${createdCardSection.card_section_uid}.`,
    section: createdCardSection,
    statusCode: StatusCodes.CREATED,
  };
};

export default createCardSectionPersistence;
