// Prisma Types
import { Grade } from "@prisma/client";
// Redux Toolkit
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";
// Axios
import { AxiosError } from "axios";
import axiosInstance from "@/utils/axios";
// Types
import { ObjectKeyValueType } from "@/core/types/constants";
import { FormModalType, ErrorPayloadType } from "@/core/types/variables";
// Store
import { State } from "../api/store";
// Data
import { defaultTemplateGrade } from "@/data";
// Interfaces
import TemplateGrade from "@/core/interfaces/template/TemplateGrade";

export const gradesAdapter = createEntityAdapter<Grade>({
  sortComparer: (a, b) =>
    new Date(a.date)
      .toLocaleDateString()
      .localeCompare(new Date(b.date).toLocaleDateString()),
});

type InitialStateType = {
  loadingGrades: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingGrade: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingCreateGrade: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingDeleteGrade: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingUpdateGrade: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingCreateCloudinaryImageForGrade:
    | "IDLE"
    | "PENDING"
    | "SUCCEDED"
    | "FAILED";
  templateGrade: TemplateGrade;
  formModal: FormModalType;
  foundGradeId: string;
};

const initialState = gradesAdapter.getInitialState({
  loadingGrades: "IDLE",
  loadingGrade: "IDLE",
  loadingCreateGrade: "IDLE",
  loadingDeleteGrade: "IDLE",
  loadingUpdateGrade: "IDLE",
  loadingCreateCloudinaryImageForGrade: "IDLE",
  templateGrade: defaultTemplateGrade,
  formModal: {
    showModal: false,
    msg: "",
  },
  foundGradeId: "",
}) as EntityState<Grade> & InitialStateType;

// THUNKS
export const getAllGrades = createAsyncThunk<Grade[] | AxiosError>(
  "grades/getAllGrades",
  async () => {
    try {
      const { data } = await axiosInstance.get(`/grades`);
      return data.grades as Grade[];
    } catch (error) {
      return error as AxiosError;
    }
  }
);

export const getGradeById = createAsyncThunk<Grade | AxiosError, string>(
  "grades/getGradeById",
  async (gradeId) => {
    try {
      const { data } = await axiosInstance.get(`/grades/grade/${gradeId}`);
      return data.grade as Grade;
    } catch (error) {
      return error as AxiosError;
    }
  }
);

export const createGrade = createAsyncThunk<
  Grade | AxiosError,
  { templateGrade: TemplateGrade; studentId: string }
>("grades/createGrade", async ({ templateGrade, studentId }) => {
  try {
    const { data } = await axiosInstance.post(
      `/grades/grade/create?userId=${studentId}`,
      templateGrade
    );
    return data.grade as Grade;
  } catch (error) {
    return error as AxiosError;
  }
});

export const deleteGradeById = createAsyncThunk<
  Grade | AxiosError,
  { gradeId: string; studentId: string }
>("grades/deleteGradeById", async ({ gradeId, studentId }) => {
  try {
    const { data } = await axiosInstance.delete(
      `/grades/grade/delete/${gradeId}?userId=${studentId}`
    );
    return data.student as Grade;
  } catch (error) {
    return error as AxiosError;
  }
});

export const updateGradeById = createAsyncThunk<
  Grade | AxiosError,
  { templateGrade: TemplateGrade; studentId: string }
>("grades/updateGradeById", async ({ templateGrade, studentId }) => {
  try {
    const { data } = await axiosInstance.patch(
      `/grades/grade/update/${templateGrade.grade_uid}?userId=${studentId}`,
      templateGrade
    );
    return data.grade as Grade;
  } catch (error) {
    return error as AxiosError;
  }
});

const gradesSlice = createSlice({
  name: "grades",
  initialState,
  reducers: {
    updateTemplateGrade(state, action: PayloadAction<ObjectKeyValueType>) {
      state.templateGrade = {
        ...state.templateGrade,
        [action.payload.key]: action.payload.value,
      };
    },
    updateGradesFormModal(state, action: PayloadAction<boolean>) {
      state.formModal.showModal = action.payload;
    },
    setTemplateGrade(state, action: PayloadAction<TemplateGrade>) {
      state.templateGrade = action.payload;
    },
    setFoundGradeId(state, action: PayloadAction<string>) {
      state.foundGradeId = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllGrades.pending, (state, action) => {
        state.loadingGrades = "PENDING";
      })
      .addCase(getAllGrades.fulfilled, (state, action) => {
        const grades = action.payload as Grade[];
        if (grades.length >= 1) {
          grades.map((grade) => {
            grade.id = grade.grade_uid;
            return grade;
          });
          gradesAdapter.upsertMany(state, grades);
        }
        state.loadingGrades = "SUCCEDED";
      })
      .addCase(getGradeById.pending, (state, action) => {
        state.loadingGrade = "PENDING";
      })
      .addCase(getGradeById.fulfilled, (state, action) => {
        const grade = action.payload as Grade;
        const axiosError = action.payload as AxiosError;

        if (!axiosError.response) {
          grade.id = grade.grade_uid;
          gradesAdapter.upsertOne(state, grade);
        }

        state.loadingGrade = "SUCCEDED";
      })
      .addCase(createGrade.pending, (state, action) => {
        state.loadingCreateGrade = "PENDING";
      })
      .addCase(createGrade.fulfilled, (state, action) => {
        const grade = action.payload as Grade;
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
          grade.id = grade.grade_uid;
          gradesAdapter.addOne(state, grade);
        }

        state.loadingCreateGrade = "SUCCEDED";
      })
      .addCase(deleteGradeById.pending, (state, action) => {
        state.loadingDeleteGrade = "PENDING";
      })
      .addCase(deleteGradeById.fulfilled, (state, action) => {
        const grade = action.payload as Grade;

        if (grade) {
          gradesAdapter.removeOne(state, grade.grade_uid);
        }

        state.loadingDeleteGrade = "SUCCEDED";
      })
      .addCase(updateGradeById.pending, (state, action) => {
        state.loadingUpdateGrade = "PENDING";
      })
      .addCase(updateGradeById.fulfilled, (state, action) => {
        const grade = action.payload as Grade;
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
          grade.id = grade.grade_uid;
          gradesAdapter.updateOne(state, {
            id: grade.grade_uid,
            changes: grade,
          });
          state.templateGrade = grade as TemplateGrade;
        }
        state.loadingUpdateGrade = "SUCCEDED";
      });
  },
});

export const { selectAll: selectAllGrades, selectById: selectGradeById } =
  gradesAdapter.getSelectors<State>((state) => state.grades);

export const selectLoadingGrades = (state: State) => state.grades.loadingGrades;

export const selectLoadingGrade = (state: State) => state.grades.loadingGrade;

export const selectLoadingCreateGrade = (state: State) =>
  state.grades.loadingCreateGrade;

export const selectLoadingUpdateGrade = (state: State) =>
  state.grades.loadingUpdateGrade;

export const selectLoadingDeleteGrade = (state: State) =>
  state.grades.loadingDeleteGrade;

export const selectTemplateGrade = (state: State) => state.grades.templateGrade;

export const selectGradesFormModal = (state: State) => state.grades.formModal;

export const selectFoundGradeId = (state: State) => state.grades.foundGradeId;

export const {
  updateTemplateGrade,
  updateGradesFormModal,
  setTemplateGrade,
  setFoundGradeId,
} = gradesSlice.actions;

export default gradesSlice.reducer;
