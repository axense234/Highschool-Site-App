// Prisma
import { Book } from "@prisma/client";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Utils
import { deleteCache, setCache } from "../../../utils/redis";
// Client
import { bookClient } from "../../../db/postgres";

const createBookPersistence = async (bookBody: Book) => {
  const createdBook = await bookClient.create({
    data: { ...bookBody },
  });

  if (!createdBook) {
    return {
      msg: `Something went wrong while creating a book!`,
      book: {},
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  const creatorId =
    createdBook.created_by_admin_uid || createdBook.created_by_teacher_uid;

  await deleteCache("books");
  await deleteCache(`${creatorId}:books`);

  await setCache(`${creatorId}:books:${createdBook.book_uid}`, createdBook);

  return {
    msg: `Successfully created a book with id:${createdBook.book_uid}`,
    book: createdBook,
    statusCode: StatusCodes.OK,
  };
};

export default createBookPersistence;
