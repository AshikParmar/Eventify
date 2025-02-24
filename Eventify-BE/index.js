import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import userRoute from "./routers/user.js";
import connectDB from "./db/database.js";
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true 
}));

connectDB();

const PORT = process.env.PORT || 5000;

app.use("/user",userRoute);  

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});
