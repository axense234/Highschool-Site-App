// Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";
// Reducers
import generalSliceReducer from "../slices/generalSlice";
import announcementsSliceReducer from "../slices/announcementsSlice";
import teachersSliceReducer from "../slices/teachersSlice";
import adminsSliceReducer from "../slices/adminsSlice";
import studentsSliceReducer from "../slices/studentsSlice";
import classesSliceReducer from "../slices/classesSlice";
import gradesSliceReducer from "../slices/gradesSlice";
import absencesSliceReducer from "../slices/absencesSlice";
import booksSliceReducer from "../slices/booksSlice";

const store = configureStore({
  reducer: {
    general: generalSliceReducer,
    announcements: announcementsSliceReducer,
    teachers: teachersSliceReducer,
    admins: adminsSliceReducer,
    students: studentsSliceReducer,
    classes: classesSliceReducer,
    grades: gradesSliceReducer,
    absences: absencesSliceReducer,
    books: booksSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;
