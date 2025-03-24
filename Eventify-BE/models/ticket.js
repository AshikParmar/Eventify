import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
    {
        participant: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        },
        event: { 
            type: mongoose.Schema.ObjectId, 
            ref: "Event", 
            required: true 
        },
        name: { 
            type: String, 
        },
        email: { 
            type: String,
        },
        eventName: { 
            type: String,
        },
        eventDate: { 
            type: String,
        },
        eventStartTime: { 
            type: String,
        },
        numberOfTickets: { 
            type: Number,
        }, 
        totalPrice: { 
            type: Number,
            default: 0,
         },
        qr: { 
            type: String 
        }, // Store QR as Base64
    }, 
    { timestamps: true }
);

 const Ticket = mongoose.model("Ticket", ticketSchema);
 export default Ticket;
