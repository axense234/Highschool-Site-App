// Express
import express from "express";

// Controllers and Middleware
import {
  deleteStudentById,
  getStudentById,
  getAllStudents,
  updateStudentById,
} from "../app/interactors/studentsInteractors";

const router = express.Router();

router.get("/students", getAllStudents);

router.get("/students/student/:userId", getStudentById);

router.patch("/students/student/update/:studentId", updateStudentById);

router.delete("/students/student/delete/:studentId", deleteStudentById);

// EXPORTS
export default router;
