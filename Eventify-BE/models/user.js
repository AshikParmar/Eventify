

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    googleId:{ 
        type: String, 
        unique: true, 
        sparse: true 
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true 
    },
    password:{
        type:String
    },
    role:{
        type:String,
        enum:["Admin","User"],
        default:"User"
    },
    myTickets: [{
            type: mongoose.Schema.ObjectId,
            ref: "Ticket"
        }],
},
{ timestamps: true },
);


const User = mongoose.model("User",userSchema);
export default User;