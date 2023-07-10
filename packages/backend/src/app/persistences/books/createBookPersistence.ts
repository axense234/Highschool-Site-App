// Prisma
import { Book } from "@prisma/client";
// Status Codes
import { StatusCodes } from "http-status-codes";
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

  return {
    msg: `Successfully created a book with id:${createdBook.book_uid}`,
    book: createdBook,
    statusCode: StatusCodes.OK,
  };
};

export default createBookPersistence;
