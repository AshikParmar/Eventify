

import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    type: {
        type: String,
    },
    venue: {
        type: String,
    },
    date: {
        type: String,
    },
    endDate: { 
        type: String, 
    },
    isSingleDay: {
        type: Boolean,
    },
    startTime: {
        type: String,
    },
    endTime:{
        type:String,
    },
    organizer: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    participants: [{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }],
    price: {
        type: String,
        default: "Free"
    }, 
    totalSlots: {
        type: Number,
    },
    availableSlots: {
        type: Number,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum:["Pending","Running","Completed","Rejected"],
        default: "Pending",
    },
    image: {
        type: String,
    },

}, 
{ timestamps: true }
);


const Event = mongoose.model("Event", eventSchema);
export default Event;