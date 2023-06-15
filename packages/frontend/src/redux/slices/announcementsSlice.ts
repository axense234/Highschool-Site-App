// Prisma
import { Anunt, CategorieAnunt } from "@prisma/client";
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
  GetAllQueryParams,
  errorPayloadType,
  formModalType,
  objectKeyValueType,
  templateAnnouncement,
} from "types";
// Axios
import axios, { AxiosError } from "axios";
import axiosInstance from "@/utils/axios";
// State
import store, { State } from "../api/store";
// Data
import { defaultTemplateAnnouncement } from "@/data";
// Config
import { baseSiteUrl } from "@/config";

type initialStateType = {
  loadingAnnouncements: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingCreateAnnouncement: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingUpdateAnnouncement: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingDeleteAnnouncement: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingMoveAnnouncement: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingCreateCloudinaryImageForAnnouncement:
    | "IDLE"
    | "PENDING"
    | "SUCCEDED"
    | "FAILED";
  templateAnnouncement: templateAnnouncement;
  formModal: formModalType;
  categoryToggles: CategorieAnunt[];
  foundAnnouncementId: string;
  screenLoadingMessageForAnnouncements: string;
};

const announcementsAdapter = createEntityAdapter<Anunt>({
  sortComparer: (a, b) => a.titlu.localeCompare(b.titlu),
});

const initialState = announcementsAdapter.getInitialState({
  loadingAnnouncements: "IDLE",
  loadingCreateAnnouncement: "IDLE",
  loadingUpdateAnnouncement: "IDLE",
  loadingDeleteAnnouncement: "IDLE",
  loadingMoveAnnouncement: "IDLE",
  loadingCreateCloudinaryImageForAnnouncement: "IDLE",
  templateAnnouncement: defaultTemplateAnnouncement,
  formModal: {
    msg: "",
    showModal: false,
  },
  foundAnnouncementId: "",
  categoryToggles: [],
  screenLoadingMessageForAnnouncements: "Se încarcă, vă rugăm să așteptați!",
}) as EntityState<Anunt> & initialStateType;

// THUNKS
export const getAllAnnouncements = createAsyncThunk<
  Anunt[] | AxiosError,
  GetAllQueryParams
>("announcements/getAllAnnouncements", async ({ sortByOption, query }) => {
  try {
    const { data } = await axiosInstance.get(
      `/anunturi?sortByOption=${sortByOption || "titlu"}&query=${query || ""}`
    );
    return data.announcements as Anunt[];
  } catch (error) {
    return error as AxiosError;
  }
});

