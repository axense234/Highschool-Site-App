// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { bookClient } from "../../../db/postgres";

const getAllBooksPersistence = async (
  sortByFilter?: string,
  sortByFilterValue?: string,
  filterQuery?: string,
  filterQueryValue?: string
) => {
  const foundBooks = await bookClient.findMany({
    where: {
      [filterQuery || "title"]: {
        contains: filterQueryValue,
        mode: "insensitive",
      },
    },
    orderBy: { [sortByFilter || "title"]: sortByFilterValue },
  });

  if (foundBooks.length < 1) {
    return {
      msg: "Could not find any books, please try again later!",
      books: [],
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  return {
    msg: `Successfully found ${foundBooks.length} books!`,
    nbHits: foundBooks.length,
    books: foundBooks,
    statusCode: StatusCodes.OK,
  };
};

export default getAllBooksPersistence;
