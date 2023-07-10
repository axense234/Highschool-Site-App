// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { bookmarkClient } from "../../../db/postgres";

const getAllBookmarksPersistence = async () => {
  const foundBookmarks = await bookmarkClient.findMany({});

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
