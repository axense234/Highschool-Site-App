// Redux Toolkit
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type initialStateType = {
  loadingProfile: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
};

const initialState: initialStateType = {
  loadingProfile: "IDLE",
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //
  },
});

export default generalSlice.reducer;
