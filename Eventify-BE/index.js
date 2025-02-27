import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import userRoute from "./routers/user.js";
import connectDB from "./db/database.js";
import eventRoute from "./routers/event.js"

const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded images    
app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true 
}));

connectDB();

const PORT = process.env.PORT || 5000;

app.use("/user",userRoute);  
app.use("/events",eventRoute)

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});
