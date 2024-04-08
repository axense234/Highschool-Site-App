// Prisma Types
import { Bookmark } from "@prisma/client";
// Redux Toolkit
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";
// Axios
import { AxiosError } from "axios";
import axiosInstance from "@/utils/axios";
// Types
import { ObjectKeyValueType } from "@/core/types/constants";
import { FormModalType, ErrorPayloadType } from "@/core/types/variables";
// Store
import { State } from "../api/store";
// Data
import { defaultTemplateBookmark } from "@/data";
// Interfaces
import TemplateBookmark from "@/core/interfaces/template/TemplateBookmark";

const bookmarksAdapter = createEntityAdapter<Bookmark>({
  sortComparer: (a, b) => a.label.localeCompare(b.label),
});

type InitialStateType = {
  loadingBookmarks: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingBookmark: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingCreateBookmark: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingDeleteBookmark: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingUpdateBookmark: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  templateBookmark: TemplateBookmark;
  formModal: FormModalType;
  foundBookmarkId: string;
};

const initialState = bookmarksAdapter.getInitialState({
  loadingBookmarks: "IDLE",
  loadingBookmark: "IDLE",
  loadingCreateBookmark: "IDLE",
  loadingDeleteBookmark: "IDLE",
  loadingUpdateBookmark: "IDLE",
  templateBookmark: defaultTemplateBookmark,
  formModal: {
    showModal: false,
    msg: "",
  },
  foundBookmarkId: "",
}) as EntityState<Bookmark> & InitialStateType;

// THUNKS
export const getAllBookmarks = createAsyncThunk<
  Bookmark[] | AxiosError,
  { userType: string; userTypeId: string }
>("bookmarks/getAllBookmarks", async ({ userType, userTypeId }) => {
  try {
    const { data } = await axiosInstance.get(
      `/bookmarks?filter=${userType}&filterValue=${userTypeId}`
    );
    return data.bookmarks as Bookmark[];
  } catch (error) {
    return error as AxiosError;
  }
});

export const getBookmarkById = createAsyncThunk<Bookmark | AxiosError, string>(
  "bookmarks/getBookmarkById",
  async (bookmarkId) => {
    try {
      const { data } = await axiosInstance.get(
        `/bookmarks/bookmark/${bookmarkId}`
      );
      return data.bookmark as Bookmark;
    } catch (error) {
      return error as AxiosError;
    }
  }
);

export const createBookmark = createAsyncThunk<
  Bookmark | AxiosError,
  TemplateBookmark
>("bookmarks/createBookmark", async (templateBookmark) => {
  try {
    const userId = localStorage.getItem("hsa-userId");
    const { data } = await axiosInstance.post(
      `/bookmarks/bookmark/create?userId=${userId}`,
      templateBookmark
    );
    return data.bookmark as Bookmark;
  } catch (error) {
    return error as AxiosError;
  }
});

export const deleteBookmarkById = createAsyncThunk<
  Bookmark | AxiosError,
  string
>("bookmarks/deleteBookmarkById", async (bookmarkId) => {
  try {
    const userId = localStorage.getItem("hsa-userId");
    const { data } = await axiosInstance.delete(
      `/bookmarks/bookmark/delete/${bookmarkId}?userId=${userId}`
    );
    return data.bookmark as Bookmark;
  } catch (error) {
    return error as AxiosError;
  }
});

export const updateBookmarkById = createAsyncThunk<
  Bookmark | AxiosError,
  TemplateBookmark
>("bookmarks/updateBookmarkById", async (templateBookmark) => {
  try {
    const userId = localStorage.getItem("hsa-userId");
    const { data } = await axiosInstance.patch(
      `/bookmarks/bookmark/update/${templateBookmark.bookmark_uid}?userId=${userId}`,
      templateBookmark
    );
    return data.bookmark as Bookmark;
  } catch (error) {
    return error as AxiosError;
  }
});

