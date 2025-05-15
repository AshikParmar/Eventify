// eventController.js
import Event from "../models/event.js";
import { uploadToCloudinary } from "../services/cloudinary.js";
import { sendEventConfirmation } from "../services/emailService.js";
import { joinEventInternal } from "../utils/JoinEventHelper.js";
import { createTicket } from "./ticket.js";

// Create Event
export const createEvent = async (req, res) => {
    try {
        const { title, type, venue, date, endDate, startTime, endTime, isSingleDay, price, totalSlots } = req.body;

        if (!title || !type || !venue || !date || !startTime || !endTime || !totalSlots) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        let imageUrl;
        if (req.file) {
            if (!req.file.mimetype.startsWith("image/")) {
                return res.status(400).json({
                    success: false,
                    message: "The uploaded file must be an image",
                });
            }

            imageUrl = await uploadToCloudinary(req.file);
        }

        const userId = req.userId

        const eventPrice = price || "Free";
        const eventEndDate = isSingleDay ? date : endDate;

        const event = new Event({
            ...req.body,
            endDate: eventEndDate,
            availableSlots: totalSlots,
            price: eventPrice,
            organizer: userId,
            image: imageUrl
        });
        await event.save();
        res.status(201).json({ success: true, message: "Event created successfully", data: event });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get All Events
export const getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate("organizer participants").sort({ createdAt: - 1 });
        if (events.length === 0) {
            return res.status(404).json({ success: false, message: "No events found" });
        }
        const currDate = Date.now();
        // console.log(currDate);

        const pendingEvents = events?.filter((event) => {
            const eventTimestamp = new Date(event.date).getTime();
            return eventTimestamp >= currDate && event.status === "Pending";
        });
        res.status(200).json({ success: true, data: { events, pendingEvents } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Get Event by ID
export const getEventById = async (req, res) => {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid event ID" });
        }
        const event = await Event.findById(req.params.id).populate("organizer participants tickets");
        if (!event) return res.status(404).json({ success: false, message: "Event not found" });
        res.status(200).json({ success: true, data: event });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate event ID
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid event ID" });
        }

        // Find existing event
        let event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }

        // Extract fields to update
        const { title, type, venue, date, isSingleDay, endDate, startTime, endTime, totalSlots, availableSlots, price, description } = req.body;
        const eventPrice = price || "Free";
        const eventEndDate = isSingleDay ? date : endDate;

        let updatedFields = { title, type, venue, date, endDate: eventEndDate, startTime, endTime, totalSlots, availableSlots, price: eventPrice, description };

        // Handle Image Upload if a new image is provided
        if (req.file) {
            if (!req.file.mimetype.startsWith("image/")) {
                return res.status(400).json({ success: false, message: "The uploaded file must be an image" });
            }

            const imageUrl = await uploadToCloudinary(req.file);
            updatedFields.image = imageUrl; // Update image URL
        }

        // Update the event in the database
        event = await Event.findByIdAndUpdate(id, updatedFields, { new: true });

        res.status(200).json({ success: true, data: event });
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({ success: false, message: "Error updating event" });
    }
};


// Delete Event
export const deleteEvent = async (req, res) => {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid event ID" });
        }
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).json({ success: false, message: "Event not found" });
        res.status(200).json({ success: true, message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const joinEvent = async (req, res) => {
  try {
    const { eventId, userId, numberOfTickets, totalPrice } = req.body;
    const event = req._validatedEvent;
    const user = req.user;

    const result = await joinEventInternal({
      user,
      event,
      numberOfTickets,
      totalPrice,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
