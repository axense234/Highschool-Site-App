// Express
import express from "express";

// Controllers and Middleware
import {
  deleteStudentByIdOrJWT,
  getStudentByIdOrJWT,
  getAllStudents,
  updateStudentByIdOrJWT,
} from "../controllers/students";

const router = express.Router();

router.get("/students", getAllStudents);

router.get("/students/student/:userId", getStudentByIdOrJWT);

router.patch("/students/student/update/:studentId", updateStudentByIdOrJWT);

router.delete("/students/student/delete/:studentId", deleteStudentByIdOrJWT);

// EXPORTS
export default router;
