// Redux Toolkit
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// Types
import {
  EmailFormTemplate,
  ErrorPayloadType,
  FormModalType,
  GetAllQueryParams,
  ObjectKeyValueType,
  OverlayType,
  TemplatePassReset,
  TemplateUser,
  User,
} from "types";
import { Admin, Student, Teacher } from "@prisma/client";
// Axios
import { AxiosError } from "axios";
import axiosInstance from "@/utils/axios";
// State
import { State } from "../api/store";
// Config
import { baseSiteUrl } from "@/config";
// Data
import {
  defaultEmailFormTemplate,
  defaultGetAllQueryParams,
  defaultOverlay,
  defaultProfile,
  defaultTemplateProfile,
} from "@/data";

type initialStateType = {
  loadingProfile: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingLoginProfile: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingUpdateProfile: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  profile: Admin | Student | Teacher | TemplateUser;
  templateProfile: TemplateUser;
  formModal: FormModalType;
  cardModalId: string;
  optionsContent: string;
  overlay: OverlayType;
  editMode: boolean;
  getAllQueryParams: GetAllQueryParams;
  toggleMoveAnnouncementModal: boolean;
  emailFormTemplate: EmailFormTemplate;
  currentPathname: string;
  searchbarQuery: string;
  screenLoadingMessage: string;
  recipientEmail: string;
  newPass: string;
  newPassVer: string;
  emailCurrentType: "ADMIN" | "ELEV" | "PROFESOR";
  resetPassTokenAuthorized: boolean;
};

const initialState: initialStateType = {
  loadingProfile: "IDLE",
  loadingLoginProfile: "IDLE",
  loadingUpdateProfile: "IDLE",
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
  // Query params for Announcements/Teachers
  getAllQueryParams: defaultGetAllQueryParams,
  // Toggle for the Move Announcement Modal(Card Modal)
  toggleMoveAnnouncementModal: false,
  // Email Form Template
  emailFormTemplate: defaultEmailFormTemplate,
  // Current pathname
  currentPathname: "",
  // The query for the searchbar
  searchbarQuery: "",
  // The text displayed upon various ScreenLoading instances
  screenLoadingMessage: "Se încarcă, vă rugăm să așteptați!",
  // Recipient email for resetting password
  recipientEmail: "",
  // The new password when user resets their pass
  newPass: "",
  newPassVer: "",
  // The current type of model used in AccountsForm(only for sending emails and such)
  emailCurrentType: "ELEV",
  // Authorized reset pass token by default false
  resetPassTokenAuthorized: false,
};

// THUNKS
export const getUserProfile = createAsyncThunk<
  Admin | Student | Teacher | AxiosError
>("general/getUserProfile", async () => {
  try {
    const { data } = await axiosInstance.get("/users/user/profile", {
      withCredentials: true,
    });
    return data.user as Admin | Student | Teacher;
  } catch (error) {
    return error as AxiosError;
  }
});

export const loginUser = createAsyncThunk<User | AxiosError, TemplateUser>(
  "general/loginUser",
  async (templateUser) => {
    try {
      const { data } = await axiosInstance.post("/users/login", templateUser, {
        withCredentials: true,
      });
      return data.user as User;
    } catch (error: any) {
      return error as AxiosError;
    }
  }
);

export const logoutProfile = createAsyncThunk<string | AxiosError>(
  "general/logoutProfile",
  async () => {
    try {
      const { data } = await axiosInstance.delete("/users/options/logout", {
        withCredentials: true,
      });
      return data.msg as string;
    } catch (error) {
      return error as AxiosError;
    }
  }
);

export const sendEmail = createAsyncThunk<
  string | AxiosError,
  EmailFormTemplate
>("general/sendEmail", async (templateEmail) => {
  try {
    const { data } = await axiosInstance.post("/options/email", templateEmail, {
      withCredentials: true,
    });
    return data.msg as string;
  } catch (error) {
    return error as AxiosError;
  }
});

