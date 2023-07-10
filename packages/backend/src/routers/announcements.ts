// Express
import express from "express";

// Controllers and Middleware
import {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  deleteAnnouncementById,
  updateAnnouncementById,
} from "../app/interactors/announcementsInteractors";

const router = express.Router();

router.get("/announcements", getAllAnnouncements);

router.get("/announcements/announcement/:announcementId", getAnnouncementById);

router.post("/announcements/announcement/create", createAnnouncement);

router.delete(
  "/announcements/announcement/delete/:announcementId",
  deleteAnnouncementById
);

router.patch(
  "/announcements/announcement/update/:announcementId",
  updateAnnouncementById
);

// EXPORTS
export default router;
