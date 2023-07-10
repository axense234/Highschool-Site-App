// Prisma
import { Bookmark } from "@prisma/client";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { bookmarkClient } from "../../../db/postgres";

const createBookmarkPersistence = async (bookmarkBody: Bookmark) => {
  const createdBookmark = await bookmarkClient.create({
    data: { ...bookmarkBody },
  });

  if (!createdBookmark) {
    return {
      msg: `Something went wrong while creating a bookmark!`,
      bookmark: {},
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  return {
    msg: `Successfully created a bookmark with id:${createdBookmark.bookmark_uid}`,
    bookmark: createdBookmark,
    statusCode: StatusCodes.CREATED,
  };
};

export default createBookmarkPersistence;
