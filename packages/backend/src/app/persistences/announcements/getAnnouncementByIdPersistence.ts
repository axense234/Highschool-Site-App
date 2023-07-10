// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { announcementClient } from "../../../db/postgres";

const getAnnouncementByIdPersistence = async (announcementId: string) => {
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
