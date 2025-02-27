import express from "express";
import { getUsers, signIn, signUp } from "../controllers/user.js";


const router = express.Router();

router.post("/signup",signUp);
router.post("/signin",signIn);
router.get("/fetchusers", getUsers);


export default router;