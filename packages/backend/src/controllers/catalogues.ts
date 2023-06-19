// Express
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
// Prisma
import { studentCatalogueClient } from "../db/postgres";

const getAllCatalogues = async (req: Request, res: Response) => {
  const foundCatalogues = await studentCatalogueClient.findMany({});

  if (foundCatalogues.length < 1) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: "Could not find any catalogues, please try again later.",
      catalogues: [],
    });
  }

  return res.status(StatusCodes.OK).json({
    nbHits: foundCatalogues.length,
    msg: "Successfully found catalogues!",
    catalogues: foundCatalogues,
  });
};

const getCatalogueById = async (req: Request, res: Response) => {
  const { catalogueId } = req.params;

  if (!catalogueId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: `Please enter a valid catalogueId!`,
      catalogue: {},
    });
  }

  const foundCatalogue = await studentCatalogueClient.findUnique({
    where: { catalogue_uid: catalogueId },
  });

  if (!foundCatalogue) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any catalogues with the matching id:${catalogueId}.`,
      catalogue: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully found a catalogue with id:${catalogueId}!`,
    catalogue: foundCatalogue,
  });
};

const updateCatalogueById = async (req: Request, res: Response) => {
  const { catalogueId } = req.params;
  const catalogueBody = req.body;

  if (!catalogueId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: `Please enter a valid catalogueId!`,
      catalogue: {},
    });
  }

  const foundCatalogue = await studentCatalogueClient.findUnique({
    where: { catalogue_uid: catalogueId },
  });

  if (!foundCatalogue) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any catalogues with the id:${catalogueId}.`,
      catalogue: {},
    });
  }

  const updatedCatalogue = await studentCatalogueClient.update({
    where: { catalogue_uid: catalogueId },
    data: { ...catalogueBody },
  });

  if (!updatedCatalogue) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find catalogue with id:${catalogueId} in order to update it or something went wrong!`,
      catalogue: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully updated catalogue with id:${catalogueId}!`,
    catalogue: updatedCatalogue,
  });
};

const deleteCatalogueById = async (req: Request, res: Response) => {
  const { catalogueId } = req.params;

  if (!catalogueId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: `Please enter a valid catalogueId!`,
      catalogue: {},
    });
  }

  const foundCatalogue = await studentCatalogueClient.findUnique({
    where: { catalogue_uid: catalogueId },
  });

  if (!foundCatalogue) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any catalogues with the id:${catalogueId}.`,
      catalogue: {},
    });
  }

  const deletedCatalogue = await studentCatalogueClient.delete({
    where: { catalogue_uid: catalogueId },
  });

  if (!deletedCatalogue) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find a catalogue with id:${catalogueId} in order to delete it or something went wrong.`,
      catalogue: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully deleted catalogue with id: ${catalogueId}.`,
    catalogue: deletedCatalogue,
  });
};

const createCatalogue = async (req: Request, res: Response) => {
  const catalogueBody = req.body;

  const createdCatalogue = await studentCatalogueClient.create({
    data: { ...catalogueBody },
  });

  if (!createdCatalogue) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter a valid request body!", catalogue: {} });
  }

  return res.status(StatusCodes.BAD_REQUEST).json({
    msg: `Successfully created a catalogue with id:${createdCatalogue.catalogue_uid}.`,
    catalogue: createdCatalogue,
  });
};

export {
  getAllCatalogues,
  getCatalogueById,
  updateCatalogueById,
  deleteCatalogueById,
  createCatalogue,
};
