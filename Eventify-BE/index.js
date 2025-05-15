import express from "express";
import "dotenv/config";
import cors from "cors";
import userRoute from "./routers/user.js";
import connectDB from "./db/database.js";
import eventRoute from "./routers/event.js";
import emailRoutes from "./routers/email.js";
import passwordRoutes from "./routers/password.js";
import cronJobRoutes from "./routers/cron-job.js";
import eventStatusUpdate from "./services/cronJob.js";
import checkoutRoutes from "./routers/checkoutRoutes.js"

import { fileURLToPath } from "url";
import path from "path";

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true 
}));

app.use("/payment", checkoutRoutes); 

app.use(express.json());


// Set the view engine and the absolute path for views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

connectDB();
// eventStatusUpdate();

const PORT = process.env.PORT || 5000;

app.use("/user", userRoute);  
app.use("/events", eventRoute);
app.use("/email", emailRoutes);
app.use("/password", passwordRoutes); 
app.use("/api", cronJobRoutes);

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});
