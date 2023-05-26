// Express
import express from "express";

// Controllers and Middleware
import { sendEmail } from "../controllers/email";

const router = express.Router();

router.post("/optiuni/email", sendEmail);

export default router;
