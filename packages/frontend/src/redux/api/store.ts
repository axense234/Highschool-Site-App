// Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";
// Reducers
import generalSliceReducer from "../slices/generalSlice";
import announcementsSliceReducer from "../slices/announcementsSlice";
import teachersSliceReducer from "../slices/teachersSlice";
import adminsSliceReducer from "../slices/adminsSlice";
import studentsSliceReducer from "../slices/studentsSlice";

const store = configureStore({
  reducer: {
    general: generalSliceReducer,
    announcements: announcementsSliceReducer,
    teachers: teachersSliceReducer,
    admins: adminsSliceReducer,
    students: studentsSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;
