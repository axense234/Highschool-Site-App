// Prisma Types
import { Teacher } from "@prisma/client";
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
import {
  FormModalType,
  GetAllQueryParams,
  ErrorPayloadType,
} from "@/core/types/variables";
// Store
import { State } from "../api/store";
// Data
import { defaultTemplateTeacher } from "@/data";
// Config
import { baseSiteUrl } from "@/config";
// Interfaces
import TemplateTeacher from "@/core/interfaces/template/TemplateTeacher";
import TemplateUpdateTeacher from "@/core/interfaces/template/TemplateUpdateTeacher";

export const teachersAdapter = createEntityAdapter<Teacher>();

type InitialStateType = {
  loadingTeachers: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingTeacher: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingCreateTeacher: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingDeleteTeacher: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingUpdateTeacher: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingCreateCloudinaryImageForTeacher:
    | "IDLE"
    | "PENDING"
    | "SUCCEDED"
    | "FAILED";
  templateTeacher: TemplateTeacher;
  formModal: FormModalType;
  foundTeacherId: string;
};

const initialState = teachersAdapter.getInitialState({
  loadingTeachers: "IDLE",
  loadingTeacher: "IDLE",
  loadingCreateTeacher: "IDLE",
  loadingDeleteTeacher: "IDLE",
  loadingUpdateTeacher: "IDLE",
  loadingCreateCloudinaryImageForTeacher: "IDLE",
  templateTeacher: defaultTemplateTeacher,
  formModal: {
    showModal: false,
    msg: "",
  },
  foundTeacherId: "",
}) as EntityState<Teacher> & InitialStateType;

// THUNKS
export const getAllTeachers = createAsyncThunk<
  Teacher[] | AxiosError,
  GetAllQueryParams
>("teachers/getAllTeachers", async ({ query, sortByOption }) => {
  try {
    const { data } = await axiosInstance.get(
      `/teachers?sortByFilter=${sortByOption}&filterQuery=${query}`
    );
    return data.teachers as Teacher[];
  } catch (error) {
    return error as AxiosError;
  }
});

