// Express
import express from "express";

// Controllers and Middleware
import { createUser, loginUser } from "../controllers/auth";

const router = express.Router();

router.post("/utilizatori/create", createUser);

router.post("/utilizatori/login", loginUser);

// Exports
export default router;
