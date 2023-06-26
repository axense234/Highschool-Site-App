// Express
import express from "express";

// Controllers and Middlewares
import {
  loginUser,
  logoutUser,
  createUser,
  getUserProfile,
} from "../controllers/auth";
import authenticationMiddleware from "../middleware/authentication";

const router = express.Router();

router.get("/users/user/profile", authenticationMiddleware, getUserProfile);

router.post("/users/login", loginUser);

router.delete("/users/options/logout", logoutUser);

router.post("/users/create/:userType", createUser);

// Exports
export default router;
