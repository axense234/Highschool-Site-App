// Prisma Types
import { Admin } from "@prisma/client";
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
import { defaultTemplateAdmin } from "@/data";
// Config
import { baseSiteUrl } from "@/config";
// Interfaces
import TemplateAdmin from "@/core/interfaces/template/TemplateAdmin";
import TemplateUpdateAdmin from "@/core/interfaces/template/TemplateUpdateAdmin";

const adminsAdapter = createEntityAdapter<Admin>({
  sortComparer: (a, b) => a.fullname.localeCompare(b.fullname),
});

type InitialStateType = {
  loadingAdmins: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingAdmin: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingCreateAdmin: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingDeleteAdmin: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingUpdateAdmin: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingCreateCloudinaryImageForAdmin:
    | "IDLE"
    | "PENDING"
    | "SUCCEDED"
    | "FAILED";
  templateAdmin: TemplateAdmin;
  formModal: FormModalType;
  foundAdminId: string;
};

const initialState = adminsAdapter.getInitialState({
  loadingAdmins: "IDLE",
  loadingAdmin: "IDLE",
  loadingCreateAdmin: "IDLE",
  loadingDeleteAdmin: "IDLE",
  loadingUpdateAdmin: "IDLE",
  loadingCreateCloudinaryImageForAdmin: "IDLE",
  templateAdmin: defaultTemplateAdmin,
  formModal: {
    showModal: false,
    msg: "",
  },
  foundAdminId: "",
}) as EntityState<Admin> & InitialStateType;

// THUNKS
export const getAllAdmins = createAsyncThunk<Admin[] | AxiosError>(
  "admins/getAllAdmins",
  async () => {
    try {
      const { data } = await axiosInstance.get(`/admins`);
      return data.admins as Admin[];
    } catch (error) {
      return error as AxiosError;
    }
  }
);

export const getAdminById = createAsyncThunk<Admin | AxiosError, string>(
  "admins/getAdminById",
  async (adminId) => {
    try {
      const { data } = await axiosInstance.get(`/admins/admin/${adminId}`);
      return data.admin as Admin;
    } catch (error) {
      return error as AxiosError;
    }
  }
);

