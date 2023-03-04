// Express
import express from "express";

// Controllers and Middleware
import {
  createAnnouncement,
  getAllAnnouncements,
  deleteAllAnnouncements,
} from "../controllers/announcements";
import authenticationMiddleware from "../middleware/authentication";

const router = express.Router();

router.get("/anunturi", getAllAnnouncements);

router.post("/anunturi/create", authenticationMiddleware, createAnnouncement);

router.delete(
  "/anunturi/delete/all",
  authenticationMiddleware,
  deleteAllAnnouncements
);

// EXPORTS
export default router;
