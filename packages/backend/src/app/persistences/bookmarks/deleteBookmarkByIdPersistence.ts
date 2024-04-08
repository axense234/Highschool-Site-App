// Status Codes
import { StatusCodes } from "http-status-codes";
// Utils
import { deleteCache } from "../../../utils/redis";
// Client
import { bookmarkClient } from "../../../db/postgres";

const deleteBookmarkByIdPersistence = async (
  bookmarkId: string,
  userId: string
) => {
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

  await deleteCache(`bookmarks`);
  await deleteCache(`${userId}:bookmarks`);
  await deleteCache(`${userId}:bookmarks:${deletedBookmark.bookmark_uid}`);

  await deleteCache(`students:${userId}`);
  await deleteCache(`teachers:${userId}`);
  await deleteCache(`admins:${userId}`);

  return {
    msg: `Successfully deleted bookmark with id:${bookmarkId}!`,
    bookmark: deletedBookmark,
    statusCode: StatusCodes.OK,
  };
};

export default deleteBookmarkByIdPersistence;
