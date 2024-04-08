// Prisma
import { Bookmark } from "@prisma/client";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Utils
import { deleteCache, setCache } from "../../../utils/redis";
// Client
import { bookmarkClient } from "../../../db/postgres";

const createBookmarkPersistence = async (
  bookmarkBody: Bookmark,
  userId: string
) => {
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

  await deleteCache("bookmarks");
  await deleteCache(`${userId}:bookmarks`);

  await deleteCache(`students:${userId}`);
  await deleteCache(`teachers:${userId}`);
  await deleteCache(`admins:${userId}`);

  await setCache(
    `${userId}:bookmarks:${createdBookmark.bookmark_uid}`,
    createdBookmark
  );

  return {
    msg: `Successfully created a bookmark with id:${createdBookmark.bookmark_uid}`,
    bookmark: createdBookmark,
    statusCode: StatusCodes.CREATED,
  };
};

export default createBookmarkPersistence;