const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    updateTemplateBookmark(state, action: PayloadAction<ObjectKeyValueType>) {
      state.templateBookmark = {
        ...state.templateBookmark,
        [action.payload.key]: action.payload.value,
      };
    },
    updateBookmarksFormModal(state, action: PayloadAction<boolean>) {
      state.formModal.showModal = action.payload;
    },
    setTemplateBookmark(state, action: PayloadAction<TemplateBookmark>) {
      state.templateBookmark = action.payload;
    },
    setFoundBookmarkId(state, action: PayloadAction<string>) {
      state.foundBookmarkId = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllBookmarks.pending, (state, action) => {
        state.loadingBookmarks = "PENDING";
      })
      .addCase(getAllBookmarks.fulfilled, (state, action) => {
        const bookmarks = action.payload as Bookmark[];
        if (bookmarks.length >= 1) {
          bookmarks.map((bookmark) => {
            bookmark.id = bookmark.bookmark_uid;
            return bookmark;
          });
          bookmarksAdapter.upsertMany(state, bookmarks);
        }
        state.loadingBookmarks = "SUCCEDED";
      })
      .addCase(getBookmarkById.pending, (state, action) => {
        state.loadingBookmark = "PENDING";
      })
      .addCase(getBookmarkById.fulfilled, (state, action) => {
        const bookmark = action.payload as Bookmark;
        const axiosError = action.payload as AxiosError;

        if (!axiosError.response) {
          bookmark.id = bookmark.bookmark_uid;
          bookmarksAdapter.upsertOne(state, bookmark);
        }

        state.loadingBookmark = "SUCCEDED";
      })
      .addCase(createBookmark.pending, (state, action) => {
        state.loadingCreateBookmark = "PENDING";
      })
      .addCase(createBookmark.fulfilled, (state, action) => {
        const bookmark = action.payload as Bookmark;
        const axiosError = action.payload as AxiosError;

        if (axiosError.response?.status !== 200 && axiosError.response) {
          const data = axiosError.response?.data as ErrorPayloadType;
          state.formModal.showModal = true;
          state.formModal.msg = data.msg;
          state.formModal.color = "#f53838";
        } else {
          state.formModal.showModal = true;
          state.formModal.msg = "Am creat un marcaj cu success!";
          state.formModal.color = "#90ee90";
          bookmark.id = bookmark.bookmark_uid;
          bookmarksAdapter.addOne(state, bookmark);
        }

        state.loadingCreateBookmark = "SUCCEDED";
      })
      .addCase(deleteBookmarkById.pending, (state, action) => {
        state.loadingDeleteBookmark = "PENDING";
      })
      .addCase(deleteBookmarkById.fulfilled, (state, action) => {
        const bookmark = action.payload as Bookmark;

        if (bookmark) {
          bookmarksAdapter.removeOne(state, bookmark.bookmark_uid);
        }

        state.loadingDeleteBookmark = "SUCCEDED";
      })
      .addCase(updateBookmarkById.pending, (state, action) => {
        state.loadingUpdateBookmark = "PENDING";
      })
      .addCase(updateBookmarkById.fulfilled, (state, action) => {
        const bookmark = action.payload as Bookmark;
        const axiosError = action.payload as AxiosError;

        if (axiosError.response?.status !== 200 && axiosError.response) {
          const data = axiosError.response?.data as ErrorPayloadType;
          state.formModal.showModal = true;
          state.formModal.msg = data.msg;
          state.formModal.color = "#f53838";
        } else {
          state.formModal.showModal = true;
          state.formModal.msg = "Am actualizat contul tău de elev cu success!";
          state.formModal.color = "#90ee90";
          bookmark.id = bookmark.bookmark_uid;
          bookmarksAdapter.updateOne(state, {
            id: bookmark.bookmark_uid,
            changes: bookmark,
          });
          state.templateBookmark = bookmark as TemplateBookmark;
        }
        state.loadingUpdateBookmark = "SUCCEDED";
      });
  },
});

export const { selectAll: selectAllBookmarks, selectById: selectBookmarkById } =
  bookmarksAdapter.getSelectors<State>((state) => state.bookmarks);

export const selectLoadingBookmarks = (state: State) =>
  state.bookmarks.loadingBookmarks;

export const selectLoadingBookmark = (state: State) =>
  state.bookmarks.loadingBookmark;

export const selectLoadingCreateBookmark = (state: State) =>
  state.bookmarks.loadingCreateBookmark;

export const selectLoadingUpdateBookmark = (state: State) =>
  state.bookmarks.loadingUpdateBookmark;

export const selectLoadingDeleteBookmark = (state: State) =>
  state.bookmarks.loadingDeleteBookmark;

export const selectTemplateBookmark = (state: State) =>
  state.bookmarks.templateBookmark;

export const selectBookmarksFormModal = (state: State) =>
  state.bookmarks.formModal;

export const selectFoundBookmarkId = (state: State) =>
  state.bookmarks.foundBookmarkId;

export const {
  updateTemplateBookmark,
  updateBookmarksFormModal,
  setTemplateBookmark,
  setFoundBookmarkId,
} = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
