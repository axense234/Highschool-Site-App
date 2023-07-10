// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { studentCardSectionClient } from "../../../db/postgres";

const getCardSectionByIdPersistence = async (sectionId: string) => {
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
      msg: `Could not find any card sections with the matching id:${sectionId}.`,
      section: {},
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  return {
    msg: `Successfully found card section with id:${sectionId}!`,
    section: foundCardSection,
    statusCode: StatusCodes.OK,
  };
};

export default getCardSectionByIdPersistence;
