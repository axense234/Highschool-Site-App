// Prisma
import { Anunt } from "@prisma/client";
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
  templateAnnouncement,
} from "types";
// Axios
import axios, { AxiosError } from "axios";
import axiosInstance from "@/utils/axios";
// State
import { State } from "../api/store";
// Data
import { defaultTemplateAnnouncement, templateAnnouncements } from "@/data";
// Config
import { baseSiteUrl } from "@/config";

type initialStateType = {
  loadingAnnouncements: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  templateAnnouncement: templateAnnouncement;
  formModal: formModalType;
};

const announcementsAdapter = createEntityAdapter<Anunt>({
  sortComparer: (a, b) => a.titlu.localeCompare(b.titlu),
});

const initialState = announcementsAdapter.getInitialState({
  loadingAnnouncements: "IDLE",
  templateAnnouncement: defaultTemplateAnnouncement,
  formModal: {
    msg: "",
    showModal: false,
  },
}) as EntityState<Anunt> & initialStateType;

// THUNKS
export const getAllAnnouncements = createAsyncThunk<Anunt[] | AxiosError>(
  "announcements/getAllAnnouncements",
  async () => {
    try {
      const { data } = await axiosInstance.get("/anunturi");
      return data.announcements as Anunt[];
    } catch (error) {
      return error as AxiosError;
    }
  }
);

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
      templateAnnouncement
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
      `/anunturi/anunt/delete/${announcementId}`
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
      templateAnnouncement
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
          announcementsAdapter.upsertMany(state, announcements);
        } else {
          announcementsAdapter.upsertMany(state, templateAnnouncements);
        }
        state.loadingAnnouncements = "SUCCEDED";
      })
      .addCase(getAllAnnouncements.rejected, (state, action) => {
        state.loadingAnnouncements = "FAILED";
      })
      .addCase(
        createCloudinaryImageForAnnouncement.fulfilled,
        (state, action) => {
          state.templateAnnouncement.imagineUrl = action.payload;
        }
      )
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
      })
      .addCase(deleteAnnouncementById.fulfilled, (state, action) => {
        const announcement = action.payload as Anunt;

        if (announcement) {
          announcementsAdapter.removeOne(state, announcement.anunt_uid);
        }
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
      });
  },
});

export const {
  selectAll: selectAllAnnouncements,
  selectById: selectAnnouncementById,
} = announcementsAdapter.getSelectors<State>((state) => state.announcements);

export const selectLoadingAnnouncements = (state: State) =>
  state.announcements.loadingAnnouncements;

export const selectTemplateAnnouncement = (state: State) =>
  state.announcements.templateAnnouncement;

export const selectAnnouncementsFormModal = (state: State) =>
  state.announcements.formModal;

export const {
  updateTemplateAnnouncement,
  updateAnnouncementsFormModal,
  setTemplateAnnouncement,
} = announcementsSlice.actions;

export default announcementsSlice.reducer;
