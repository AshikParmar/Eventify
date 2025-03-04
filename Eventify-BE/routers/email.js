import express from "express";
import { handleSendEmail } from "../controllers/email.js";

const router = express.Router();

// POST route for sending email
router.post("/send-email", handleSendEmail);

export default router;
