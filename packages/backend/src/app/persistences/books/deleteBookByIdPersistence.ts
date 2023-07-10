// Client
import { StatusCodes } from "http-status-codes";
import { bookClient } from "../../../db/postgres";

const deleteBookByIdPersistence = async (bookId: string) => {
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

  const deletedBook = await bookClient.delete({
    where: { book_uid: bookId },
  });

  if (!deletedBook) {
    return {
      msg: `Could not find any books with id:${bookId} or something went wrong!`,
      book: {},
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }

  return {
    msg: `Successfully deleted book with id:${bookId}!`,
    book: deletedBook,
    statusCode: StatusCodes.OK,
  };
};

export default deleteBookByIdPersistence;