export const createCloudinaryImageForAnnouncement = createAsyncThunk(
  "announcements/createCloudinaryImageForAnnouncement",
  async (imageFile: File) => {
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "highschool-site-app-announcements");
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

export const createAnnouncement = createAsyncThunk<
  Anunt | AxiosError,
  templateAnnouncement
>("announcements/createAnnouncement", async (templateAnnouncement) => {
  try {
    const { data } = await axiosInstance.post(
      "/anunturi/create",
      templateAnnouncement,
      { withCredentials: true }
    );
    return data.announcement as Anunt;
  } catch (error) {
    return error as AxiosError;
  }
});

export const deleteAnnouncementById = createAsyncThunk<
  Anunt | AxiosError,
  string
>("announcements/deleteAnnouncement", async (announcementId) => {
  try {
    const { data } = await axiosInstance.delete(
      `/anunturi/anunt/delete/${announcementId}`,
      { withCredentials: true }
    );
    return data.announcement as Anunt;
  } catch (error) {
    return error as AxiosError;
  }
});

export const updateAnnouncementById = createAsyncThunk<
  Anunt | AxiosError,
  templateAnnouncement
>("announcements/updateAnnouncement", async (templateAnnouncement) => {
  try {
    const { data } = await axiosInstance.patch(
      `/anunturi/anunt/update/${templateAnnouncement.anunt_uid}`,
      templateAnnouncement,
      { withCredentials: true }
    );
    return data.announcement as Anunt;
  } catch (error) {
    return error as AxiosError;
  }
});

const announcementsSlice = createSlice({
  name: "announcements",
  initialState,
  reducers: {
    updateTemplateAnnouncement(
      state,
      action: PayloadAction<objectKeyValueType>
    ) {
      state.templateAnnouncement = {
        ...state.templateAnnouncement,
        [action.payload.key]: action.payload.value,
      };
    },
    updateAnnouncementsFormModal(state, action: PayloadAction<boolean>) {
      state.formModal.showModal = action.payload;
    },
    setTemplateAnnouncement(
      state,
      action: PayloadAction<templateAnnouncement>
    ) {
      state.templateAnnouncement = action.payload;
    },
    addCategoryToggle(state, action: PayloadAction<CategorieAnunt>) {
      state.categoryToggles = [...state.categoryToggles, action.payload];
    },
    removeCategoryToggle(state, action: PayloadAction<CategorieAnunt>) {
      state.categoryToggles = state.categoryToggles.filter(
        (cat) => cat !== action.payload
      );
    },
    clearCategoryToggles(state, action: PayloadAction) {
      state.categoryToggles = [];
    },
    setFoundAnnouncementId(state, action: PayloadAction<string>) {
      state.foundAnnouncementId = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllAnnouncements.pending, (state, action) => {
        state.loadingAnnouncements = "PENDING";
      })
      .addCase(getAllAnnouncements.fulfilled, (state, action) => {
        const announcements = action.payload as Anunt[];

        if (announcements.length >= 1) {
          announcements.map((announcement) => {
            announcement.id = announcement.anunt_uid;
            return announcement;
          });
          announcementsAdapter.removeAll(state);
          announcementsAdapter.upsertMany(state, announcements);
          state.loadingAnnouncements = "SUCCEDED";
        }
      })
      .addCase(getAllAnnouncements.rejected, (state, action) => {
        state.loadingAnnouncements = "FAILED";
      })
      .addCase(
        createCloudinaryImageForAnnouncement.pending,
        (state, action) => {
          state.loadingCreateCloudinaryImageForAnnouncement = "PENDING";
        }
      )
      .addCase(
        createCloudinaryImageForAnnouncement.fulfilled,
        (state, action) => {
          state.templateAnnouncement.imagineUrl = action.payload;
          state.loadingCreateCloudinaryImageForAnnouncement = "SUCCEDED";
        }
      )
      .addCase(createAnnouncement.pending, (state, action) => {
        state.loadingCreateAnnouncement = "PENDING";
        state.screenLoadingMessageForAnnouncements =
          "Încercăm să creăm un anunț, vă rugăm să așteptați...";
      })
      .addCase(createAnnouncement.fulfilled, (state, action) => {
        const announcement = action.payload as Anunt;
        const axiosError = action.payload as AxiosError;

        if (axiosError.response?.status !== 200 && axiosError.response) {
          const data = axiosError.response?.data as errorPayloadType;
          state.formModal.showModal = true;
          state.formModal.msg = data.msg;
          state.formModal.color = "red";
        } else {
          announcement.id = announcement.anunt_uid;
          announcementsAdapter.addOne(state, announcement);
          window.location.href = `${baseSiteUrl}/anunturi`;
        }
        state.loadingCreateAnnouncement = "SUCCEDED";
      })
      .addCase(createAnnouncement.rejected, (state, action) => {
        console.log(action.error);
      })
      .addCase(deleteAnnouncementById.pending, (state, action) => {
        state.loadingDeleteAnnouncement = "PENDING";
        state.screenLoadingMessageForAnnouncements =
          "Încercăm să ștergem un anunț, vă rugăm să așteptați...";
      })
      .addCase(deleteAnnouncementById.fulfilled, (state, action) => {
        const announcement = action.payload as Anunt;

        if (announcement) {
          announcementsAdapter.removeOne(state, announcement.anunt_uid);
        }

        state.screenLoadingMessageForAnnouncements = "";
        state.loadingDeleteAnnouncement = "SUCCEDED";
      })
      .addCase(updateAnnouncementById.pending, (state, action) => {
        state.loadingUpdateAnnouncement = "PENDING";
        state.screenLoadingMessageForAnnouncements =
          "Încercăm să actualizăm un anunț, vă rugăm să așteptați...";
      })
      .addCase(updateAnnouncementById.fulfilled, (state, action) => {
        const announcement = action.payload as Anunt;
        const axiosError = action.payload as AxiosError;

        if (axiosError.response?.status !== 200 && axiosError.response) {
          const data = axiosError.response?.data as errorPayloadType;
          state.formModal.showModal = true;
          state.formModal.msg = data.msg;
          state.formModal.color = "red";
        } else {
          announcement.id = announcement.anunt_uid;
          announcementsAdapter.updateOne(state, {
            id: announcement.anunt_uid,
            changes: announcement,
          });
        }

        state.screenLoadingMessageForAnnouncements = "";
        state.loadingUpdateAnnouncement = "SUCCEDED";
      });
  },
});

export const {
  selectAll: selectAllAnnouncements,
  selectById: selectAnnouncementById,
} = announcementsAdapter.getSelectors<State>((state) => state.announcements);

export const selectLoadingAnnouncements = (state: State) =>
  state.announcements.loadingAnnouncements;

export const selectLoadingCreateAnnouncement = (state: State) =>
  state.announcements.loadingCreateAnnouncement;

export const selectLoadingUpdateAnnouncement = (state: State) =>
  state.announcements.loadingUpdateAnnouncement;

export const selectLoadingDeleteAnnouncement = (state: State) =>
  state.announcements.loadingDeleteAnnouncement;

export const selectLoadingCreateCloudinaryImageForAnnouncement = (
  state: State
) => state.announcements.loadingCreateCloudinaryImageForAnnouncement;

export const selectScreenLoadingMessageForAnnouncements = (state: State) =>
  state.announcements.screenLoadingMessageForAnnouncements;

export const selectTemplateAnnouncement = (state: State) =>
  state.announcements.templateAnnouncement;

export const selectAnnouncementsFormModal = (state: State) =>
  state.announcements.formModal;

export const selectCategoryToggles = (state: State) =>
  state.announcements.categoryToggles;

export const selectFoundAnnouncementId = (state: State) =>
  state.announcements.foundAnnouncementId;

export const {
  updateTemplateAnnouncement,
  updateAnnouncementsFormModal,
  setTemplateAnnouncement,
  addCategoryToggle,
  removeCategoryToggle,
  setFoundAnnouncementId,
  clearCategoryToggles,
} = announcementsSlice.actions;

export default announcementsSlice.reducer;
