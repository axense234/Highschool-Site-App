// Prisma
import { Class, Student, Teacher } from "@prisma/client";
// Redux Toolkit
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";
// Axios
import axios, { AxiosError } from "axios";
import axiosInstance from "@/utils/axios";
// Types
import { ObjectKeyValueType } from "@/core/types/constants";
import { FormModalType, ErrorPayloadType } from "@/core/types/variables";
// State
import { State } from "../api/store";
// Data
import { defaultTemplateClass } from "@/data";
// Config
import { baseSiteUrl } from "@/config";
// Interfaces
import TemplateClass from "@/core/interfaces/template/TemplateClass";

type InitialStateType = {
  loadingClasses: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingClass: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingCreateClass: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingUpdateClass: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingDeleteClass: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingMoveClass: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingCreateCloudinaryImageForClass:
    | "IDLE"
    | "PENDING"
    | "SUCCEDED"
    | "FAILED";
  templateClass: TemplateClass;
  formModal: FormModalType;
  foundClassId: string;
};

const classesAdapter = createEntityAdapter<Class>({
  sortComparer: (a, b) => a.label.localeCompare(b.label),
});

const initialState = classesAdapter.getInitialState({
  loadingClasses: "IDLE",
  loadingClass: "IDLE",
  loadingCreateClass: "IDLE",
  loadingUpdateClass: "IDLE",
  loadingDeleteClass: "IDLE",
  loadingMoveClass: "IDLE",
  loadingCreateCloudinaryImageForClass: "IDLE",
  templateClass: defaultTemplateClass,
  formModal: {
    msg: "",
    showModal: false,
  },
  foundClassId: "",
  screenLoadingMessageForClasses: "Se încarcă, vă rugăm să așteptați!",
}) as EntityState<Class> & InitialStateType;

// THUNKS
export const getAllClasses = createAsyncThunk<Class[] | AxiosError>(
  "classes/getAllClasses",
  async () => {
    try {
      const { data } = await axiosInstance.get(
        `/classes?includeStudents=false`
      );
      return data.classes as Class[];
    } catch (error) {
      return error as AxiosError;
    }
  }
);

export const getClassById = createAsyncThunk<Class | AxiosError, string>(
  "classes/getClassById",
  async (classId) => {
    try {
      const { data } = await axiosInstance.get(
        `/classes/class/${classId}?includeTeachers=true&includeStudents=true&includeMasterTeacher=true`
      );
      return data.class as Class;
    } catch (error) {
      return error as AxiosError;
    }
  }
);

