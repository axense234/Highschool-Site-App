// Express and Others
import { Request, Response } from "express";
// Persistences
import getAllBookmarksPersistence from "../persistences/bookmarks/getAllBookmarksPersistence";
import getBookmarkByIdPersistence from "../persistences/bookmarks/getBookmarkByIdPersistence";
import updateBookmarkByIdPersistence from "../persistences/bookmarks/updateBookmarkByIdPersistence";
import deleteBookmarkByIdPersistence from "../persistences/bookmarks/deleteBookmarkByIdPersistence";
import createBookmarkPersistence from "../persistences/bookmarks/createBookmarkPersistence";

const getAllBookmarks = async (req: Request, res: Response) => {
  const foundBookmarksPayload = await getAllBookmarksPersistence();
  return res
    .status(foundBookmarksPayload.statusCode)
    .json(foundBookmarksPayload);
};

const getBookmarkById = async (req: Request, res: Response) => {
  const { bookmarkId } = req.params;

  const foundBookmarkPayload = await getBookmarkByIdPersistence(bookmarkId);
  return res.status(foundBookmarkPayload.statusCode).json(foundBookmarkPayload);
};

const updateBookmarkById = async (req: Request, res: Response) => {
  const { bookmarkId } = req.params;
  const bookmarkBody = req.body;

  const updatedBookmarkPayload = await updateBookmarkByIdPersistence(
    bookmarkId,
    bookmarkBody
  );

  return res
    .status(updatedBookmarkPayload.statusCode)
    .json(updatedBookmarkPayload);
};

const deleteBookmarkById = async (req: Request, res: Response) => {
  const { bookmarkId } = req.params;

  const deletedBookmarkPayload = await deleteBookmarkByIdPersistence(
    bookmarkId
  );
  return res
    .status(deletedBookmarkPayload.statusCode)
    .json(deletedBookmarkPayload);
};

const createBookmark = async (req: Request, res: Response) => {
  const bookmarkBody = req.body;

  delete bookmarkBody.admin;
  delete bookmarkBody.teacher;
  delete bookmarkBody.student;

  const createdBookmarkPayload = await createBookmarkPersistence(bookmarkBody);
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
