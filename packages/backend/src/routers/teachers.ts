// Express
import express from "express";

// Controllers and Middleware
import {
  createTeacher,
  deleteAllTeachers,
  getAllTeachers,
} from "../controllers/teachers";
import authenticationMiddleware from "../middleware/authentication";

const router = express.Router();

router.get("/profesori", getAllTeachers);

router.post("/profesori/create", authenticationMiddleware, createTeacher);

router.delete(
  "/profesori/delete/all",
  authenticationMiddleware,
  deleteAllTeachers
);

// EXPORTS
export default router;
