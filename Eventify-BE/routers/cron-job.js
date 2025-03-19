import express from "express";
import handler from "../api/cron-job.js";

const router = express.Router();

// POST route for sending email
router.get("/cron-job", handler);

export default router;
