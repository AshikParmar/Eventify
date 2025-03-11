import QRCode from "qrcode";
import Ticket from "../models/ticket.js";

export const createTicket = async (user, event, numberOfTickets, totalPrice) => {
  try {
    const qrData = `Event: ${event.title}\nName: ${user._id}\nTickets: ${numberOfTickets}`;
    const qrCode = await QRCode.toDataURL(qrData);

    const newTicket = await Ticket.create({
      userId: user._id,
      eventId: event._id,
      name: user.username, 
      email: user.email, 
      eventName: event.title,
      eventDate: event.date,
      eventStartTime: event.startTime,
      numberOfTickets,
      totalPrice,
      qr: qrCode,
    });

    await newTicket.save();
    return newTicket;
  } catch (error) {
    console.error("Error creating ticket:", error);
    throw new Error("Ticket creation failed");
  }
};
