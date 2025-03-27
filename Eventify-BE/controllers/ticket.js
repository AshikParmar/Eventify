import mongoose from "mongoose";
import Ticket from "../models/ticket.js";
import { generateQRCode } from "../utils/generateQrcode.js";

const BASE_URL = process.env.BASE_URL;

export const createTicket = async (user, event, numberOfTickets, totalPrice) => {
  try {

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
      qr: "",
    });

    const qrData = `${BASE_URL}/user/ticket/${newTicket._id}`;
    const qrCode = await generateQRCode(qrData);

    newTicket.qr = qrCode;
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
    const tickets = await Ticket.find({ _id: { $in: user.myTickets } }).populate("event participant").sort({ createdAt: - 1 });

    res.status(200).json({ tickets });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


export const getTicket = async (req, res) => {
  try {
    const ticketId = req.params.ticketId;

    if (!mongoose.Types.ObjectId.isValid(ticketId)) {
      console.log("Received Invalid ticketId:", req.params.ticketId);
      return res.status(400).send("Invalid Ticket ID");
    }

    const ticket = await Ticket.findById(ticketId).populate("participant event");

    if (!ticket) {
      return res.status(404).send("Ticket not found");
    }

    res.render("ticket", { ticket });
  } catch (error) {
    console.error("Error fetching ticket:", error);
    res.status(500).send("Internal Server Error");
  }
}

