// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { studentCatalogueClient } from "../../../db/postgres";

const getCatalogueByIdPersistence = async (catalogueId: string) => {
  if (!catalogueId) {
    return {
      msg: `Please enter a valid catalogueId!`,
      catalogue: {},
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  const foundCatalogue = await studentCatalogueClient.findUnique({
    where: { catalogue_uid: catalogueId },
  });

  if (!foundCatalogue) {
    return {
      msg: `Could not find any catalogues with the matching id:${catalogueId}.`,
      catalogue: {},
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  return {
    msg: `Successfully found a catalogue with id:${catalogueId}!`,
    catalogue: foundCatalogue,
    statusCode: StatusCodes.OK,
  };
};

export default getCatalogueByIdPersistence;
