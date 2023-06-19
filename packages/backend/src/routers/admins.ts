// Express
import express from "express";

// Controllers and Middleware
import {
  deleteAdminByIdOrJWT,
  getAdminByIdOrJWT,
  getAllAdmins,
  updateAdminByIdOrJWT,
} from "../controllers/admins";
import authenticationMiddleware from "../middleware/authentication";

const router = express.Router();

router.get("/admins", authenticationMiddleware, getAllAdmins);

router.get(
  "/admins/admin/:adminId",
  authenticationMiddleware,
  getAdminByIdOrJWT
);

router.patch(
  "/admins/admin/update/:adminId",
  authenticationMiddleware,
  updateAdminByIdOrJWT
);

router.delete(
  "/admins/admin/delete/:adminId",
  authenticationMiddleware,
  deleteAdminByIdOrJWT
);

// EXPORTS
export default router;
