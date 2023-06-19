// Express and Others
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
// Prisma
import { Book } from "@prisma/client";
import { bookClient } from "../db/postgres";

const getAllBooks = async (req: Request, res: Response) => {
  const foundBooks = await bookClient.findMany({});

  if (foundBooks.length < 1) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: "Could not find any books, please try again later!",
      books: [],
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully found ${foundBooks.length} books!`,
    nbHits: foundBooks.length,
    books: foundBooks,
  });
};

const getBookById = async (req: Request, res: Response) => {
  const { bookId } = req.params;

  if (!bookId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter a valid book id!", book: {} });
  }

  const foundBook = await bookClient.findUnique({
    where: { book_uid: bookId },
  });

  if (!foundBook) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any books with the following id:${bookId}!`,
      book: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully found a book with id:${bookId}!`,
    book: foundBook,
  });
};

const updateBookById = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const bookBody = req.body as Book;

  if (!bookId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter a book id!", book: {} });
  }

  const foundBook = await bookClient.findUnique({
    where: { book_uid: bookId },
  });

  if (!foundBook) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any books with the following id:${bookId}!`,
      book: {},
    });
  }

  const updatedBook = await bookClient.update({
    where: { book_uid: bookId },
    data: { ...bookBody },
  });

  if (!updatedBook) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: `Something went wrong while trying to update a book!`,
      book: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully updated book with id: ${bookId}`,
    book: updatedBook,
  });
};

const deleteBookById = async (req: Request, res: Response) => {
  const { bookId } = req.params;

  if (!bookId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter a book id!", book: {} });
  }

  const foundBook = await bookClient.findUnique({
    where: { book_uid: bookId },
  });

  if (!foundBook) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any books with the following id:${bookId}!`,
      book: {},
    });
  }

  const deletedBook = await bookClient.delete({
    where: { book_uid: bookId },
  });

  if (!deletedBook) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any books with id:${bookId} or something went wrong!`,
      book: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully deleted book with id:${bookId}!`,
    book: deletedBook,
  });
};

const createBook = async (req: Request, res: Response) => {
  const bookBody = req.body as Book;

  const createdBook = await bookClient.create({
    data: { ...bookBody },
  });

  if (!createdBook) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: `Something went wrong while creating a book!`,
      book: {},
    });
  }

  return res.status(StatusCodes.CREATED).json({
    msg: `Successfully created a book with id:${createdBook.book_uid}`,
    book: createdBook,
  });
};

export { getAllBooks, getBookById, updateBookById, deleteBookById, createBook };
