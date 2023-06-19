// Express
import express from "express";

// Controllers and Middleware
import {
  createBook,
  deleteBookById,
  getAllBooks,
  getBookById,
  updateBookById,
} from "../controllers/books";

const router = express.Router();

router.get("/books", getAllBooks);

router.get("/books/book/:bookId", getBookById);

router.post("/books/book/create", createBook);

router.patch("/books/book/update/:bookId", updateBookById);

router.delete("/books/book/delete/:bookId", deleteBookById);

export default router;
