// Prisma
import { Anunt } from "@prisma/client";
// Redux Toolkit
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityState,
} from "@reduxjs/toolkit";
// Axios
import { AxiosError } from "axios";
import axiosInstance from "@/utils/axios";
// State
import { State } from "../api/store";

type initialStateType = {
  loadingAnnouncements: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
};

const announcementsAdapter = createEntityAdapter<Anunt>({
  sortComparer: (a, b) => a.titlu.localeCompare(b.titlu),
});

const initialState = announcementsAdapter.getInitialState({
  loadingAnnouncements: "IDLE",
}) as EntityState<Anunt> & initialStateType;

// THUNKS
export const getAllAnnouncements = createAsyncThunk<Anunt[] | AxiosError>(
  "announcements/getAllAnnouncements",
  async () => {
    try {
      const { data } = await axiosInstance.get("/anunturi");
      return data.announcements as Anunt[];
    } catch (error) {
      return error as AxiosError;
    }
  }
);

const announcementsSlice = createSlice({
  name: "announcements",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllAnnouncements.pending, (state, action) => {
        state.loadingAnnouncements = "PENDING";
      })
      .addCase(getAllAnnouncements.fulfilled, (state, action) => {
        const announcements = action.payload as Anunt[];
        if (announcements.length > 1) {
          announcements.map((announcement) => {
            announcement.id = announcement.anunt_uid;
            return announcement;
          });
        }
        announcementsAdapter.upsertMany(state, announcements);
        state.loadingAnnouncements = "SUCCEDED";
      })
      .addCase(getAllAnnouncements.rejected, (state, action) => {
        state.loadingAnnouncements = "FAILED";
      });
  },
});

export const { selectAll: selectAllAnnouncements } =
  announcementsAdapter.getSelectors<State>((state) => state.announcements);

export const selectLoadingAnnouncements = (state: State) =>
  state.announcements.loadingAnnouncements;

export default announcementsSlice.reducer;
