// Status Codes
import { StatusCodes } from "http-status-codes";
// Utils
import { getOrSetCache } from "../../../utils/redis";
// Client
import { announcementClient } from "../../../db/postgres";

const getAnnouncementByIdPersistence = async (
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

  const foundAnnouncement = await getOrSetCache(
    `${userId}:announcements:${announcementId}`,
    async () => {
      const announcement = await announcementClient.findUnique({
        where: { announcement_uid: announcementId },
      });
      return announcement;
    }
  );

  if (!foundAnnouncement) {
    return {
      msg: `Could not find any announcements with the id:${announcementId}.`,
      announcement: {},
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  return {
    msg: `Successfully found announcement with id:${announcementId}.`,
    announcement: foundAnnouncement,
    statusCode: StatusCodes.OK,
  };
};

export default getAnnouncementByIdPersistence;
