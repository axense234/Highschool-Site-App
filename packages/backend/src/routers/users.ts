// Express
import express from "express";

// Controllers and Middleware
import {
  deleteUserByIdOrJWT,
  getUserByIdOrJWT,
  getAllUsers,
  updateUserByIdOrJWT,
} from "../controllers/users";
import authenticationMiddleware from "../middleware/authentication";

const router = express.Router();

router.get("/utilizatori", authenticationMiddleware, getAllUsers);

router.get("/utilizatori/:userId", authenticationMiddleware, getUserByIdOrJWT);

router.patch(
  "/utilizatori/update/:userId",
  authenticationMiddleware,
  updateUserByIdOrJWT
);

router.delete(
  "/utilizatori/delete/:userId",
  authenticationMiddleware,
  deleteUserByIdOrJWT
);

// EXPORTS
export default router;
