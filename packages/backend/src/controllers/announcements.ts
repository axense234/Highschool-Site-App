// Express
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
// UUID
import uuid from "uuid";
// Prisma
import { announcementClient } from "../db/postgres";

// GET ALL ANNOUNCEMENTS
const getAllAnnouncements = async (req: Request, res: Response) => {
  const foundAnnouncements = await announcementClient.findMany({});

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

// GET ANNOUNCEMENT BY ID
const getAnnouncementById = async (req: Request, res: Response) => {
  const { announcementId } = req.params;

  if (!announcementId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide an announcementId!", announcement: {} });
  }

  const foundAnnouncement = await announcementClient.findUnique({
    where: { announcement_uid: announcementId },
  });

  if (!foundAnnouncement) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any announcements with the id:${announcementId}.`,
      announcement: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully found announcement with id:${announcementId}.`,
    announcement: foundAnnouncement,
  });
};

// CREATE ANNOUNCEMENT
const createAnnouncement = async (req: Request, res: Response) => {
  const announcementBody = req.body;

  if (!announcementBody.title || !announcementBody.description) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Introduceți titlul și descrierea anunțului.",
      announcement: {},
    });
  }

  const createdAnnouncement = await announcementClient.create({
    data: { ...announcementBody },
  });

  if (!createdAnnouncement) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Could not create an announcement with the data received!",
      announcement: {},
    });
  }

  return res.status(StatusCodes.CREATED).json({
    msg: `Successfully created announcement with uid:${createdAnnouncement.announcement_uid} and title:${createdAnnouncement.title}!`,
    announcement: createdAnnouncement,
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

  const foundAnnouncement = await announcementClient.findUnique({
    where: { announcement_uid: announcementId },
  });

  if (!foundAnnouncement) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Couldn't find any announcement with id:${announcementId}.`,
    });
  }

  const deletedAnnouncement = await announcementClient.delete({
    where: { announcement_uid: announcementId },
  });

  if (!deletedAnnouncement) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not delete announcement with id:${announcementId}!`,
      announcement: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully deleted announcement with title:${deletedAnnouncement.title}!`,
    announcement: deletedAnnouncement,
  });
};

// UPDATE ANNOUNCEMENT BY ID
const updateAnnouncementById = async (req: Request, res: Response) => {
  const { announcementId } = req.params;
  const announcementBody = req.body;

  if (!announcementId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide an announcementId!", announcement: {} });
  }

  const foundAnnouncement = await announcementClient.findUnique({
    where: { announcement_uid: announcementId },
  });

  if (!foundAnnouncement) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Couldn't find any announcements with id:${announcementId}.`,
      announcement: {},
    });
  }

  const updatedAnnouncement = await announcementClient.update({
    where: { announcement_uid: announcementId },
    data: { ...announcementBody },
  });

  if (!updatedAnnouncement) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find announcement with id:${announcementId} in order to update it!`,
      announcement: updatedAnnouncement,
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully updated announcement: ${updatedAnnouncement.title}!`,
    announcement: updatedAnnouncement,
  });
};

// EXPORTS
export {
  getAllAnnouncements,
  createAnnouncement,
  getAnnouncementById,
  deleteAnnouncementById,
  updateAnnouncementById,
};
