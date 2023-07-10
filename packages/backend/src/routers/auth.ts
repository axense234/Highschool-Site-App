// Express
import express from "express";

// Controllers and Middlewares
import {
  loginUser,
  logoutUser,
  createUser,
  getUserProfile,
} from "../app/interactors/authInteractors";
import authenticationMiddleware from "../middleware/authentication";
import accountCodeValidation from "../middleware/accountCodeValidation";

const router = express.Router();

router.get("/users/user/profile", authenticationMiddleware, getUserProfile);

router.post("/users/login", loginUser);

router.delete("/users/options/logout", logoutUser);

router.post("/users/create/:userType", accountCodeValidation, createUser);

// Exports
export default router;
