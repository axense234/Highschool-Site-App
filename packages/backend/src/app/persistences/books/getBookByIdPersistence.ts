// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { bookClient } from "../../../db/postgres";

const getBookByIdPersistence = async (bookId: string) => {
  if (!bookId) {
    return {
      msg: "Please enter a valid book id!",
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

  return {
    msg: `Successfully found a book with id:${bookId}!`,
    book: foundBook,
    statusCode: StatusCodes.OK,
  };
};

export default getBookByIdPersistence;
