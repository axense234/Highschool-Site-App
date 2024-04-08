// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { studentCatalogueClient } from "../../../db/postgres";

const deleteCatalogueByIdPersistence = async (catalogueId: string) => {
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
      msg: `Could not find any catalogues with the id:${catalogueId}.`,
      catalogue: {},
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  const deletedCatalogue = await studentCatalogueClient.delete({
    where: { catalogue_uid: catalogueId },
  });

  if (!deletedCatalogue) {
    return {
      msg: `Could not find a catalogue with id:${catalogueId} in order to delete it or something went wrong.`,
      catalogue: {},
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }

  return {
    msg: `Successfully deleted catalogue with id: ${catalogueId}.`,
    catalogue: deletedCatalogue,
    statusCode: StatusCodes.OK,
  };
};

export default deleteCatalogueByIdPersistence;
