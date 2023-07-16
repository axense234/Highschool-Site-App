// Prisma Types
import { Student } from "@prisma/client";
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
// Store
import { State } from "../api/store";
// Data
import { defaultTemplateStudent } from "@/data";
// Config
import { baseSiteUrl } from "@/config";
// Interfaces
import TemplateStudent from "@/core/interfaces/template/TemplateStudent";
import TemplateUpdateStudent from "@/core/interfaces/template/TemplateUpdateStudent";

export const studentsAdapter = createEntityAdapter<Student>({
  sortComparer: (a, b) => a.fullname.localeCompare(b.fullname),
});

type InitialStateType = {
  loadingStudents: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingStudent: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingCreateStudent: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingDeleteStudent: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingUpdateStudent: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingCreateCloudinaryImageForStudent:
    | "IDLE"
    | "PENDING"
    | "SUCCEDED"
    | "FAILED";
  templateStudent: TemplateStudent;
  formModal: FormModalType;
  foundStudentId: string;
};

const initialState = studentsAdapter.getInitialState({
  loadingStudents: "IDLE",
  loadingStudent: "IDLE",
  loadingCreateStudent: "IDLE",
  loadingDeleteStudent: "IDLE",
  loadingUpdateStudent: "IDLE",
  loadingCreateCloudinaryImageForStudent: "IDLE",
  templateStudent: defaultTemplateStudent,
  formModal: {
    showModal: false,
    msg: "",
  },
  foundStudentId: "",
}) as EntityState<Student> & InitialStateType;

// THUNKS
export const getAllStudents = createAsyncThunk<Student[] | AxiosError>(
  "students/getAllStudents",
  async () => {
    try {
      const { data } = await axiosInstance.get(`/students`);
      return data.students as Student[];
    } catch (error) {
      return error as AxiosError;
    }
  }
);

export const getStudentById = createAsyncThunk<Student | AxiosError, string>(
  "students/getStudentById",
  async (studentId) => {
    try {
      const { data } = await axiosInstance.get(
        `/students/student/${studentId}?includeStudentCard=true`
      );
      return data.student as Student;
    } catch (error) {
      return error as AxiosError;
    }
  }
);