export const sendResetPassEmail = createAsyncThunk<
  string | AxiosError,
  TemplatePassReset
>("general/sendResetPassEmail", async (emailBody) => {
  try {
    const { data } = await axiosInstance.post(
      "/options/email/reset-pass",
      emailBody,
      { withCredentials: true }
    );
    return data.msg as string;
  } catch (error) {
    return error as AxiosError;
  }
});

export const verifyResetPassToken = createAsyncThunk<
  string | AxiosError,
  string
>("general/verifyResetPassToken", async (token) => {
  try {
    const { data } = await axiosInstance.get(
      `/options/email/reset-pass/verify?token=${token}`
    );
    return data.msg as string;
  } catch (error) {
    return error as AxiosError;
  }
});

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    updateTemplateProfile(state, action: PayloadAction<ObjectKeyValueType>) {
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
    setEmailFormTemplate(state, action: PayloadAction<ObjectKeyValueType>) {
      state.emailFormTemplate = {
        ...state.emailFormTemplate,
        [action.payload.key]: action.payload.value,
      };
    },
    clearEmailFormTemplate(state, action: PayloadAction) {
      state.emailFormTemplate = defaultEmailFormTemplate;
    },
    updateToggleMoveAnnouncementModal(state, action: PayloadAction) {
      state.toggleMoveAnnouncementModal = !state.toggleMoveAnnouncementModal;
    },
    updateGetAllQueryParams(state, action: PayloadAction<ObjectKeyValueType>) {
      state.getAllQueryParams = {
        ...state.getAllQueryParams,
        [action.payload.key]: action.payload.value,
      };
    },
    setCurrentPathname(state, action: PayloadAction<string>) {
      state.currentPathname = action.payload;
    },
    updateSearchbarQuery(state, action: PayloadAction<string>) {
      state.searchbarQuery = action.payload;
    },
    setScreenLoadingMessage(state, action: PayloadAction<string>) {
      state.screenLoadingMessage = action.payload;
    },
    setRecipientEmail(state, action: PayloadAction<string>) {
      state.recipientEmail = action.payload;
    },
    setNewPass(state, action: PayloadAction<string>) {
      state.newPass = action.payload;
    },
    setNewPassVer(state, action: PayloadAction<string>) {
      state.newPassVer = action.payload;
    },
    setEmailCurrentType(
      state,
      action: PayloadAction<"ADMIN" | "PROFESOR" | "ELEV">
    ) {
      state.emailCurrentType = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserProfile.pending, (state, action) => {
        state.loadingProfile = "PENDING";
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        const account = action.payload;
        const axiosError = action.payload as AxiosError;

        if (axiosError.response?.status !== 200 && axiosError.response) {
          state.profile = defaultProfile;
        } else {
          state.profile = account as Admin | Teacher | Student;
        }

        state.loadingProfile = "SUCCEDED";
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loadingLoginProfile = "PENDING";
        state.screenLoadingMessage =
          "Încercăm să intrăm în contul tău, vă rugăm să așteptați...";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const axiosError = action.payload as AxiosError;

        if (axiosError.response?.status !== 200 && axiosError.response) {
          const data = axiosError.response?.data as ErrorPayloadType;
          state.formModal.showModal = true;
          state.formModal.msg = data.msg;
          state.formModal.color = "#f53838";
        } else {
          state.formModal.showModal = true;
          state.formModal.msg = "Am intrat in cont cu success!";
          state.formModal.color = "#90ee90";
          window.location.href = `${baseSiteUrl}/profil`;
        }
        state.screenLoadingMessage = "";
        state.loadingLoginProfile = "SUCCEDED";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loadingLoginProfile = "FAILED";
      })
      .addCase(logoutProfile.fulfilled, (state, action) => {
        window.location.href = `${baseSiteUrl}/home`;
        state.profile = defaultProfile;
        state.templateProfile = defaultTemplateProfile;
      })
      .addCase(sendEmail.fulfilled, (state, action) => {
        const responseMessage = action.payload as string;
        const axiosError = action.payload as AxiosError;

        if (axiosError.response?.status !== 200 && axiosError.response) {
          const data = axiosError.response?.data as ErrorPayloadType;
          state.formModal.showModal = true;
          state.formModal.msg = data.msg;
          state.formModal.color = "#f53838";
        } else {
          state.formModal.showModal = true;
          state.formModal.msg = responseMessage;
          state.formModal.color = "#90ee90";
        }
      })
      .addCase(sendResetPassEmail.fulfilled, (state, action) => {
        const responseMessage = action.payload as string;
        const axiosError = action.payload as AxiosError;

        if (axiosError.response?.status !== 200 && axiosError.response) {
          const data = axiosError.response?.data as ErrorPayloadType;
          state.formModal.showModal = true;
          state.formModal.msg = data.msg;
          state.formModal.color = "#f53838";
        } else {
          state.formModal.showModal = true;
          state.formModal.msg = responseMessage;
          state.formModal.color = "#90ee90";
        }
      })
      .addCase(verifyResetPassToken.fulfilled, (state, action) => {
        const axiosError = action.payload as AxiosError;

        if (axiosError.response?.status !== 200 && axiosError.response) {
          state.resetPassTokenAuthorized = false;
        } else {
          state.resetPassTokenAuthorized = true;
        }
      })
      .addCase(verifyResetPassToken.rejected, (state, action) => {
        console.log(action);
      });
  },
});

