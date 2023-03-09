// Express
import express from "express";

// Controllers and Middleware
import {
  createAnnouncement,
  getAllAnnouncements,
  deleteAllAnnouncements,
  deleteAnnouncementById,
  updateAnnouncementById,
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

router.delete(
  "/anunturi/anunt/delete/:announcementId",
  authenticationMiddleware,
  deleteAnnouncementById
);

router.patch(
  "/anunturi/anunt/update/:announcementId",
  authenticationMiddleware,
  updateAnnouncementById
);

// EXPORTS
export default router;
