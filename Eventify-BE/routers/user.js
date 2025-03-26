import express from "express";
import { changePassword, getUserById, getUsers, signIn, signUp, updateUser, googleLogin } from "../controllers/user.js";
import { auth } from "../middleware/auth.middleware.js";
import { getUserTickets } from "../controllers/ticket.js";

const router = express.Router();

router.post("/signup",signUp);
router.post("/signin",signIn);
router.get("/fetchusers", getUsers);
router.get("/getuser/:id", getUserById);
router.put('/change-password', auth(["Admin","User"]), changePassword);
router.put('/update-user', auth(["Admin","User"]), updateUser);

router.get("/tickets", auth(["User"]), getUserTickets)

router.post("/google-login", googleLogin);

export default router;