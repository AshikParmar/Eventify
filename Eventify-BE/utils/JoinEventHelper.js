import { sendEventConfirmation } from "../services/emailService.js"; 
import { createTicket } from "../controllers/ticket.js"; 

export const joinEventInternal = async ({ user, event, numberOfTickets, totalPrice }) => {
  try {

    const newTicket = await createTicket(user, event, numberOfTickets, totalPrice);

    // Update Event
    event.participants.push(user._id);
    event.tickets.push(newTicket._id);
    event.availableSlots -= numberOfTickets;
    await event.save();

    // Update User
    user.myTickets.push(newTicket._id);
    await user.save();

    // Send confirmation email
    sendEventConfirmation(user, event, newTicket, numberOfTickets, totalPrice)
      .catch(err => console.error("Failed to send confirmation email:", err));

    return {
      success: true,
      message: "User joined the event successfully",
      ticket: newTicket,
    };
  } catch (error) {
    console.error("joinEventInternal Error:", error.message);
    throw new Error(error.message || "Internal error while joining event");
  }
};
