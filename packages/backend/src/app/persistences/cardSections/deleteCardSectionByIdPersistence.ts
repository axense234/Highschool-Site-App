// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { studentCardSectionClient } from "../../../db/postgres";

const deleteCardSectionByIdPersistence = async (sectionId: string) => {
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

  const deletedCardSection = await studentCardSectionClient.delete({
    where: { card_section_uid: sectionId },
  });

  if (!deletedCardSection) {
    return {
      msg: `Could not find card section with id:${sectionId} in order to delete it or something went wrong.`,
      section: {},
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }

  return {
    msg: `Successfully deleted card section with id: ${sectionId}.`,
    section: deletedCardSection,
    statusCode: StatusCodes.OK,
  };
};

export default deleteCardSectionByIdPersistence;
