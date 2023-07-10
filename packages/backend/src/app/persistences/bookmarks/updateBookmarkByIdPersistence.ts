// Prisma
import { Bookmark } from "@prisma/client";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { bookmarkClient } from "../../../db/postgres";

const updateBookmarkByIdPersistence = async (
  bookmarkId: string,
  bookmarkBody: Bookmark
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

  const updatedBookmark = await bookmarkClient.update({
    where: { bookmark_uid: bookmarkId },
    data: { ...bookmarkBody },
  });

  if (!updatedBookmark) {
    return {
      msg: `Something went wrong while trying to update a bookmark!`,
      bookmark: {},
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }

  return {
    msg: `Successfully updated bookmark with id: ${bookmarkId}`,
    bookmark: updatedBookmark,
    statusCode: StatusCodes.OK,
  };
};

export default updateBookmarkByIdPersistence;