export const selectProfile = (state: State) => state.general.profile;

export const selectTemplateProfile = (state: State) =>
  state.general.templateProfile;

export const selectFormModal = (state: State) => state.general.formModal;

export const selectLoadingProfile = (state: State) =>
  state.general.loadingProfile;

export const selectLoadingLoginProfile = (state: State) =>
  state.general.loadingLoginProfile;

export const selectLoadingUpdateProfile = (state: State) =>
  state.general.loadingUpdateProfile;

export const selectCardModalId = (state: State) => state.general.cardModalId;

export const selectOptionsContent = (state: State) =>
  state.general.optionsContent;

export const selectOverlay = (state: State) => state.general.overlay;

export const selectEditMode = (state: State) => state.general.editMode;

export const selectEmailFormTemplate = (state: State) =>
  state.general.emailFormTemplate;

export const selectToggleMoveAnnouncementModal = (state: State) =>
  state.general.toggleMoveAnnouncementModal;

export const selectGetAllQueryParams = (state: State) =>
  state.general.getAllQueryParams;

export const selectCurrentPathname = (state: State) =>
  state.general.currentPathname;

export const selectSearchbarQuery = (state: State) =>
  state.general.searchbarQuery;

export const selectScreenLoadingMessage = (state: State) =>
  state.general.screenLoadingMessage;

export const selectRecipientEmail = (state: State) =>
  state.general.recipientEmail;

export const selectNewPass = (state: State) => state.general.newPass;

export const selectNewPassVer = (state: State) => state.general.newPassVer;

export const selectEmailCurrentType = (state: State) =>
  state.general.emailCurrentType;

export const selectResetPassTokenAuthorized = (state: State) =>
  state.general.resetPassTokenAuthorized;

export const {
  updateTemplateProfile,
  updateGeneralFormModal,
  setCardModalId,
  setOptionsContent,
  updateOverlay,
  setEditMode,
  setEmailFormTemplate,
  clearEmailFormTemplate,
  updateToggleMoveAnnouncementModal,
  updateGetAllQueryParams,
  setCurrentPathname,
  updateSearchbarQuery,
  setScreenLoadingMessage,
  setRecipientEmail,
  setNewPass,
  setNewPassVer,
  setEmailCurrentType,
} = generalSlice.actions;

export default generalSlice.reducer;
