import QRCode from "qrcode";
import Ticket from "../models/ticket.js";

export const createTicket = async (user, event, numberOfTickets, totalPrice) => {
  try {
    const qrData = `Event_Id: ${event._id}\n\n Event: ${event.title}\n\nName: ${user.username}\n\nTickets: ${numberOfTickets}`;
    const qrCode = await QRCode.toDataURL(qrData);

    const newTicket = await Ticket.create({
      participant: user._id,
      event: event._id,
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


export const getUserTickets = async (req, res) => {
    try {
        const user = req.user;

        // Find all tickets and populate event details
        const tickets = await Ticket.find({ _id: { $in: user.myTickets } }).populate("event participant").sort({createdAt:- 1});

        res.status(200).json({ tickets });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

