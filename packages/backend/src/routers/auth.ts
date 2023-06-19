// Express
import express from "express";

// Controllers and Middlewares
import { loginUser, logoutUser, createUser } from "../controllers/auth";

const router = express.Router();

router.post("/users/login", loginUser);

router.delete("/users/options/logout", logoutUser);

router.post("/users/create/:userType", createUser);

// Exports
export default router;
