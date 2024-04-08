// Express
import { Request, Response } from "express";
// Persistences
import deleteCatalogueByIdPersistence from "../persistences/catalogues/deleteCatalogueByIdPersistence";
import getAllCataloguesPersistence from "../persistences/catalogues/getAllCataloguesPersistence";
import getCatalogueByIdPersistence from "../persistences/catalogues/getCatalogueByIdPersistence";
import updateCatalogueByIdPersistence from "../persistences/catalogues/updateCatalogueByIdPersistence";
import createCataloguePersistence from "../persistences/catalogues/createCatalougePersistence";

const getAllCatalogues = async (req: Request, res: Response) => {
  const foundCataloguesPayload = await getAllCataloguesPersistence();
  return res
    .status(foundCataloguesPayload.statusCode)
    .json(foundCataloguesPayload);
};

const getCatalogueById = async (req: Request, res: Response) => {
  const { catalogueId } = req.params;

  const foundCataloguePayload = await getCatalogueByIdPersistence(catalogueId);
  return res
    .status(foundCataloguePayload.statusCode)
    .json(foundCataloguePayload);
};

const updateCatalogueById = async (req: Request, res: Response) => {
  const { catalogueId } = req.params;
  const catalogueBody = req.body;

  const updatedCataloguePayload = await updateCatalogueByIdPersistence(
    catalogueId,
    catalogueBody
  );
  return res
    .status(updatedCataloguePayload.statusCode)
    .json(updatedCataloguePayload);
};

const deleteCatalogueById = async (req: Request, res: Response) => {
  const { catalogueId } = req.params;

  const deletedCataloguePayload = await deleteCatalogueByIdPersistence(
    catalogueId
  );
  return res
    .status(deletedCataloguePayload.statusCode)
    .json(deletedCataloguePayload);
};

const createCatalogue = async (req: Request, res: Response) => {
  const catalogueBody = req.body;

  const createdCataloguePayload = await createCataloguePersistence(
    catalogueBody
  );
  return res
    .status(createdCataloguePayload.statusCode)
    .json(createdCataloguePayload);
};

export {
  getAllCatalogues,
  getCatalogueById,
  updateCatalogueById,
  deleteCatalogueById,
  createCatalogue,
};
