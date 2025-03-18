import express from "express";
import "dotenv/config";
import cors from "cors";
import userRoute from "./routers/user.js";
import connectDB from "./db/database.js";
import eventRoute from "./routers/event.js"
import emailRoutes from "./routers/email.js";
import passwordRoutes from "./routers/password.js";
import eventStatusUpdate from "./services/cronJobs.js";
import handler from "./api/cron-job.js";

const app = express();
app.use(express.json());
    
app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true 
}));

connectDB();
// eventStatusUpdate();
// handler();


const PORT = process.env.PORT || 5000;

app.use("/user",userRoute);  
app.use("/events",eventRoute)
app.use("/email", emailRoutes);
app.use("/password", passwordRoutes); 

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});
