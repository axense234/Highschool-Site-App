// Prisma
import { Announcement, AnnouncementCategory } from "@prisma/client";
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
  ErrorPayloadType,
  FormModalType,
  ObjectKeyValueType,
  TemplateAnnouncement,
} from "types";
// Axios
import axios, { Axios, AxiosError } from "axios";
import axiosInstance from "@/utils/axios";
// State
import { State } from "../api/store";
// Data
import { defaultTemplateAnnouncement } from "@/data";
// Config
import { baseSiteUrl } from "@/config";

type InitialStateType = {
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
  templateAnnouncement: TemplateAnnouncement;
  formModal: FormModalType;
  categoryToggles: AnnouncementCategory[];
  foundAnnouncementId: string;
};

const announcementsAdapter = createEntityAdapter<Announcement>();

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
}) as EntityState<Announcement> & InitialStateType;

// THUNKS
export const getAllAnnouncements = createAsyncThunk<
  Announcement[] | AxiosError,
  GetAllQueryParams
>("announcements/getAllAnnouncements", async ({ query, sortByOption }) => {
  try {
    const { data } = await axiosInstance.get(
      `/announcements?sortByFilter=${sortByOption}&filterQuery=${query}`
    );
    return data.announcements as Announcement[];
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
  Announcement | AxiosError,
  TemplateAnnouncement
>("announcements/createAnnouncement", async (templateAnnouncement) => {
  try {
    console.log(templateAnnouncement);
    const { data } = await axiosInstance.post(
      "/announcements/announcement/create",
      templateAnnouncement
    );
    return data.announcement as Announcement;
  } catch (error) {
    return error as AxiosError;
  }
});

export const deleteAnnouncementById = createAsyncThunk<
  Announcement | AxiosError,
  string
>("announcements/deleteAnnouncement", async (announcementId) => {
  try {
    const { data } = await axiosInstance.delete(
      `/announcements/announcement/delete/${announcementId}`
    );
    return data.announcement as Announcement;
  } catch (error) {
    return error as AxiosError;
  }
});

export const updateAnnouncementById = createAsyncThunk<
  Announcement | AxiosError,
  TemplateAnnouncement
>("announcements/updateAnnouncement", async (templateAnnouncement) => {
  try {
    const { data } = await axiosInstance.patch(
      `/announcements/announcement/update/${templateAnnouncement.announcement_uid}`,
      templateAnnouncement
    );
    return data.announcement as Announcement;
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
      action: PayloadAction<ObjectKeyValueType>
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
      action: PayloadAction<TemplateAnnouncement>
    ) {
      state.templateAnnouncement = action.payload;
    },
    addCategoryToggle(state, action: PayloadAction<AnnouncementCategory>) {
      state.categoryToggles = [...state.categoryToggles, action.payload];
    },
    removeCategoryToggle(state, action: PayloadAction<AnnouncementCategory>) {
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
        const announcements = action.payload as Announcement[];
        const axiosError = action.payload as AxiosError;

        if (!axiosError.response) {
          announcements.map((announcement) => {
            announcement.id = announcement.announcement_uid;
            return announcement;
          });
          announcementsAdapter.removeAll(state);
          announcementsAdapter.upsertMany(state, announcements);
        } else {
          announcementsAdapter.removeAll(state);
          announcementsAdapter.upsertMany(state, []);
        }
        state.loadingAnnouncements = "SUCCEDED";
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
          state.templateAnnouncement.img_url = action.payload;
          state.loadingCreateCloudinaryImageForAnnouncement = "SUCCEDED";
        }
      )
      .addCase(createAnnouncement.pending, (state, action) => {
        state.loadingCreateAnnouncement = "PENDING";
      })
      .addCase(createAnnouncement.fulfilled, (state, action) => {
        const announcement = action.payload as Announcement;
        const axiosError = action.payload as AxiosError;
        console.log(axiosError);

        if (axiosError.response?.status !== 200 && axiosError.response) {
          const data = axiosError.response?.data as ErrorPayloadType;
          state.formModal.showModal = true;
          state.formModal.msg = data.msg;
          state.formModal.color = "#f53838";
        } else {
          state.formModal.showModal = true;
          state.formModal.msg = "Am creat un anunț cu success!";
          state.formModal.color = "#90ee90";
          announcement.id = announcement.announcement_uid;
          announcementsAdapter.addOne(state, announcement);
          window.location.href = `${baseSiteUrl}/anunturi`;
        }
        state.loadingCreateAnnouncement = "SUCCEDED";
      })
      .addCase(deleteAnnouncementById.pending, (state, action) => {
        state.loadingDeleteAnnouncement = "PENDING";
      })
      .addCase(deleteAnnouncementById.fulfilled, (state, action) => {
        const announcement = action.payload as Announcement;

        if (announcement) {
          announcementsAdapter.removeOne(state, announcement.announcement_uid);
        }

        state.loadingDeleteAnnouncement = "SUCCEDED";
      })
      .addCase(updateAnnouncementById.pending, (state, action) => {
        state.loadingUpdateAnnouncement = "PENDING";
      })
      .addCase(updateAnnouncementById.fulfilled, (state, action) => {
        const announcement = action.payload as Announcement;
        const axiosError = action.payload as AxiosError;

        if (axiosError.response?.status !== 200 && axiosError.response) {
          const data = axiosError.response?.data as ErrorPayloadType;
          state.formModal.showModal = true;
          state.formModal.msg = data.msg;
          state.formModal.color = "#f53838";
        } else {
          announcement.id = announcement.announcement_uid;
          announcementsAdapter.updateOne(state, {
            id: announcement.announcement_uid,
            changes: announcement,
          });
        }
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
