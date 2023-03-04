// Prisma Types
import { Profesor } from "@prisma/client";
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
// Store
import { State } from "../api/store";
// Data
import { templateTeachers } from "@/data";

const teachersAdapter = createEntityAdapter<Profesor>({
  sortComparer: (a, b) => a.username.localeCompare(b.username),
});

type initialStateType = {
  loadingTeachers: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
};

const initialState = teachersAdapter.getInitialState({
  loadingTeachers: "IDLE",
}) as EntityState<Profesor> & initialStateType;

// THUNKS
export const getAllTeachers = createAsyncThunk<Profesor[] | AxiosError>(
  "teachers/getAllTeachers",
  async () => {
    try {
      const { data } = await axiosInstance.get("/profesori");
      return data.teachers as Profesor[];
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

const teachersSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllTeachers.pending, (state, action) => {
        state.loadingTeachers = "PENDING";
      })
      .addCase(getAllTeachers.fulfilled, (state, action) => {
        const teachers = action.payload as Profesor[];
        if (teachers.length >= 1) {
          teachers.map((teacher) => {
            teacher.id = teacher.profesor_uid;
            return teacher;
          });
          teachersAdapter.upsertMany(state, teachers);
        } else {
          teachersAdapter.upsertMany(state, templateTeachers);
        }
        state.loadingTeachers = "SUCCEDED";
      });
  },
});

export const { selectAll: selectAllTeachers } =
  teachersAdapter.getSelectors<State>((state) => state.teachers);

export const selectLoadingTeachers = (state: State) =>
  state.teachers.loadingTeachers;

export default teachersSlice.reducer;
