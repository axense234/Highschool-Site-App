// Express
import express from "express";

// Controllers and Middleware
import {
  getAllTeachers,
  deleteTeacherById,
  updateTeacherById,
  getTeacherById,
} from "../controllers/teachers";

const router = express.Router();

router.get("/teachers", getAllTeachers);

router.get("/teachers/teacher/:teacherId", getTeacherById);

router.delete("/teachers/teacher/delete/:teacherId", deleteTeacherById);

router.patch("/teachers/teacher/update/:teacherId", updateTeacherById);

// EXPORTS
export default router;
