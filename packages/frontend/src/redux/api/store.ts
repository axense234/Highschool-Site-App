// Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";
// Reducers
import generalSliceReducer from "../slices/generalSlice";
import announcementsSliceReducer from "../slices/announcementsSlice";
import teachersSliceReducer from "../slices/teachersSlice";

const store = configureStore({
  reducer: {
    general: generalSliceReducer,
    announcements: announcementsSliceReducer,
    teachers: teachersSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;
