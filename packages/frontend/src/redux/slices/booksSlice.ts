// Prisma
import { Book } from "@prisma/client";
// Redux Toolkit
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";
// Types
import {
  BookSortingOptions,
  ErrorPayloadType,
  FormModalType,
  ObjectKeyValueType,
  TemplateBook,
} from "types";
// Axios
import axios, { Axios, AxiosError } from "axios";
import axiosInstance from "@/utils/axios";
// State
import { State } from "../api/store";
// Data
import { defaultTemplateBook } from "@/data";
// Config
import { baseSiteUrl } from "@/config";

type InitialStateType = {
  loadingBooks: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingBook: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingCreateBook: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingUpdateBook: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingDeleteBook: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingMoveBook: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingCreateCloudinaryImageForBook:
    | "IDLE"
    | "PENDING"
    | "SUCCEDED"
    | "FAILED";
  templateBook: TemplateBook;
  formModal: FormModalType;
  foundBookId: string;
};

const booksAdapter = createEntityAdapter<Book>();

const initialState = booksAdapter.getInitialState({
  loadingBooks: "IDLE",
  loadingBook: "IDLE",
  loadingCreateBook: "IDLE",
  loadingUpdateBook: "IDLE",
  loadingDeleteBook: "IDLE",
  loadingMoveBook: "IDLE",
  loadingCreateCloudinaryImageForBook: "IDLE",
  templateBook: defaultTemplateBook,
  formModal: {
    msg: "",
    showModal: false,
  },
  foundBookId: "",
  screenLoadingMessageForBooks: "Se încarcă, vă rugăm să așteptați!",
}) as EntityState<Book> & InitialStateType;

// THUNKS
export const getAllBooks = createAsyncThunk<
  Book[] | AxiosError,
  BookSortingOptions
>("books/getAllBooks", async ({ sortByFilter, sortByFilterValue }) => {
  try {
    const { data } = await axiosInstance.get(
      `/books?filterQuery=author&sortByFilter=${sortByFilter}&sortByFilterValue=${sortByFilterValue}`
    );
    return data.books as Book[];
  } catch (error) {
    return error as AxiosError;
  }
});

export const getBookById = createAsyncThunk<Book | AxiosError, string>(
  "books/getBookById",
  async (bookId) => {
    try {
      const { data } = await axiosInstance.get(`/books/book/${bookId}`);
      return data.book as Book;
    } catch (error) {
      return error as AxiosError;
    }
  }
);

export const createCloudinaryImageForBook = createAsyncThunk(
  "books/createCloudinaryImageForBook",
  async (imageFile: File) => {
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "highschool-site-app-books");
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/birthdayreminder/image/upload",
        formData
      );
      return data.secure_url;
    } catch (error) {
      return error;
    }
  }
);

export const createBook = createAsyncThunk<Book | AxiosError, TemplateBook>(
  "books/createBook",
  async (templateBook) => {
    try {
      console.log(templateBook);
      const { data } = await axiosInstance.post(
        "/books/book/create",
        templateBook
      );
      return data.book as Book;
    } catch (error) {
      return error as AxiosError;
    }
  }
);

export const deleteBookById = createAsyncThunk<Book | AxiosError, string>(
  "books/deleteBook",
  async (bookId) => {
    try {
      const { data } = await axiosInstance.delete(
        `/books/book/delete/${bookId}`
      );
      return data.book as Book;
    } catch (error) {
      return error as AxiosError;
    }
  }
);

