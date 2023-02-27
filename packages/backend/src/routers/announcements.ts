// Express
import express from "express";

// Controllers and Middleware
import {
  createAnnouncement,
  getAllAnnouncements,
} from "../controllers/announcements";

const router = express.Router();

router.get("/anunturi", getAllAnnouncements);

router.post("/anunturi/create", createAnnouncement);

// EXPORTS
export default router;
