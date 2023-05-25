// Prisma
import { Utilizator } from "@prisma/client";
// Redux Toolkit
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// Types
import {
  errorPayloadType,
  formModalType,
  objectKeyValueType,
  OverlayType,
  templateUser,
} from "types";
// Axios
import { AxiosError } from "axios";
import axiosInstance from "@/utils/axios";
// State
import { State } from "../api/store";
// Config
import { baseSiteUrl } from "@/config";
// Data
import { defaultOverlay, defaultProfile, defaultTemplateProfile } from "@/data";

type initialStateType = {
  loadingProfile: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  profile: Utilizator;
  templateProfile: templateUser;
  formModal: formModalType;
  cardModalId: string;
  optionsContent: string;
  overlay: OverlayType;
  editMode: boolean;
};

const initialState: initialStateType = {
  loadingProfile: "IDLE",
  profile: defaultProfile,
  // For the login page
  templateProfile: defaultTemplateProfile,
  // For the form modal
  formModal: {
    showModal: false,
    msg: "",
  },
  // Id required for the card modal
  cardModalId: "",
  // The content displayed on the options content comp
  optionsContent: "settings",
  // The overlay object
  overlay: defaultOverlay,
  // Edit mode(used in combination with cardModalId)
  editMode: false,
};

// THUNKS
export const loginUser = createAsyncThunk<
  Utilizator | AxiosError,
  templateUser
>("general/loginUser", async (templateUser) => {
  try {
    const { data } = await axiosInstance.post(
      "/utilizatori/login",
      templateUser,
      { withCredentials: true }
    );
    console.log("logged in");
    console.log(data.user);
    return data.user as Utilizator;
  } catch (error: any) {
    return error as AxiosError;
  }
});

export const getProfile = createAsyncThunk<
  Utilizator | AxiosError,
  string | undefined
>("general/getProfile", async (userId = "false") => {
  try {
    const { data } = await axiosInstance.get(`/utilizatori/${userId}`, {
      withCredentials: true,
    });
    return data.user as Utilizator;
  } catch (error) {
    return error as AxiosError;
  }
});

export const updateProfile = createAsyncThunk<
  Utilizator | AxiosError,
  templateUser
>("general/updateProfile", async (templateUser) => {
  try {
    const { data } = await axiosInstance.patch(
      `/utilizatori/update/${templateUser.utilizator_uid as string}`,
      templateUser
    );
    return data.user as Utilizator;
  } catch (error) {
    return error as AxiosError;
  }
});

export const logoutProfile = createAsyncThunk<string | AxiosError>(
  "general/logoutProfile",
  async () => {
    try {
      const { data } = await axiosInstance.get("/utilizatori/optiuni/logout", {
        withCredentials: true,
      });
      return data.msg as string;
    } catch (error) {
      return error as AxiosError;
    }
  }
);

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    updateTemplateProfile(state, action: PayloadAction<objectKeyValueType>) {
      state.templateProfile = {
        ...state.templateProfile,
        [action.payload.key]: action.payload.value,
      };
    },
    updateGeneralFormModal(state, action: PayloadAction<boolean>) {
      state.formModal.showModal = action.payload;
    },
    updateOverlay(state, action: PayloadAction<OverlayType>) {
      state.overlay = action.payload;
    },
    setCardModalId(state, action: PayloadAction<string>) {
      state.cardModalId = action.payload;
    },
    setOptionsContent(state, action: PayloadAction<string>) {
      state.optionsContent = action.payload;
    },
    setEditMode(state, action: PayloadAction<boolean>) {
      state.editMode = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.loadingProfile = "PENDING";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const profile = action.payload as Utilizator;
        const axiosError = action.payload as AxiosError;

        console.log(axiosError.response?.status);

        if (axiosError.response?.status !== 200 && axiosError.response) {
          const data = axiosError.response?.data as errorPayloadType;
          state.formModal.showModal = true;
          state.formModal.msg = data.msg;
          state.formModal.color = "red";
        } else {
          state.profile = profile;
          state.templateProfile = defaultTemplateProfile;
          window.location.href = `${baseSiteUrl}/profil`;
        }

        state.loadingProfile = "SUCCEDED";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loadingProfile = "FAILED";
      })
      .addCase(getProfile.pending, (state, action) => {
        state.loadingProfile = "PENDING";
        console.log("lol");
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        const profile = action.payload as Utilizator;
        console.log(profile);
        console.log("nush");

        if (profile) {
          state.profile = profile;
          state.templateProfile = profile;
          state.templateProfile.password = "PAROLA";
        }

        state.loadingProfile = "SUCCEDED";
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loadingProfile = "FAILED";
      })
      .addCase(updateProfile.pending, (state, action) => {
        state.loadingProfile = "PENDING";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        const profile = action.payload as Utilizator;
        const axiosError = action.payload as AxiosError;

        if (axiosError.response?.status !== 200 && axiosError.response) {
          const data = axiosError.response?.data as errorPayloadType;
          state.formModal.showModal = true;
          state.formModal.msg = data.msg;
          state.formModal.color = "red";
        } else {
          state.formModal.showModal = true;
          state.formModal.msg = `Am updatat ${profile.username}!`;
          state.formModal.color = "green";
          state.profile = profile;
          state.templateProfile = profile;
          state.templateProfile.password = "PAROLA";
        }

        state.loadingProfile = "SUCCEDED";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loadingProfile = "FAILED";
      })
      .addCase(logoutProfile.fulfilled, (state, action) => {
        window.location.href = `${baseSiteUrl}/home`;
        console.log(action.payload);
        state.profile = defaultProfile;
        state.templateProfile = defaultTemplateProfile;
      });
  },
});

export const selectProfile = (state: State) => state.general.profile;

export const selectTemplateProfile = (state: State) =>
  state.general.templateProfile;

export const selectFormModal = (state: State) => state.general.formModal;

export const selectLoadingProfile = (state: State) =>
  state.general.loadingProfile;

export const selectCardModalId = (state: State) => state.general.cardModalId;

export const selectOptionsContent = (state: State) =>
  state.general.optionsContent;

export const selectOverlay = (state: State) => state.general.overlay;

export const selectEditMode = (state: State) => state.general.editMode;

export const {
  updateTemplateProfile,
  updateGeneralFormModal,
  setCardModalId,
  setOptionsContent,
  updateOverlay,
  setEditMode,
} = generalSlice.actions;

export default generalSlice.reducer;
