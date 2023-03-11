// Express
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
// Prisma
import { anuntClient } from "../db/postgres";

// GET ALL ANNOUNCEMENTS
const getAllAnnouncements = async (req: Request, res: Response) => {
  const { limit } = req.query;
  const foundAnnouncements = await anuntClient.findMany({
    take: Number(limit) || 40,
  });

  if (foundAnnouncements.length < 1) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Could not find any announcements!", announcements: [] });
  }

  return res.status(StatusCodes.OK).json({
    nbHits: foundAnnouncements.length,
    msg: `Successfully found ${foundAnnouncements.length} announcements!`,
    announcements: foundAnnouncements,
  });
};

// CREATE ANNOUNCEMENT
const createAnnouncement = async (req: Request, res: Response) => {
  const announcementBody = req.body;

  if (!announcementBody.titlu || !announcementBody.descriere) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Introduceți titlul și descrierea anunțului.",
      announcement: {},
    });
  }

  const createdAnnouncement = await anuntClient.create({
    data: { ...announcementBody },
  });

  if (!createdAnnouncement) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Could not create an announcement with the data received!",
      announcement: {},
    });
  }

  return res.status(StatusCodes.CREATED).json({
    msg: `Successfully created announcement with uid:${createdAnnouncement.anunt_uid} and title:${createdAnnouncement.titlu}!`,
    announcement: createdAnnouncement,
  });
};

// DELETE ALL ANNOUNCEMENTS
const deleteAllAnnouncements = async (req: Request, res: Response) => {
  const deletedAnnouncements = await anuntClient.deleteMany({});

  if (deletedAnnouncements.count < 1) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Error when deleting all announcements!",
      announcements: [],
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully deleted all announcements(${deletedAnnouncements.count}!)`,
    announcements: deletedAnnouncements,
  });
};

// DELETE ANNOUNCEMENT BY ID
const deleteAnnouncementById = async (req: Request, res: Response) => {
  const { announcementId } = req.params;

  if (!announcementId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide an announcementId!", announcement: {} });
  }

  const deletedAnnouncement = await anuntClient.delete({
    where: { anunt_uid: announcementId },
  });

  if (!deletedAnnouncement) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not delete announcement with id:${announcementId}!`,
      announcement: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully deleted announcement with title:${deletedAnnouncement.titlu}!`,
    announcement: deletedAnnouncement,
  });
};

// UPDATE ANNOUNCEMENT BY ID
const updateAnnouncementById = async (req: Request, res: Response) => {
  const { announcementId } = req.params;
  const announcementBody = req.body;

  if (!announcementBody.titlu || !announcementBody.descriere) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Introduceți titlul si descrierea anunțului!",
      announcement: {},
    });
  }

  if (!announcementId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide an announcementId!", announcement: {} });
  }

  const updatedAnnouncement = await anuntClient.update({
    where: { anunt_uid: announcementId },
    data: { ...announcementBody },
  });

  if (!updatedAnnouncement) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find announcement with id:${announcementId} in order to update it!`,
      announcement: updatedAnnouncement,
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully updated announcement: ${updatedAnnouncement.titlu}!`,
    announcement: updatedAnnouncement,
  });
};

// EXPORTS
export {
  getAllAnnouncements,
  createAnnouncement,
  deleteAllAnnouncements,
  deleteAnnouncementById,
  updateAnnouncementById,
};
