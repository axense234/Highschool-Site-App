// Prisma
import { StudentCatalogue } from "@prisma/client";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { studentCatalogueClient } from "../../../db/postgres";

const createCataloguePersistence = async (catalogueBody: StudentCatalogue) => {
  const createdCatalogue = await studentCatalogueClient.create({
    data: { ...catalogueBody },
  });

  if (!createdCatalogue) {
    return {
      msg: "Please enter a valid request body!",
      catalogue: {},
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  return {
    msg: `Successfully created a catalogue with id:${createdCatalogue.catalogue_uid}.`,
    catalogue: createdCatalogue,
    statusCode: StatusCodes.CREATED,
  };
};

export default createCataloguePersistence;
