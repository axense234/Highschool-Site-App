// Express
import express from "express";

// Controllers and Middleware
import {
  createAnnouncement,
  getAllAnnouncements,
  deleteAllAnnouncements,
} from "../controllers/announcements";

const router = express.Router();

router.get("/anunturi", getAllAnnouncements);

router.post("/anunturi/create", createAnnouncement);

router.delete("/anunturi/delete/all", deleteAllAnnouncements);

// EXPORTS
export default router;
