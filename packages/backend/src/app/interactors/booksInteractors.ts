// Express and Others
import { Request, Response } from "express";
// Persistences
import getAllBooksPersistence from "../persistences/books/getAllBooksPersistence";
import getBookByIdPersistence from "../persistences/books/getBookByIdPersistence";
import updateBookByIdPersistence from "../persistences/books/updateBookByIdPersistence";
import deleteBookByIdPersistence from "../persistences/books/deleteBookByIdPersistence";
import createBookPersistence from "../persistences/books/createBookPersistence";

const getAllBooks = async (req: Request, res: Response) => {
  const { sortByFilter, sortByFilterValue, filterQuery, filterQueryValue } =
    req.query;

  const foundBooksPayload = await getAllBooksPersistence(
    sortByFilter as string,
    sortByFilterValue as string,
    filterQuery as string,
    filterQueryValue as string
  );
  return res.status(foundBooksPayload.statusCode).json(foundBooksPayload);
};

const getBookById = async (req: Request, res: Response) => {
  const { bookId } = req.params;

  const foundBookPayload = await getBookByIdPersistence(bookId);
  return res.status(foundBookPayload.statusCode).json(foundBookPayload);
};

const updateBookById = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const bookBody = req.body;

  const updatedBookPayload = await updateBookByIdPersistence(bookId, bookBody);
  return res.status(updatedBookPayload.statusCode).json(updatedBookPayload);
};

const deleteBookById = async (req: Request, res: Response) => {
  const { bookId } = req.params;

  const deletedBookPayload = await deleteBookByIdPersistence(bookId);
  return res.status(deletedBookPayload.statusCode).json(deletedBookPayload);
};

const createBook = async (req: Request, res: Response) => {
  const bookBody = req.body;

  if (bookBody.created_by_admin_uid) {
    delete bookBody.created_by_teacher_uid;
  } else if (bookBody.created_by_teacher_uid) {
    delete bookBody.created_by_admin_uid;
  }

  const createdBookPayload = await createBookPersistence(bookBody);
  return res.status(createdBookPayload.statusCode).json(createdBookPayload);
};

export { getAllBooks, getBookById, updateBookById, deleteBookById, createBook };
