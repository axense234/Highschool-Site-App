// Express
import express from "express";

// Controllers and Middleware
import {
  createTeacher,
  deleteAllTeachers,
  getAllTeachers,
  deleteTeacherById,
  updateTeacherById,
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

router.delete(
  "/profesori/profesor/delete/:teacherId",
  authenticationMiddleware,
  deleteTeacherById
);

router.patch(
  "/profesori/profesor/update/:teacherId",
  authenticationMiddleware,
  updateTeacherById
);

// EXPORTS
export default router;
