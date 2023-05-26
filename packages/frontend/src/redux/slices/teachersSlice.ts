// Prisma Types
import { Profesor } from "@prisma/client";
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
  errorPayloadType,
  formModalType,
  objectKeyValueType,
  templateTeacher,
} from "types";
// Axios
import axios, { AxiosError } from "axios";
import axiosInstance from "@/utils/axios";
// Store
import { State } from "../api/store";
// Data
import { defaultTemplateTeacher, templateTeachers } from "@/data";
import { baseSiteUrl } from "@/config";

const teachersAdapter = createEntityAdapter<Profesor>({
  sortComparer: (a, b) => a.username.localeCompare(b.username),
});

type initialStateType = {
  loadingTeachers: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  templateTeacher: templateTeacher;
  formModal: formModalType;
};

const initialState = teachersAdapter.getInitialState({
  loadingTeachers: "IDLE",
  templateTeacher: defaultTemplateTeacher,
  formModal: {
    showModal: false,
    msg: "",
  },
}) as EntityState<Profesor> & initialStateType;

// THUNKS
export const getAllTeachers = createAsyncThunk<Profesor[] | AxiosError>(
  "teachers/getAllTeachers",
  async () => {
    try {
      const { data } = await axiosInstance.get("/profesori");
      return data.teachers as Profesor[];
    } catch (error) {
      return error as AxiosError;
    }
  }
);

export const createCloudinaryImageForTeacher = createAsyncThunk(
  "teachers/createCloudinaryImageForTeacher",
  async (imageFile: File) => {
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "highschool-site-app-teachers");
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

export const createTeacher = createAsyncThunk<
  Profesor | AxiosError,
  templateTeacher
>("teachers/createTeacher", async (templateTeacher) => {
  try {
    const { data } = await axiosInstance.post(
      "/profesori/create",
      templateTeacher
    );
    return data.teacher as Profesor;
  } catch (error) {
    return error as AxiosError;
  }
});

export const deleteTeacherById = createAsyncThunk<
  Profesor | AxiosError,
  string
>("teachers/deleteTeacherById", async (teacherId) => {
  try {
    const { data } = await axiosInstance.delete(
      `/profesori/profesor/delete/${teacherId}`
    );
    return data.teacher as Profesor;
  } catch (error) {
    return error as AxiosError;
  }
});

export const updateTeacherById = createAsyncThunk<
  Profesor | AxiosError,
  templateTeacher
>("teachers/updateTeacherById", async (templateTeacher) => {
  try {
    const { data } = await axiosInstance.patch(
      `/profesori/profesor/update/${templateTeacher.profesor_uid}`,
      templateTeacher
    );
    return data.teacher as Profesor;
  } catch (error) {
    return error as AxiosError;
  }
});

const teachersSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    updateTemplateTeacher(state, action: PayloadAction<objectKeyValueType>) {
      state.templateTeacher = {
        ...state.templateTeacher,
        [action.payload.key]: action.payload.value,
      };
    },
    updateTeachersFormModal(state, action: PayloadAction<boolean>) {
      state.formModal.showModal = action.payload;
    },
    setTemplateTeacher(state, action: PayloadAction<templateTeacher>) {
      state.templateTeacher = action.payload;
    },
  },
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
      })
      .addCase(createCloudinaryImageForTeacher.fulfilled, (state, action) => {
        state.templateTeacher.imagineProfilUrl = action.payload;
      })
      .addCase(createTeacher.fulfilled, (state, action) => {
        const teacher = action.payload as Profesor;
        const axiosError = action.payload as AxiosError;

        if (axiosError.response?.status !== 200 && axiosError.response) {
          const data = axiosError.response?.data as errorPayloadType;
          state.formModal.showModal = true;
          state.formModal.msg = data.msg;
          state.formModal.color = "red";
        } else {
          teacher.id = teacher.profesor_uid;
          teachersAdapter.addOne(state, teacher);
          window.location.href = `${baseSiteUrl}/profesori`;
        }
      })
      .addCase(deleteTeacherById.fulfilled, (state, action) => {
        const teacher = action.payload as Profesor;

        if (teacher) {
          teachersAdapter.removeOne(state, teacher.profesor_uid);
        }
      })
      .addCase(updateTeacherById.fulfilled, (state, action) => {
        const teacher = action.payload as Profesor;
        const axiosError = action.payload as AxiosError;

        if (axiosError.response?.status !== 200 && axiosError.response) {
          const data = axiosError.response?.data as errorPayloadType;
          state.formModal.showModal = true;
          state.formModal.msg = data.msg;
          state.formModal.color = "red";
        } else {
          teacher.id = teacher.profesor_uid;
          teachersAdapter.updateOne(state, {
            id: teacher.profesor_uid,
            changes: teacher,
          });
        }
      });
  },
});

export const { selectAll: selectAllTeachers, selectById: selectTeacherById } =
  teachersAdapter.getSelectors<State>((state) => state.teachers);

export const selectLoadingTeachers = (state: State) =>
  state.teachers.loadingTeachers;

export const selectTemplateTeacher = (state: State) =>
  state.teachers.templateTeacher;

export const selectTeachersFormModal = (state: State) =>
  state.teachers.formModal;

export const {
  updateTemplateTeacher,
  updateTeachersFormModal,
  setTemplateTeacher,
} = teachersSlice.actions;

export default teachersSlice.reducer;
