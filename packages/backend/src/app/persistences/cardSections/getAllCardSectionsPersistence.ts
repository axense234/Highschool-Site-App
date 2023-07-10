// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { studentCardSectionClient } from "../../../db/postgres";

const getAllCardSectionsPersistence = async () => {
  const foundCardSections = await studentCardSectionClient.findMany({});

  if (foundCardSections.length < 1) {
    return {
      msg: "Could not find any card sections, please try again later.",
      sections: [],
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  return {
    nbHits: foundCardSections.length,
    msg: "Successfully found card sections!",
    sections: foundCardSections,
    statusCode: StatusCodes.OK,
  };
};

export default getAllCardSectionsPersistence;
