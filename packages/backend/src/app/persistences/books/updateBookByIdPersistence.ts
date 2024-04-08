// Prisma
import { Book } from "@prisma/client";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Utils
import { deleteCache, setCache } from "../../../utils/redis";
// Client
import { bookClient } from "../../../db/postgres";

const updateBookByIdPersistence = async (bookId: string, bookBody: Book) => {
  if (!bookId) {
    return {
      msg: "Please enter a book id!",
      book: {},
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  const foundBook = await bookClient.findUnique({
    where: { book_uid: bookId },
  });

  if (!foundBook) {
    return {
      msg: `Could not find any books with the following id:${bookId}!`,
      book: {},
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  const updatedBook = await bookClient.update({
    where: { book_uid: bookId },
    data: { ...bookBody },
  });

  if (!updatedBook) {
    return {
      msg: `Something went wrong while trying to update a book!`,
      book: {},
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }

  const creatorId =
    updatedBook.created_by_admin_uid || updatedBook.created_by_teacher_uid;

  await deleteCache(`books`);
  await deleteCache(`${creatorId}:books`);
  await setCache(`${creatorId}:books:${bookId}`, updatedBook);

  return {
    msg: `Successfully updated book with id: ${bookId}`,
    book: updatedBook,
    statusCode: StatusCodes.OK,
  };
};

export default updateBookByIdPersistence;
