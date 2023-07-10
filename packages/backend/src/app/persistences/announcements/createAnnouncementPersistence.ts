// Prisma
import { Announcement } from "@prisma/client";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { announcementClient } from "../../../db/postgres";

const createAnnouncementPersistence = async (
  announcementBody: Announcement
) => {
  if (!announcementBody.title || !announcementBody.description) {
    return {
      msg: "Introduceți titlul și descrierea anunțului.",
      announcement: {},
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  const createdAnnouncement = await announcementClient.create({
    data: { ...announcementBody },
  });

  if (!createdAnnouncement) {
    return {
      msg: "Could not create an announcement with the data received!",
      announcement: {},
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  return {
    msg: `Successfully created announcement with uid:${createdAnnouncement.announcement_uid} and title:${createdAnnouncement.title}!`,
    announcement: createdAnnouncement,
    statusCode: StatusCodes.CREATED,
  };
};

export default createAnnouncementPersistence;
