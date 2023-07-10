// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { bookmarkClient } from "../../../db/postgres";

const deleteBookmarkByIdPersistence = async (bookmarkId: string) => {
  if (!bookmarkId) {
    return {
      msg: "Please enter a bookmark id!",
      bookmark: {},
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  const foundBookmark = await bookmarkClient.findUnique({
    where: { bookmark_uid: bookmarkId },
  });

  if (!foundBookmark) {
    return {
      msg: `Could not find any bookmarks with the following id:${bookmarkId}!`,
      bookmark: {},
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  const deletedBookmark = await bookmarkClient.delete({
    where: { bookmark_uid: bookmarkId },
  });

  if (!deletedBookmark) {
    return {
      msg: `Could not find any bookmarks with id:${bookmarkId} or something went wrong!`,
      bookmark: {},
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }

  return {
    msg: `Successfully deleted bookmark with id:${bookmarkId}!`,
    bookmark: deletedBookmark,
    statusCode: StatusCodes.OK,
  };
};

export default deleteBookmarkByIdPersistence;
