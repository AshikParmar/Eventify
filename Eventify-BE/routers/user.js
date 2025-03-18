import express from "express";
import { changePassword, getUsers, signIn, signUp, updateUser } from "../controllers/user.js";
import { auth } from "../middleware/auth.middleware.js";
import { getUserTickets } from "../controllers/ticket.js";


const router = express.Router();

router.post("/signup",signUp);
router.post("/signin",signIn);
router.get("/fetchusers", getUsers);
router.put('/change-password', auth(["Admin","User"]), changePassword);
router.put('/update-user', auth(["Admin","User"]), updateUser);

router.get("/tickets", auth(["User"]), getUserTickets)


export default router;