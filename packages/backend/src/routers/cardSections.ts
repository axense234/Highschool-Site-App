// Express
import express from "express";

// Controllers and Middleware
import {
  createCardSection,
  deleteCardSectionById,
  getAllCardSections,
  getCardSectionById,
  updateCardSectionById,
} from "../controllers/cardSections";

const router = express.Router();

router.get("/sections", getAllCardSections);

router.get("/sections/section/:sectionId", getCardSectionById);

router.post("/sections/section/create", createCardSection);

router.patch("/sections/section/update/:sectionId", updateCardSectionById);

router.delete("/sections/section/delete/:sectionId", deleteCardSectionById);

export default router;
