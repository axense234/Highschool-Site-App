// Express
import express from "express";

// Controllers and Middleware
import {
  createBookmark,
  deleteBookmarkById,
  getAllBookmarks,
  getBookmarkById,
  updateBookmarkById,
} from "../controllers/bookmarks";

const router = express.Router();

router.get("/bookmarks", getAllBookmarks);

router.get("/bookmarks/bookmark/:bookmarkId", getBookmarkById);

router.post("/bookmarks/bookmark/create", createBookmark);

router.patch("/bookmarks/bookmark/update/:bookmarkId", updateBookmarkById);

router.delete("/bookmarks/bookmark/delete/:bookmarkId", deleteBookmarkById);

export default router;