export const getTeacherById = createAsyncThunk<Teacher | AxiosError, string>(
  "teachers/getTeacherById",
  async (teacherId) => {
    try {
      const { data } = await axiosInstance.get(
        `/teachers/teacher/${teacherId}?includeClassrooms=true`
      );
      return data.teacher as Teacher;
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
  Teacher | AxiosError,
  TemplateTeacher
>("teachers/createTeacher", async (templateTeacher) => {
  try {
    const { data } = await axiosInstance.post(
      "/users/create/PROFESOR",
      templateTeacher
    );
    return data.user as Teacher;
  } catch (error) {
    return error as AxiosError;
  }
});

export const deleteTeacherById = createAsyncThunk<Teacher | AxiosError, string>(
  "teachers/deleteTeacherById",
  async (teacherId) => {
    try {
      const { data } = await axiosInstance.delete(
        `/teachers/teacher/delete/${teacherId}`
      );
      return data.teacher as Teacher;
    } catch (error) {
      return error as AxiosError;
    }
  }
);

export const updateTeacherById = createAsyncThunk<
  Teacher | AxiosError,
  TemplateUpdateTeacher
>("teachers/updateTeacherById", async (templateTeacher) => {
  try {
    const { data } = await axiosInstance.patch(
      `/teachers/teacher/update/${templateTeacher.teacher_uid}`,
      templateTeacher
    );
    return data.teacher as Teacher;
  } catch (error) {
    return error as AxiosError;
  }
});

const teachersSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    updateTemplateTeacher(state, action: PayloadAction<ObjectKeyValueType>) {
      state.templateTeacher = {
        ...state.templateTeacher,
        [action.payload.key]: action.payload.value,
      };
    },
    updateTeachersFormModal(state, action: PayloadAction<boolean>) {
      state.formModal.showModal = action.payload;
    },
    setTemplateTeacher(state, action: PayloadAction<TemplateTeacher>) {
      state.templateTeacher = action.payload;
    },
    setFoundTeacherId(state, action: PayloadAction<string>) {
      state.foundTeacherId = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllTeachers.pending, (state, action) => {
        state.loadingTeachers = "PENDING";
      })
      .addCase(getAllTeachers.fulfilled, (state, action) => {
        const teachers = action.payload as Teacher[];
        const axiosError = action.payload as AxiosError;
        if (!axiosError.response) {
          teachers.map((teacher) => {
            teacher.id = teacher.teacher_uid;
            return teacher;
          });
          teachersAdapter.removeAll(state);
          teachersAdapter.upsertMany(state, teachers || []);
        } else {
          teachersAdapter.removeAll(state);
          teachersAdapter.upsertMany(state, []);
        }
        state.loadingTeachers = "SUCCEDED";
      })
      .addCase(getTeacherById.pending, (state, action) => {
        state.loadingTeacher = "PENDING";
      })
      .addCase(getTeacherById.fulfilled, (state, action) => {
        const teacher = action.payload as TemplateTeacher;
        const axiosError = action.payload as AxiosError;

        if (!axiosError.response) {
          if (teacher.classes) {
            teacher.classes.map((classroom) => {
              classroom.id = classroom.class_uid;
              return classroom;
            });
          }

          teacher.id = teacher.teacher_uid as string;
          teachersAdapter.upsertOne(state, teacher as Teacher);
        }

        state.loadingTeacher = "SUCCEDED";
      })
      .addCase(createCloudinaryImageForTeacher.pending, (state, action) => {
        state.loadingCreateCloudinaryImageForTeacher = "PENDING";
      })
      .addCase(createCloudinaryImageForTeacher.fulfilled, (state, action) => {
        state.templateTeacher.profile_img_url = action.payload;
        state.loadingCreateCloudinaryImageForTeacher = "SUCCEDED";
      })
      .addCase(createTeacher.pending, (state, action) => {
        state.loadingCreateTeacher = "PENDING";
      })
      .addCase(createTeacher.fulfilled, (state, action) => {
        const teacher = action.payload as Teacher;
        const axiosError = action.payload as AxiosError;

        if (axiosError.response?.status !== 200 && axiosError.response) {
          const data = axiosError.response?.data as ErrorPayloadType;
          state.formModal.showModal = true;
          state.formModal.msg = data.msg;
          state.formModal.color = "#f53838";
        } else {
          state.formModal.showModal = true;
          state.formModal.msg = "Am creat un profesor cu success!";
          state.formModal.color = "#90ee90";
          teacher.id = teacher.teacher_uid;
          localStorage.setItem("hsa-userId", teacher.teacher_uid);
          teachersAdapter.addOne(state, teacher);
          window.location.href = `${baseSiteUrl}/profil`;
        }

        state.loadingCreateTeacher = "SUCCEDED";
      })
      .addCase(deleteTeacherById.pending, (state, action) => {
        state.loadingDeleteTeacher = "PENDING";
      })
      .addCase(deleteTeacherById.fulfilled, (state, action) => {
        const teacher = action.payload as Teacher;

        if (teacher) {
          teachersAdapter.removeOne(state, teacher.teacher_uid);
        }

        state.loadingDeleteTeacher = "SUCCEDED";
      })
      .addCase(updateTeacherById.pending, (state, action) => {
        state.loadingUpdateTeacher = "PENDING";
      })
      .addCase(updateTeacherById.fulfilled, (state, action) => {
        const teacher = action.payload as Teacher;
        const axiosError = action.payload as AxiosError;

        if (axiosError.response?.status !== 200 && axiosError.response) {
          const data = axiosError.response?.data as ErrorPayloadType;
          state.formModal.showModal = true;
          state.formModal.msg = data.msg;
          state.formModal.color = "#f53838";
        } else {
          state.formModal.showModal = true;
          state.formModal.msg =
            "Am actualizat contul tău de profesor cu success!";
          state.formModal.color = "#90ee90";
          teacher.id = teacher.teacher_uid;
          teachersAdapter.updateOne(state, {
            id: teacher.teacher_uid,
            changes: teacher,
          });
          state.templateTeacher = teacher as TemplateTeacher;
          state.templateTeacher = {
            ...state.templateTeacher,
            password: "PAROLA",
          };
        }
        state.loadingUpdateTeacher = "SUCCEDED";
      });
  },
});

export const { selectAll: selectAllTeachers, selectById: selectTeacherById } =
  teachersAdapter.getSelectors<State>((state) => state.teachers);

export const selectLoadingTeachers = (state: State) =>
  state.teachers.loadingTeachers;

export const selectLoadingTeacher = (state: State) =>
  state.teachers.loadingTeacher;

export const selectLoadingCreateTeacher = (state: State) =>
  state.teachers.loadingCreateTeacher;

export const selectLoadingUpdateTeacher = (state: State) =>
  state.teachers.loadingUpdateTeacher;

export const selectLoadingDeleteTeacher = (state: State) =>
  state.teachers.loadingDeleteTeacher;

export const selectLoadingCreateCloudinaryImageForTeacher = (state: State) =>
  state.teachers.loadingCreateCloudinaryImageForTeacher;

export const selectTemplateTeacher = (state: State) =>
  state.teachers.templateTeacher;

export const selectTeachersFormModal = (state: State) =>
  state.teachers.formModal;

export const selectFoundTeacherId = (state: State) =>
  state.teachers.foundTeacherId;

export const {
  updateTemplateTeacher,
  updateTeachersFormModal,
  setTemplateTeacher,
  setFoundTeacherId,
} = teachersSlice.actions;

export default teachersSlice.reducer;