export const createCloudinaryImageForClass = createAsyncThunk(
  "classes/createCloudinaryImageForClass",
  async (imageFile: File) => {
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "highschool-site-app-classes");
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

export const createClass = createAsyncThunk<Class | AxiosError, TemplateClass>(
  "classes/createClass",
  async (templateClass) => {
    try {
      const { data } = await axiosInstance.post(
        "/classes/class/create",
        templateClass
      );
      return data.class as Class;
    } catch (error) {
      return error as AxiosError;
    }
  }
);

export const deleteClassById = createAsyncThunk<Class | AxiosError, string>(
  "classes/deleteClass",
  async (classId) => {
    try {
      const { data } = await axiosInstance.delete(
        `/classes/class/delete/${classId}`
      );
      return data.class as Class;
    } catch (error) {
      return error as AxiosError;
    }
  }
);

export const updateClassById = createAsyncThunk<
  Class | AxiosError,
  TemplateClass
>("classes/updateClass", async (templateClass) => {
  try {
    const { data } = await axiosInstance.patch(
      `/classes/announcement/update/${templateClass.class_uid}`,
      templateClass
    );
    return data.class as Class;
  } catch (error) {
    return error as AxiosError;
  }
});

const classesSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    updateTemplateClass(state, action: PayloadAction<ObjectKeyValueType>) {
      state.templateClass = {
        ...state.templateClass,
        [action.payload.key]: action.payload.value,
      };
    },
    updateClassFormModal(state, action: PayloadAction<boolean>) {
      state.formModal.showModal = action.payload;
    },
    setTemplateClass(state, action: PayloadAction<TemplateClass>) {
      state.templateClass = action.payload;
    },
    setFoundClassId(state, action: PayloadAction<string>) {
      state.foundClassId = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllClasses.pending, (state, action) => {
        state.loadingClasses = "PENDING";
      })
      .addCase(getAllClasses.fulfilled, (state, action) => {
        const classes = action.payload as Class[];

        if (classes.length >= 1) {
          classes.map((classItem) => {
            classItem.id = classItem.class_uid;
            return classItem;
          });
          classesAdapter.removeAll(state);
          classesAdapter.upsertMany(state, classes);
        }
        state.loadingClasses = "SUCCEDED";
      })
      .addCase(getAllClasses.rejected, (state, action) => {
        state.loadingClasses = "FAILED";
      })
      .addCase(getClassById.pending, (state, action) => {
        state.loadingClass = "PENDING";
      })
      .addCase(getClassById.fulfilled, (state, action) => {
        const classItem = action.payload as TemplateClass;
        const axiosError = action.payload as AxiosError;

        if (!axiosError.response) {
          if (classItem.students) {
            (classItem.students as Student[]).map((student) => {
              student.id = student.student_uid;
              return student;
            });
          }

          if (classItem.teachers) {
            (classItem.teachers as Teacher[]).map((teacher) => {
              teacher.id = teacher.teacher_uid;
              return teacher;
            });
          }

          if (classItem.master_teacher) {
            classItem.master_teacher.id = classItem.master_teacher.teacher_uid;
          }

          classItem.id = classItem.class_uid as string;
          classesAdapter.upsertOne(state, classItem as Class);
        }
        state.loadingClass = "SUCCEDED";
      })
      .addCase(createCloudinaryImageForClass.pending, (state, action) => {
        state.loadingCreateCloudinaryImageForClass = "PENDING";
      })
      .addCase(createCloudinaryImageForClass.fulfilled, (state, action) => {
        state.templateClass.image_url = action.payload;
        state.loadingCreateCloudinaryImageForClass = "SUCCEDED";
      })
      .addCase(createClass.pending, (state, action) => {
        state.loadingCreateClass = "PENDING";
      })
      .addCase(createClass.fulfilled, (state, action) => {
        const classItem = action.payload as Class;
        const axiosError = action.payload as AxiosError;

        if (axiosError.response?.status !== 200 && axiosError.response) {
          const data = axiosError.response?.data as ErrorPayloadType;
          state.formModal.showModal = true;
          state.formModal.msg = data.msg;
          state.templateClass.label = "";
          state.formModal.color = "#f53838";
        } else {
          state.formModal.showModal = true;
          state.formModal.msg = "Am creat o clasă cu success!";
          state.formModal.color = "#90ee90";
          classItem.id = classItem.class_uid;
          classesAdapter.addOne(state, classItem);
          window.location.href = `${baseSiteUrl}/clase/${classItem.class_uid}`;
        }
        state.loadingCreateClass = "SUCCEDED";
      })
      .addCase(deleteClassById.pending, (state, action) => {
        state.loadingDeleteClass = "PENDING";
      })
      .addCase(deleteClassById.fulfilled, (state, action) => {
        const classItem = action.payload as Class;

        if (classItem) {
          classesAdapter.removeOne(state, classItem.class_uid);
        }

        state.loadingDeleteClass = "SUCCEDED";
      })
      .addCase(updateClassById.pending, (state, action) => {
        state.loadingUpdateClass = "PENDING";
      })
      .addCase(updateClassById.fulfilled, (state, action) => {
        const classItem = action.payload as Class;
        const axiosError = action.payload as AxiosError;

        if (axiosError.response?.status !== 200 && axiosError.response) {
          const data = axiosError.response?.data as ErrorPayloadType;
          state.formModal.showModal = true;
          state.formModal.msg = data.msg;
          state.formModal.color = "#f53838";
        } else {
          classItem.id = classItem.class_uid;
          classesAdapter.updateOne(state, {
            id: classItem.class_uid,
            changes: classItem,
          });
        }
        state.loadingUpdateClass = "SUCCEDED";
      });
  },
});

export const { selectAll: selectAllClasses, selectById: selectClassById } =
  classesAdapter.getSelectors<State>((state) => state.classes);

export const selectLoadingClasses = (state: State) =>
  state.classes.loadingClasses;

export const selectLoadingClass = (state: State) => state.classes.loadingClass;

export const selectLoadingCreateClass = (state: State) =>
  state.classes.loadingCreateClass;

export const selectLoadingUpdateClass = (state: State) =>
  state.classes.loadingUpdateClass;

export const selectLoadingDeleteClass = (state: State) =>
  state.classes.loadingDeleteClass;

export const selectLoadingCreateCloudinaryImageForClass = (state: State) =>
  state.classes.loadingCreateCloudinaryImageForClass;

export const selectTemplateClass = (state: State) =>
  state.classes.templateClass;

export const selectClassesFormModal = (state: State) => state.classes.formModal;

export const selectFoundClassId = (state: State) => state.classes.foundClassId;

export const {
  updateTemplateClass,
  setTemplateClass,
  setFoundClassId,
  updateClassFormModal,
} = classesSlice.actions;

export default classesSlice.reducer;
