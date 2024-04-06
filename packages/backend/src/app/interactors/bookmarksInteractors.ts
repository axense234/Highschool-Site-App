// Express and Others
import { Request, Response } from "express";
// Persistences
import getAllBookmarksPersistence from "../persistences/bookmarks/getAllBookmarksPersistence";
import getBookmarkByIdPersistence from "../persistences/bookmarks/getBookmarkByIdPersistence";
import updateBookmarkByIdPersistence from "../persistences/bookmarks/updateBookmarkByIdPersistence";
import deleteBookmarkByIdPersistence from "../persistences/bookmarks/deleteBookmarkByIdPersistence";
import createBookmarkPersistence from "../persistences/bookmarks/createBookmarkPersistence";

const getAllBookmarks = async (req: Request, res: Response) => {
  const { filter, filterValue, userId } = req.query;

  const foundBookmarksPayload = await getAllBookmarksPersistence(
    filter as string,
    filterValue as string,
    userId as string
  );

  return res
    .status(foundBookmarksPayload.statusCode)
    .json(foundBookmarksPayload);
};

const getBookmarkById = async (req: Request, res: Response) => {
  const { bookmarkId } = req.params;
  const { userId } = req.query;

  const foundBookmarkPayload = await getBookmarkByIdPersistence(
    bookmarkId,
    userId as string
  );
  return res.status(foundBookmarkPayload.statusCode).json(foundBookmarkPayload);
};

const updateBookmarkById = async (req: Request, res: Response) => {
  const { bookmarkId } = req.params;
  const bookmarkBody = req.body;
  const { userId } = req.query;

  const updatedBookmarkPayload = await updateBookmarkByIdPersistence(
    bookmarkId,
    bookmarkBody,
    userId as string
  );

  return res
    .status(updatedBookmarkPayload.statusCode)
    .json(updatedBookmarkPayload);
};

const deleteBookmarkById = async (req: Request, res: Response) => {
  const { bookmarkId } = req.params;
  const { userId } = req.query;

  const deletedBookmarkPayload = await deleteBookmarkByIdPersistence(
    bookmarkId,
    userId as string
  );
  return res
    .status(deletedBookmarkPayload.statusCode)
    .json(deletedBookmarkPayload);
};

const createBookmark = async (req: Request, res: Response) => {
  const bookmarkBody = req.body;
  const { userId } = req.query;

  delete bookmarkBody.admin;
  delete bookmarkBody.teacher;
  delete bookmarkBody.student;

  const createdBookmarkPayload = await createBookmarkPersistence(
    bookmarkBody,
    userId as string
  );
  return res
    .status(createdBookmarkPayload.statusCode)
    .json(createdBookmarkPayload);
};

export {
  getAllBookmarks,
  getBookmarkById,
  updateBookmarkById,
  deleteBookmarkById,
  createBookmark,
};
