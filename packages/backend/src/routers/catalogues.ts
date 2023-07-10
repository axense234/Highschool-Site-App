// Express
import express from "express";

// Controllers and Middleware
import {
  createCatalogue,
  deleteCatalogueById,
  getAllCatalogues,
  getCatalogueById,
  updateCatalogueById,
} from "../app/interactors/cataloguesInteractors";

const router = express.Router();

router.get("/catalogues", getAllCatalogues);

router.get("/catalogues/catalogue/:catalogueId", getCatalogueById);

router.post("/catalogues/catalogue/create", createCatalogue);

router.patch("/catalogues/catalogue/update/:catalogueId", updateCatalogueById);

router.delete("/catalogues/catalogue/delete/:catalogueId", deleteCatalogueById);

export default router;
