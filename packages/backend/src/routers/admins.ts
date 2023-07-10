// Express
import express from "express";

// Controllers and Middleware
import {
  deleteAdminById,
  getAdminById,
  getAllAdmins,
  updateAdminById,
} from "../app/interactors/adminsInteractors";
import authenticationMiddleware from "../middleware/authentication";
import validateUserPassword from "../middleware/userPassValidation";

const router = express.Router();

router.get("/admins", authenticationMiddleware, getAllAdmins);

router.get("/admins/admin/:userId", getAdminById);

router.patch(
  "/admins/admin/update/:adminId",
  authenticationMiddleware,
  validateUserPassword,
  updateAdminById
);

router.delete(
  "/admins/admin/delete/:adminId",
  authenticationMiddleware,
  deleteAdminById
);

// EXPORTS
export default router;
