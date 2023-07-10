// Express
import express from "express";

// Controllers and Middleware
import {
  getAllTeachers,
  deleteTeacherById,
  updateTeacherById,
  getTeacherById,
} from "../app/interactors/teachersInteractors";

const router = express.Router();

router.get("/teachers", getAllTeachers);

router.get("/teachers/teacher/:userId", getTeacherById);

router.delete("/teachers/teacher/delete/:teacherId", deleteTeacherById);

router.patch("/teachers/teacher/update/:teacherId", updateTeacherById);

// EXPORTS
export default router;
