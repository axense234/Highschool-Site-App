// Status Codes
import { StatusCodes } from "http-status-codes";
// Utils
import { deleteCache } from "utils/redis";
// Client
import { announcementClient } from "../../../db/postgres";

const deleteAnnouncementByIdPersistence = async (
  announcementId: string,
  userId: string
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
      msg: `Couldn't find any announcement with id:${announcementId}.`,
      announcement: {},
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  const deletedAnnouncement = await announcementClient.delete({
    where: { announcement_uid: announcementId },
  });

  if (!deletedAnnouncement) {
    return {
      msg: `Could not delete announcement with id:${announcementId}!`,
      announcement: {},
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }

  await deleteCache(`announcements`);
  await deleteCache(`${userId}:announcements`);
  await deleteCache(
    `${userId}:announcements:${deletedAnnouncement.announcement_uid}`
  );

  return {
    msg: `Successfully deleted announcement with title:${deletedAnnouncement.title}!`,
    announcement: deletedAnnouncement,
    statusCode: StatusCodes.OK,
  };
};

export default deleteAnnouncementByIdPersistence;
