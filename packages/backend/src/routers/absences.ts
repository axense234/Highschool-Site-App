// Express
import express from "express";

// Controllers and Middleware
import {
  createAbsence,
  deleteAbsenceById,
  getAbsenceById,
  getAllAbsences,
  updateAbsenceById,
} from "../app/interactors/absencesInteractors";

const router = express.Router();

router.get("/absences", getAllAbsences);

router.get("/absences/absence/:absenceId", getAbsenceById);

router.post("/absences/absence/create", createAbsence);

router.patch("/absences/absence/update/:absenceId", updateAbsenceById);

router.delete("/absences/absence/delete/:absenceId", deleteAbsenceById);

export default router;
