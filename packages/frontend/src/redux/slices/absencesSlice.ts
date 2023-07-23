// Prisma Types
import { Absence } from "@prisma/client";
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
import { defaultTemplateAbsence } from "@/data";
// Interfaces
import TemplateAbsence from "@/core/interfaces/template/TemplateAbsence";

export const absencesAdapter = createEntityAdapter<Absence>({
  sortComparer: (a, b) =>
    new Date(a.date)
      .toLocaleDateString()
      .localeCompare(new Date(b.date).toLocaleDateString()),
});

type InitialStateType = {
  loadingAbsences: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingAbsence: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingCreateAbsence: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingDeleteAbsence: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingUpdateAbsence: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  templateAbsence: TemplateAbsence;
  formModal: FormModalType;
  foundAbsenceId: string;
};

const initialState = absencesAdapter.getInitialState({
  loadingAbsences: "IDLE",
  loadingAbsence: "IDLE",
  loadingCreateAbsence: "IDLE",
  loadingDeleteAbsence: "IDLE",
  loadingUpdateAbsence: "IDLE",
  templateAbsence: defaultTemplateAbsence,
  formModal: {
    showModal: false,
    msg: "",
  },
  foundAbsenceId: "",
}) as EntityState<Absence> & InitialStateType;

// THUNKS
export const getAllAbsences = createAsyncThunk<Absence[] | AxiosError>(
  "absences/getAllAbsences",
  async () => {
    try {
      const { data } = await axiosInstance.get(`/absences`);
      return data.absences as Absence[];
    } catch (error) {
      return error as AxiosError;
    }
  }
);

export const getAbsenceById = createAsyncThunk<Absence | AxiosError, string>(
  "absences/getAbsenceById",
  async (absenceId) => {
    try {
      const { data } = await axiosInstance.get(
        `/absences/absence/${absenceId}`
      );
      return data.absence as Absence;
    } catch (error) {
      return error as AxiosError;
    }
  }
);

export const createAbsence = createAsyncThunk<
  Absence | AxiosError,
  TemplateAbsence
>("absences/createAbsence", async (templateAbsence) => {
  try {
    const { data } = await axiosInstance.post(
      "/absences/absence/create",
      templateAbsence
    );
    return data.absence as Absence;
  } catch (error) {
    return error as AxiosError;
  }
});

export const deleteAbsenceById = createAsyncThunk<Absence | AxiosError, string>(
  "absences/deleteAbsenceById",
  async (absenceId) => {
    try {
      const { data } = await axiosInstance.delete(
        `/absences/absence/delete/${absenceId}`
      );
      return data.absence as Absence;
    } catch (error) {
      return error as AxiosError;
    }
  }
);

export const updateAbsenceById = createAsyncThunk<
  Absence | AxiosError,
  TemplateAbsence
>("absences/updateAbsenceById", async (templateAbsence) => {
  try {
    const { data } = await axiosInstance.patch(
      `/absences/absence/update/${templateAbsence.absence_uid}`,
      templateAbsence
    );
    return data.absence as Absence;
  } catch (error) {
    return error as AxiosError;
  }
});

const absencesSlice = createSlice({
  name: "absences",
  initialState,
  reducers: {
    updateTemplateAbsence(state, action: PayloadAction<ObjectKeyValueType>) {
      state.templateAbsence = {
        ...state.templateAbsence,
        [action.payload.key]: action.payload.value,
      };
    },
    updateAbsencesFormModal(state, action: PayloadAction<boolean>) {
      state.formModal.showModal = action.payload;
    },
    setTemplateAbsence(state, action: PayloadAction<TemplateAbsence>) {
      state.templateAbsence = action.payload;
    },
    setFoundAbsenceId(state, action: PayloadAction<string>) {
      state.foundAbsenceId = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllAbsences.pending, (state, action) => {
        state.loadingAbsences = "PENDING";
      })
      .addCase(getAllAbsences.fulfilled, (state, action) => {
        const absences = action.payload as Absence[];
        if (absences.length >= 1) {
          absences.map((absence) => {
            absence.id = absence.absence_uid;
            return absence;
          });
          absencesAdapter.upsertMany(state, absences);
        }
        state.loadingAbsences = "SUCCEDED";
      })
      .addCase(getAbsenceById.pending, (state, action) => {
        state.loadingAbsence = "PENDING";
      })
      .addCase(getAbsenceById.fulfilled, (state, action) => {
        const absence = action.payload as Absence;
        const axiosError = action.payload as AxiosError;

        if (!axiosError.response) {
          absence.id = absence.absence_uid;
          absencesAdapter.upsertOne(state, absence);
        }

        state.loadingAbsence = "SUCCEDED";
      })
      .addCase(createAbsence.pending, (state, action) => {
        state.loadingCreateAbsence = "PENDING";
      })
      .addCase(createAbsence.fulfilled, (state, action) => {
        const absence = action.payload as Absence;
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
          absence.id = absence.absence_uid;
          absencesAdapter.addOne(state, absence);
        }

        state.loadingCreateAbsence = "SUCCEDED";
      })
      .addCase(deleteAbsenceById.pending, (state, action) => {
        state.loadingDeleteAbsence = "PENDING";
      })
      .addCase(deleteAbsenceById.fulfilled, (state, action) => {
        const absence = action.payload as Absence;

        if (absence) {
          absencesAdapter.removeOne(state, absence.absence_uid);
        }

        state.loadingDeleteAbsence = "SUCCEDED";
      })
      .addCase(updateAbsenceById.pending, (state, action) => {
        state.loadingUpdateAbsence = "PENDING";
      })
      .addCase(updateAbsenceById.fulfilled, (state, action) => {
        const absence = action.payload as Absence;
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
          absence.id = absence.absence_uid;
          absencesAdapter.updateOne(state, {
            id: absence.absence_uid,
            changes: absence,
          });
          state.templateAbsence = absence as TemplateAbsence;
        }
        state.loadingUpdateAbsence = "SUCCEDED";
      });
  },
});

export const { selectAll: selectAllAbsences, selectById: selectAbsenceById } =
  absencesAdapter.getSelectors<State>((state) => state.absences);

export const selectLoadingAbsences = (state: State) =>
  state.absences.loadingAbsences;

export const selectLoadingAbsence = (state: State) =>
  state.absences.loadingAbsence;

export const selectLoadingCreateAbsence = (state: State) =>
  state.absences.loadingCreateAbsence;

export const selectLoadingUpdateAbsence = (state: State) =>
  state.absences.loadingUpdateAbsence;

export const selectLoadingDeleteAbsence = (state: State) =>
  state.absences.loadingDeleteAbsence;

export const selectTemplateAbsence = (state: State) =>
  state.absences.templateAbsence;

export const selectAbsencesFormModal = (state: State) =>
  state.absences.formModal;

export const selectFoundAbsenceId = (state: State) =>
  state.absences.foundAbsenceId;

export const {
  updateTemplateAbsence,
  updateAbsencesFormModal,
  setTemplateAbsence,
  setFoundAbsenceId,
} = absencesSlice.actions;

export default absencesSlice.reducer;
