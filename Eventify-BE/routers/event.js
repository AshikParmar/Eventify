// eventRoutes.js
import express from "express";
import { createEvent, getEvents, getEventById, updateEvent, deleteEvent,joinEvent } from "../controllers/event.js";
import { auth } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.js";
import { validateJoinRequest } from "../middleware/validateJoinRequest.middleware.js";

const router = express.Router();


router.post("/create",auth(["Admin"]), upload.single("image"), createEvent);
router.get("/fetchevents", getEvents);
router.get("/getevent/:id", getEventById);
router.put("/update/:id",auth(["Admin"]),  upload.single("image") ,updateEvent);
router.delete("/delete/:id", auth(["Admin"]),deleteEvent);
router.post("/join-event",auth(["User"]), validateJoinRequest, joinEvent)

export default router;