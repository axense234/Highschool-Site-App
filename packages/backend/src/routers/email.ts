// Express
import express from "express";

// Controllers and Middleware
import {
  sendEmail,
  resetPasswordEmail,
  verifyResetPassToken,
} from "../controllers/email";

const router = express.Router();

router.post("/options/email", sendEmail);

router.post("/options/email/reset-pass", resetPasswordEmail);

router.get("/options/email/reset-pass/verify", verifyResetPassToken);

export default router;
