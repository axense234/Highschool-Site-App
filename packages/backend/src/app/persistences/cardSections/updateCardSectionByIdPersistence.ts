// Prisma
import { StudentCardSection } from "@prisma/client";
// Status Codse
import { StatusCodes } from "http-status-codes";
// Client
import { studentCardSectionClient } from "../../../db/postgres";

const updateCardSectionByIdPersistence = async (
  sectionId: string,
  cardSectionBody: StudentCardSection
) => {
  if (!sectionId) {
    return {
      msg: `Please enter a valid sectionId!`,
      section: {},
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  const foundCardSection = await studentCardSectionClient.findUnique({
    where: { card_section_uid: sectionId },
  });

  if (!foundCardSection) {
    return {
      msg: `Could not find any card sections with the id:${sectionId}.`,
      section: {},
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  const updatedCardSection = await studentCardSectionClient.update({
    where: { card_section_uid: sectionId },
    data: { ...cardSectionBody },
  });

  if (!updatedCardSection) {
    return {
      msg: `Could not find card section with id:${sectionId} in order to update it or something went wrong!`,
      section: {},
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }

  return {
    msg: `Successfully updated card section with id:${sectionId}!`,
    section: updatedCardSection,
    statusCode: StatusCodes.OK,
  };
};

export default updateCardSectionByIdPersistence;
