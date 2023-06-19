// Express
import express from "express";

// Controllers and Middleware
import {
  createCard,
  deleteCardById,
  getAllCards,
  getCardById,
  updateCardById,
} from "../controllers/cards";

const router = express.Router();

router.get("/cards", getAllCards);

router.get("/cards/card/:cardId", getCardById);

router.delete("/cards/card/delete/:cardId", deleteCardById);

router.patch("/cards/card/update/:cardId", updateCardById);

router.post("/cards/card/create", createCard);

export default router;
