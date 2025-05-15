import express from "express";
import { createCheckoutSession, handleStripeWebhook } from "../controllers/checkoutController.js";
import { validateJoinRequest } from "../middleware/validateJoinRequest.middleware.js";
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create-checkout-session",express.json(), auth(["User"]), validateJoinRequest, createCheckoutSession);
router.post("/checkout-session-success",express.raw({ type: 'application/json' }), handleStripeWebhook);


export default router;