export const createCloudinaryImageForAdmin = createAsyncThunk(
  "admins/createCloudinaryImageForAdmin",
  async (imageFile: File) => {
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "highschool-site-app-admins");
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

export const createAdmin = createAsyncThunk<Admin | AxiosError, TemplateAdmin>(
  "admins/createAdmin",
  async (templateAdmin) => {
    try {
      const { data } = await axiosInstance.post(
        "/users/create/ADMIN?",
        templateAdmin
      );
      return data.user as Admin;
    } catch (error) {
      return error as AxiosError;
    }
  }
);

export const deleteAdminById = createAsyncThunk<Admin | AxiosError, string>(
  "admins/deleteAdminById",
  async (adminId) => {
    try {
      const { data } = await axiosInstance.delete(
        `/admins/admin/delete/${adminId}`
      );
      return data.admin as Admin;
    } catch (error) {
      return error as AxiosError;
    }
  }
);

export const updateAdminById = createAsyncThunk<
  Admin | AxiosError,
  TemplateUpdateAdmin
>("admins/updateAdminById", async (templateAdmin) => {
  try {
    const { data } = await axiosInstance.patch(
      `/admins/admin/update/${templateAdmin.admin_uid}`,
      templateAdmin
    );
    return data.admin as Admin;
  } catch (error) {
    return error as AxiosError;
  }
});

const adminsSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {
    updateTemplateAdmin(state, action: PayloadAction<ObjectKeyValueType>) {
      state.templateAdmin = {
        ...state.templateAdmin,
        [action.payload.key]: action.payload.value,
      };
    },
    updateAdminsFormModal(state, action: PayloadAction<boolean>) {
      state.formModal.showModal = action.payload;
    },
    setTemplateAdmin(state, action: PayloadAction<TemplateAdmin>) {
      state.templateAdmin = action.payload;
    },
    setFoundAdminId(state, action: PayloadAction<string>) {
      state.foundAdminId = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllAdmins.pending, (state, action) => {
        state.loadingAdmins = "PENDING";
      })
      .addCase(getAllAdmins.fulfilled, (state, action) => {
        const admins = action.payload as Admin[];
        if (admins.length >= 1) {
          admins.map((admin) => {
            admin.id = admin.admin_uid;
            return admin;
          });
          adminsAdapter.upsertMany(state, admins);
        }
        state.loadingAdmins = "SUCCEDED";
      })
      .addCase(getAdminById.pending, (state, action) => {
        state.loadingAdmin = "PENDING";
      })
      .addCase(getAdminById.fulfilled, (state, action) => {
        const admin = action.payload as Admin;
        const axiosError = action.payload as AxiosError;

        if (!axiosError.response) {
          admin.id = admin.admin_uid;
          adminsAdapter.upsertOne(state, admin);
        }

        state.loadingAdmin = "SUCCEDED";
      })
      .addCase(createCloudinaryImageForAdmin.pending, (state, action) => {
        state.loadingCreateCloudinaryImageForAdmin = "PENDING";
      })
      .addCase(createCloudinaryImageForAdmin.fulfilled, (state, action) => {
        state.templateAdmin.profile_img_url = action.payload;
        state.loadingCreateCloudinaryImageForAdmin = "SUCCEDED";
      })
      .addCase(createAdmin.pending, (state, action) => {
        state.loadingCreateAdmin = "PENDING";
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        const admin = action.payload as Admin;
        const axiosError = action.payload as AxiosError;

        if (axiosError.response?.status !== 200 && axiosError.response) {
          const data = axiosError.response?.data as ErrorPayloadType;
          state.formModal.showModal = true;
          state.formModal.msg = data.msg;
          state.formModal.color = "#f53838";
        } else {
          state.formModal.showModal = true;
          state.formModal.msg = "Am creat un admin cu success!";
          state.formModal.color = "#90ee90";
          admin.id = admin.admin_uid;
          localStorage.setItem("hsa-userId", admin.admin_uid);
          adminsAdapter.addOne(state, admin);
          window.location.href = `${baseSiteUrl}/profil`;
        }
        state.loadingCreateAdmin = "SUCCEDED";
      })
      .addCase(deleteAdminById.pending, (state, action) => {
        state.loadingDeleteAdmin = "PENDING";
      })
      .addCase(deleteAdminById.fulfilled, (state, action) => {
        const admin = action.payload as Admin;

        if (admin) {
          adminsAdapter.removeOne(state, admin.admin_uid);
        }

        state.loadingDeleteAdmin = "SUCCEDED";
      })
      .addCase(updateAdminById.pending, (state, action) => {
        state.loadingUpdateAdmin = "PENDING";
      })
      .addCase(updateAdminById.fulfilled, (state, action) => {
        const admin = action.payload as Admin;
        const axiosError = action.payload as AxiosError;

        if (axiosError.response?.status !== 200 && axiosError.response) {
          const data = axiosError.response?.data as ErrorPayloadType;
          state.formModal.showModal = true;
          state.formModal.msg = data.msg;
          state.formModal.color = "#f53838";
        } else {
          state.formModal.showModal = true;
          state.formModal.msg = "Am actualizat contul tău de admin cu success!";
          state.formModal.color = "#90ee90";
          admin.id = admin.admin_uid;
          adminsAdapter.updateOne(state, {
            id: admin.admin_uid,
            changes: admin,
          });
          state.templateAdmin = admin as TemplateAdmin;
          state.templateAdmin = { ...state.templateAdmin, password: "PAROLA" };
        }
        state.loadingUpdateAdmin = "SUCCEDED";
      });
  },
});

export const { selectAll: selectAllAdmins, selectById: selectAdminById } =
  adminsAdapter.getSelectors<State>((state) => state.admins);

export const selectLoadingAdmins = (state: State) => state.admins.loadingAdmins;

export const selectLoadingAdmin = (state: State) => state.admins.loadingAdmin;

export const selectLoadingCreateAdmin = (state: State) =>
  state.admins.loadingCreateAdmin;

export const selectLoadingUpdateAdmin = (state: State) =>
  state.admins.loadingUpdateAdmin;

export const selectLoadingDeleteAdmin = (state: State) =>
  state.admins.loadingDeleteAdmin;

export const selectLoadingCreateCloudinaryImageForAdmin = (state: State) =>
  state.admins.loadingCreateCloudinaryImageForAdmin;

export const selectTemplateAdmin = (state: State) => state.admins.templateAdmin;

export const selectAdminsFormModal = (state: State) => state.admins.formModal;

export const selectFoundAdminId = (state: State) => state.admins.foundAdminId;

export const {
  updateTemplateAdmin,
  updateAdminsFormModal,
  setTemplateAdmin,
  setFoundAdminId,
} = adminsSlice.actions;

export default adminsSlice.reducer;
