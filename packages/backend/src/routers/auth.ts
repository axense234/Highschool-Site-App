// Express
import express from "express";

// Controllers and Middleware
import { createUser, loginUser, logoutUser } from "../controllers/auth";
import authenticationMiddleware from "../middleware/authentication";

const router = express.Router();

router.post("/utilizatori/create", authenticationMiddleware, createUser);

router.post("/utilizatori/login", loginUser);

router.get("/utilizatori/optiuni/logout", logoutUser);

// Exports
export default router;
