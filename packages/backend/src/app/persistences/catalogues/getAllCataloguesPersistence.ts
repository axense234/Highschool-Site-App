// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { studentCatalogueClient } from "../../../db/postgres";

const getAllCataloguesPersistence = async () => {
  const foundCatalogues = await studentCatalogueClient.findMany({});

  if (foundCatalogues.length < 1) {
    return {
      msg: "Could not find any catalogues, please try again later.",
      catalogues: [],
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  return {
    nbHits: foundCatalogues.length,
    msg: "Successfully found catalogues!",
    catalogues: foundCatalogues,
    statusCode: StatusCodes.OK,
  };
};

export default getAllCataloguesPersistence;
