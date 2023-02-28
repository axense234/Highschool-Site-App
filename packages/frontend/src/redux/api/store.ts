// Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";
// Reducers
import generalSliceReducer from "../slices/generalSlice";
import announcementsSliceReducer from "../slices/announcementsSlice";

const store = configureStore({
  reducer: {
    general: generalSliceReducer,
    announcements: announcementsSliceReducer,
  },
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;
