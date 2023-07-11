// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { bookmarkClient } from "../../../db/postgres";

const getAllBookmarksPersistence = async (
  filter: string,
  filterValue: string
) => {
  const filterCondition = {} as any;
  filterCondition[filter] = filterValue;

  const foundBookmarks = await bookmarkClient.findMany({
    where: filterCondition,
  });

  if (foundBookmarks.length < 1) {
    return {
      msg: "Could not find any bookmarks, please try again later!",
      bookmarks: [],
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  return {
    msg: `Successfully found ${foundBookmarks.length} bookmarks!`,
    nbHits: foundBookmarks.length,
    bookmarks: foundBookmarks,
    statusCode: StatusCodes.OK,
  };
};

export default getAllBookmarksPersistence;