export const createCloudinaryImageForStudent = createAsyncThunk(
  "students/createCloudinaryImageForStudent",
  async (imageFile: File) => {
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "highschool-site-app-students");
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

export const createStudent = createAsyncThunk<
  Student | AxiosError,
  TemplateStudent
>("students/createStudent", async (templateStudent) => {
  try {
    const { data } = await axiosInstance.post(
      "/users/create/ELEV",
      templateStudent
    );
    return data.user as Student;
  } catch (error) {
    return error as AxiosError;
  }
});

export const deleteStudentById = createAsyncThunk<Student | AxiosError, string>(
  "students/deleteStudentById",
  async (studentId) => {
    try {
      const { data } = await axiosInstance.delete(
        `/students/student/delete/${studentId}`
      );
      return data.student as Student;
    } catch (error) {
      return error as AxiosError;
    }
  }
);

export const updateStudentById = createAsyncThunk<
  Student | AxiosError,
  TemplateUpdateStudent
>("students/updateStudentById", async (templateStudent) => {
  try {
    const { data } = await axiosInstance.patch(
      `/students/student/update/${templateStudent.student_uid}`,
      templateStudent
    );
    return data.student as Student;
  } catch (error) {
    return error as AxiosError;
  }
});

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    updateTemplateStudent(state, action: PayloadAction<ObjectKeyValueType>) {
      state.templateStudent = {
        ...state.templateStudent,
        [action.payload.key]: action.payload.value,
      };
    },
    updateStudentsFormModal(state, action: PayloadAction<boolean>) {
      state.formModal.showModal = action.payload;
    },
    setTemplateStudent(state, action: PayloadAction<TemplateStudent>) {
      state.templateStudent = action.payload;
    },
    setFoundStudentId(state, action: PayloadAction<string>) {
      state.foundStudentId = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllStudents.pending, (state, action) => {
        state.loadingStudents = "PENDING";
      })
      .addCase(getAllStudents.fulfilled, (state, action) => {
        const students = action.payload as Student[];
        if (students.length >= 1) {
          students.map((student) => {
            student.id = student.student_uid;
            return student;
          });
          studentsAdapter.upsertMany(state, students);
        }
        state.loadingStudents = "SUCCEDED";
      })
      .addCase(getStudentById.pending, (state, action) => {
        state.loadingStudent = "PENDING";
      })
      .addCase(getStudentById.fulfilled, (state, action) => {
        const student = action.payload as Student;
        const axiosError = action.payload as AxiosError;

        if (axiosError.response?.status !== 200 && axiosError.response) {
          console.log(axiosError);
        } else {
          console.log(student);
          student.id = student.student_uid;
          studentsAdapter.upsertOne(state, student);
        }

        state.loadingStudent = "SUCCEDED";
      })
      .addCase(createCloudinaryImageForStudent.pending, (state, action) => {
        state.loadingCreateCloudinaryImageForStudent = "PENDING";
      })
      .addCase(createCloudinaryImageForStudent.fulfilled, (state, action) => {
        state.templateStudent.profile_img_url = action.payload;
        state.loadingCreateCloudinaryImageForStudent = "SUCCEDED";
      })
      .addCase(createStudent.pending, (state, action) => {
        state.loadingCreateStudent = "PENDING";
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        const student = action.payload as Student;
        const axiosError = action.payload as AxiosError;

        if (axiosError.response?.status !== 200 && axiosError.response) {
          const data = axiosError.response?.data as ErrorPayloadType;
          state.formModal.showModal = true;
          state.formModal.msg = data.msg;
          state.formModal.color = "#f53838";
        } else {
          state.formModal.showModal = true;
          state.formModal.msg = "Am creat un student cu success!";
          state.formModal.color = "#90ee90";
          student.id = student.student_uid;
          studentsAdapter.addOne(state, student);
          window.location.href = `${baseSiteUrl}/profil`;
        }

        state.loadingCreateStudent = "SUCCEDED";
      })
      .addCase(deleteStudentById.pending, (state, action) => {
        state.loadingDeleteStudent = "PENDING";
      })
      .addCase(deleteStudentById.fulfilled, (state, action) => {
        const student = action.payload as Student;

        if (student) {
          studentsAdapter.removeOne(state, student.student_uid);
        }

        state.loadingDeleteStudent = "SUCCEDED";
      })
      .addCase(updateStudentById.pending, (state, action) => {
        state.loadingUpdateStudent = "PENDING";
      })
      .addCase(updateStudentById.fulfilled, (state, action) => {
        const student = action.payload as Student;
        const axiosError = action.payload as AxiosError;

        if (axiosError.response?.status !== 200 && axiosError.response) {
          const data = axiosError.response?.data as ErrorPayloadType;
          state.formModal.showModal = true;
          state.formModal.msg = data.msg;
          state.formModal.color = "#f53838";
        } else {
          state.formModal.showModal = true;
          state.formModal.msg = "Am actualizat contul tău de elev cu success!";
          state.formModal.color = "#90ee90";
          student.id = student.student_uid;
          studentsAdapter.updateOne(state, {
            id: student.student_uid,
            changes: student,
          });
          state.templateStudent = student as TemplateStudent;
          state.templateStudent = {
            ...state.templateStudent,
            password: "PAROLA",
          };
        }
        state.loadingUpdateStudent = "SUCCEDED";
      });
  },
});

export const { selectAll: selectAllStudents, selectById: selectStudentById } =
  studentsAdapter.getSelectors<State>((state) => state.students);

export const selectLoadingStudents = (state: State) =>
  state.students.loadingStudents;

export const selectLoadingStudent = (state: State) =>
  state.students.loadingStudent;

export const selectLoadingCreateStudent = (state: State) =>
  state.students.loadingCreateStudent;

export const selectLoadingUpdateStudent = (state: State) =>
  state.students.loadingUpdateStudent;

export const selectLoadingDeleteStudent = (state: State) =>
  state.students.loadingDeleteStudent;

export const selectLoadingCreateCloudinaryImageForStudent = (state: State) =>
  state.students.loadingCreateCloudinaryImageForStudent;

export const selectTemplateStudent = (state: State) =>
  state.students.templateStudent;

export const selectStudentsFormModal = (state: State) =>
  state.students.formModal;

export const selectFoundStudentId = (state: State) =>
  state.students.foundStudentId;

export const {
  updateTemplateStudent,
  updateStudentsFormModal,
  setTemplateStudent,
  setFoundStudentId,
} = studentsSlice.actions;

export default studentsSlice.reducer;