export const updateBookById = createAsyncThunk<Book | AxiosError, TemplateBook>(
  "books/updateBook",
  async (templateBook) => {
    try {
      const { data } = await axiosInstance.patch(
        `/books/book/update/${templateBook.book_uid}`,
        templateBook
      );
      return data.book as Book;
    } catch (error) {
      return error as AxiosError;
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    updateTemplateBook(state, action: PayloadAction<ObjectKeyValueType>) {
      state.templateBook = {
        ...state.templateBook,
        [action.payload.key]: action.payload.value,
      };
    },
    updateBookFormModal(state, action: PayloadAction<boolean>) {
      state.formModal.showModal = action.payload;
    },
    setTemplateBook(state, action: PayloadAction<TemplateBook>) {
      state.templateBook = action.payload;
    },
    setFoundBookId(state, action: PayloadAction<string>) {
      state.foundBookId = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllBooks.pending, (state, action) => {
        state.loadingBooks = "PENDING";
      })
      .addCase(getAllBooks.fulfilled, (state, action) => {
        const books = action.payload as Book[];
        const axiosError = action.payload as AxiosError;

        if (!axiosError.response) {
          books.map((book) => {
            book.id = book.book_uid;
            return book;
          });
          booksAdapter.removeAll(state);
          booksAdapter.upsertMany(state, books);
        } else {
          booksAdapter.removeAll(state);
          booksAdapter.upsertMany(state, []);
        }
        state.loadingBooks = "SUCCEDED";
      })
      .addCase(getAllBooks.rejected, (state, action) => {
        state.loadingBooks = "FAILED";
      })
      .addCase(getBookById.pending, (state, action) => {
        state.loadingBook = "PENDING";
      })
      .addCase(getBookById.fulfilled, (state, action) => {
        const book = action.payload as Book;
        const axiosError = action.payload as AxiosError;

        if (!axiosError.response) {
          book.id = book.book_uid;
          booksAdapter.upsertOne(state, book as Book);
        }
        state.loadingBook = "SUCCEDED";
      })
      .addCase(createCloudinaryImageForBook.pending, (state, action) => {
        state.loadingCreateCloudinaryImageForBook = "PENDING";
      })
      .addCase(createCloudinaryImageForBook.fulfilled, (state, action) => {
        state.templateBook.pdf_file_preview_url = action.payload;
        state.loadingCreateCloudinaryImageForBook = "SUCCEDED";
      })
      .addCase(createBook.pending, (state, action) => {
        state.loadingCreateBook = "PENDING";
      })
      .addCase(createBook.fulfilled, (state, action) => {
        const book = action.payload as Book;
        const axiosError = action.payload as AxiosError;
        console.log(axiosError);

        if (axiosError.response?.status !== 200 && axiosError.response) {
          const data = axiosError.response?.data as ErrorPayloadType;
          state.formModal.showModal = true;
          state.formModal.msg = data.msg;
          state.formModal.color = "#f53838";
        } else {
          state.formModal.showModal = true;
          state.formModal.msg = "Am creat o carte cu success!";
          state.formModal.color = "#90ee90";
          book.id = book.book_uid;
          booksAdapter.addOne(state, book);
          window.location.href = `${baseSiteUrl}/biblioteca`;
        }
        state.loadingCreateBook = "SUCCEDED";
      })
      .addCase(deleteBookById.pending, (state, action) => {
        state.loadingDeleteBook = "PENDING";
      })
      .addCase(deleteBookById.fulfilled, (state, action) => {
        const book = action.payload as Book;

        if (book) {
          booksAdapter.removeOne(state, book.book_uid);
        }

        state.loadingDeleteBook = "SUCCEDED";
      })
      .addCase(updateBookById.pending, (state, action) => {
        state.loadingUpdateBook = "PENDING";
      })
      .addCase(updateBookById.fulfilled, (state, action) => {
        const book = action.payload as Book;
        const axiosError = action.payload as AxiosError;

        if (axiosError.response?.status !== 200 && axiosError.response) {
          const data = axiosError.response?.data as ErrorPayloadType;
          state.formModal.showModal = true;
          state.formModal.msg = data.msg;
          state.formModal.color = "#f53838";
        } else {
          book.id = book.book_uid;
          booksAdapter.updateOne(state, {
            id: book.book_uid,
            changes: book,
          });
        }
        state.loadingUpdateBook = "SUCCEDED";
      });
  },
});

export const { selectAll: selectAllBooks, selectById: selectBookById } =
  booksAdapter.getSelectors<State>((state) => state.books);

export const selectLoadingBooks = (state: State) => state.books.loadingBooks;

export const selectLoadingBook = (state: State) => state.books.loadingBook;

export const selectLoadingCreateBook = (state: State) =>
  state.books.loadingCreateBook;

export const selectLoadingUpdateBook = (state: State) =>
  state.books.loadingUpdateBook;

export const selectLoadingDeleteBook = (state: State) =>
  state.books.loadingDeleteBook;

export const selectLoadingCreateCloudinaryImageForBook = (state: State) =>
  state.books.loadingCreateCloudinaryImageForBook;

export const selectTemplateBook = (state: State) => state.books.templateBook;

export const selectBooksFormModal = (state: State) => state.books.formModal;

export const selectFoundBookId = (state: State) => state.books.foundBookId;

export const {
  updateTemplateBook,
  setTemplateBook,
  setFoundBookId,
  updateBookFormModal,
} = booksSlice.actions;

export default booksSlice.reducer;
