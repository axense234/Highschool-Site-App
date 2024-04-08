// Express
import { Request, Response } from "express";
// Persistences
import getAllAnnouncementsPersistence from "../persistences/announcements/getAllAnnouncementsPersistence";
import getAnnouncementByIdPersistence from "../persistences/announcements/getAnnouncementByIdPersistence";
import createAnnouncementPersistence from "../persistences/announcements/createAnnouncementPersistence";
import deleteAnnouncementByIdPersistence from "../persistences/announcements/deleteAnnouncementByIdPersistence";
import updateAnnouncementByIdPersistence from "../persistences/announcements/updateAnnouncementByIdPersistence";

const getAllAnnouncements = async (req: Request, res: Response) => {
  const { sortByFilter, filter, filterQuery } = req.query;
  const foundAnnouncementsPayload = await getAllAnnouncementsPersistence(
    sortByFilter as string,
    filter as string,
    filterQuery as string
  );
  return res
    .status(foundAnnouncementsPayload.statusCode)
    .json(foundAnnouncementsPayload);
};

const getAnnouncementById = async (req: Request, res: Response) => {
  const { announcementId } = req.params;
  const { userId } = req.query;

  const foundAnnouncementPayload = await getAnnouncementByIdPersistence(
    announcementId,
    userId as string
  );
  return res
    .status(foundAnnouncementPayload.statusCode)
    .json(foundAnnouncementPayload);
};

const createAnnouncement = async (req: Request, res: Response) => {
  const announcementBody = req.body;

  const createdAnnouncementBody = await createAnnouncementPersistence(
    announcementBody
  );
  return res
    .status(createdAnnouncementBody.statusCode)
    .json(createdAnnouncementBody);
};

const deleteAnnouncementById = async (req: Request, res: Response) => {
  const { announcementId } = req.params;

  const deletedAnnouncementPayload = await deleteAnnouncementByIdPersistence(
    announcementId
  );
  return res
    .status(deletedAnnouncementPayload.statusCode)
    .json(deletedAnnouncementPayload);
};

const updateAnnouncementById = async (req: Request, res: Response) => {
  const { announcementId } = req.params;
  const announcementBody = req.body;

  const updatedAnnouncementPayload = await updateAnnouncementByIdPersistence(
    announcementId,
    announcementBody
  );
  return res
    .status(updatedAnnouncementPayload.statusCode)
    .json(updatedAnnouncementPayload);
};

// EXPORTS
export {
  getAllAnnouncements,
  createAnnouncement,
  getAnnouncementById,
  deleteAnnouncementById,
  updateAnnouncementById,
};
