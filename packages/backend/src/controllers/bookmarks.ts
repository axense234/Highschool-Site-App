// Express and Others
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
// Prisma
import { Bookmark } from "@prisma/client";
import { bookmarkClient } from "../db/postgres";

const getAllBookmarks = async (req: Request, res: Response) => {
  const foundBookmarks = await bookmarkClient.findMany({});

  if (foundBookmarks.length < 1) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: "Could not find any bookmarks, please try again later!",
      bookmarks: [],
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully found ${foundBookmarks.length} bookmarks!`,
    nbHits: foundBookmarks.length,
    bookmarks: foundBookmarks,
  });
};

const getBookmarkById = async (req: Request, res: Response) => {
  const { bookmarkId } = req.params;

  if (!bookmarkId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter a valid bookmark id!", bookmark: {} });
  }

  const foundBookmark = await bookmarkClient.findUnique({
    where: { bookmark_uid: bookmarkId },
  });

  if (!foundBookmark) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any bookmarks with the following id:${bookmarkId}!`,
      bookmark: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully found a boomark with id:${bookmarkId}!`,
    bookmark: foundBookmark,
  });
};

const updateBookmarkById = async (req: Request, res: Response) => {
  const { bookmarkId } = req.params;
  const bookmarkBody = req.body as Bookmark;

  if (!bookmarkId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter a bookmark id!", bookmark: {} });
  }

  const foundBookmark = await bookmarkClient.findUnique({
    where: { bookmark_uid: bookmarkId },
  });

  if (!foundBookmark) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any bookmarks with the following id:${bookmarkId}!`,
      bookmark: {},
    });
  }

  const updatedBookmark = await bookmarkClient.update({
    where: { bookmark_uid: bookmarkId },
    data: { ...bookmarkBody },
  });

  if (!updatedBookmark) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: `Something went wrong while trying to update a bookmark!`,
      bookmark: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully updated bookmark with id: ${bookmarkId}`,
    bookmark: updatedBookmark,
  });
};

const deleteBookmarkById = async (req: Request, res: Response) => {
  const { bookmarkId } = req.params;

  if (!bookmarkId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter a bookmark id!", bookmark: {} });
  }

  const foundBookmark = await bookmarkClient.findUnique({
    where: { bookmark_uid: bookmarkId },
  });

  if (!foundBookmark) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any bookmarks with the following id:${bookmarkId}!`,
      bookmark: {},
    });
  }

  const deletedBookmark = await bookmarkClient.delete({
    where: { bookmark_uid: bookmarkId },
  });

  if (!deletedBookmark) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any bookmarks with id:${bookmarkId} or something went wrong!`,
      bookmark: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully deleted bookmark with id:${bookmarkId}!`,
    bookmark: deletedBookmark,
  });
};

const createBookmark = async (req: Request, res: Response) => {
  const bookmarkBody = req.body;

  delete bookmarkBody.admin;
  delete bookmarkBody.teacher;
  delete bookmarkBody.student;

  const createdBookmark = await bookmarkClient.create({
    data: { ...bookmarkBody },
  });

  if (!createdBookmark) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: `Something went wrong while creating a bookmark!`,
      bookmark: {},
    });
  }

  return res.status(StatusCodes.CREATED).json({
    msg: `Successfully created a bookmark with id:${createdBookmark.bookmark_uid}`,
    bookmark: createdBookmark,
  });
};

export {
  getAllBookmarks,
  getBookmarkById,
  updateBookmarkById,
  deleteBookmarkById,
  createBookmark,
};
