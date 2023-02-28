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

// EXPORTS
export { getAllAnnouncements, createAnnouncement, deleteAllAnnouncements };
