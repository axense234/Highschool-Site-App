// Express
import express from "express";

// Controllers and Middleware
import {
  createClass,
  deleteClassById,
  getAllClasses,
  getClassById,
  updateClassById,
} from "../controllers/classes";

const router = express.Router();

router.get("/classes", getAllClasses);

router.get("/classes/class/:classId", getClassById);

router.post("/classes/class/create", createClass);

router.delete("/classes/class/delete/:classId", deleteClassById);

router.patch("/classes/class/update/:classId", updateClassById);

// EXPORTS
export default router;
