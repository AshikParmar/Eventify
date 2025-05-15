import Stripe from "stripe";
import { joinEventInternal } from "../utils/JoinEventHelper.js"; 
import User from "../models/user.js";
import Event from "../models/event.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  const { eventId, userId, amount, quantity } = req.body;
  const event = req._validatedEvent;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: event.title,
            },
            unit_amount: amount * 100,
          },
          quantity,
        },  
      ],
      customer_email: userEmail,
      metadata: { eventId, userId, amount, quantity },
      success_url: `${process.env.CLIENT_URL}/payment/success`,
      cancel_url: `${process.env.CLIENT_URL}/payment/cancel`,
    });

     res.status(201).json({
      success: true,
      message: "Checkout session created successfully",
      data: { sessionId: session.id },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create checkout session",
    });
  }
};


export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: `Webhook signature verification failed: ${err.message}`
    });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const { eventId, userId, amount, quantity } = session.metadata;
    try {
      const user = await User.findById(userId);
      const myEvent = await Event.findById(eventId);

      const result = await joinEventInternal({ 
        user, 
        event: myEvent, 
        numberOfTickets: Number(quantity), 
        totalPrice: amount*quantity 
      });

      return res.status(200).json(result);

    } catch (err) {
      console.error("Webhook join error:", err.message);
      return res.status(400).json({ success: false, message: err.message });
    }
  }

  // Respond to all other events
  return res.status(200).json({ success: true, message: "Webhook received, no action taken." });
};
