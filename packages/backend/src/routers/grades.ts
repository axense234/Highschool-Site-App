// Express
import express from "express";

// Controllers and Middleware
import {
  createGrade,
  deleteGradeById,
  getAllGrades,
  getGradeById,
  updateGradeById,
} from "../app/interactors/gradesInteractors";

const router = express.Router();

router.get("/grades", getAllGrades);

router.get("/grades/grade/:gradeId", getGradeById);

router.post("/grades/grade/create", createGrade);

router.patch("/grades/grade/update/:gradeId", updateGradeById);

router.delete("/grades/grade/delete/:gradeId", deleteGradeById);

export default router;
