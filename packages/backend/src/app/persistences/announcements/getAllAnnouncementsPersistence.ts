// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { announcementClient } from "../../../db/postgres";

const getAllAnnouncementsPersistence = async (
  sortByFilter?: string,
  filter?: string,
  filterQuery?: string
) => {
  const foundAnnouncements = await announcementClient.findMany({
    orderBy: { [sortByFilter || "description"]: "desc" },
    where: {
      [filter || "title"]: { contains: filterQuery || "", mode: "insensitive" },
    },
  });

  if (foundAnnouncements.length < 1) {
    return {
      msg: "Could not find any announcements!",
      announcements: [],
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  return {
    nbHits: foundAnnouncements.length,
    msg: `Successfully found ${foundAnnouncements.length} announcements!`,
    announcements: foundAnnouncements,
    statusCode: StatusCodes.OK,
  };
};

export default getAllAnnouncementsPersistence;
