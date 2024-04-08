// Prisma
import { Announcement } from "@prisma/client";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Utils
import { deleteCache, setCache } from "../../../utils/redis";
// Client
import { announcementClient } from "../../../db/postgres";

const updateAnnouncementByIdPersistence = async (
  announcementId: string,
  announcementBody: Announcement
) => {
  if (!announcementId) {
    return {
      msg: "Please provide an announcementId!",
      announcement: {},
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  const foundAnnouncement = await announcementClient.findUnique({
    where: { announcement_uid: announcementId },
  });

  if (!foundAnnouncement) {
    return {
      msg: `Couldn't find any announcements with id:${announcementId}.`,
      announcement: {},
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  const updatedAnnouncement = await announcementClient.update({
    where: { announcement_uid: announcementId },
    data: { ...announcementBody },
  });

  if (!updatedAnnouncement) {
    return {
      msg: `Could not find announcement with id:${announcementId} in order to update it!`,
      announcement: updatedAnnouncement,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }

  const creatorId =
    updatedAnnouncement.created_by_admin_uid ||
    updatedAnnouncement.created_by_teacher_uid;

  await deleteCache(`announcements`);
  await deleteCache(`${creatorId}:announcements`);
  await setCache(
    `${creatorId}:announcements:${announcementId}`,
    updatedAnnouncement
  );

  return {
    msg: `Successfully updated announcement: ${updatedAnnouncement.title}!`,
    announcement: updatedAnnouncement,
    statusCode: StatusCodes.OK,
  };
};

export default updateAnnouncementByIdPersistence;
