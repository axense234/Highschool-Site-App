// Prisma
import { StudentCatalogue } from "@prisma/client";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { studentCatalogueClient } from "../../../db/postgres";

const updateCatalogueByIdPersistence = async (
  catalogueId: string,
  catalogueBody: StudentCatalogue
) => {
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

  const updatedCatalogue = await studentCatalogueClient.update({
    where: { catalogue_uid: catalogueId },
    data: { ...catalogueBody },
  });

  if (!updatedCatalogue) {
    return {
      msg: `Could not find catalogue with id:${catalogueId} in order to update it or something went wrong!`,
      catalogue: {},
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }

  return {
    msg: `Successfully updated catalogue with id:${catalogueId}!`,
    catalogue: updatedCatalogue,
    statusCode: StatusCodes.OK,
  };
};

export default updateCatalogueByIdPersistence;
