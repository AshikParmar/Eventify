import cron from "node-cron";
import mongoose from "mongoose";
import Event from "../models/event.js";

const eventStatusUpdate = () => {
  cron.schedule("0 0 * * *", async () => {
    console.log("Running event status update job...");

    try {
      const today = new Date();
      const todayISO = today.toISOString().split("T")[0]; 

    //console.log(`Today's Date (String Format): ${todayISO}`);

      const result = await Event.updateMany(
        { date: { $lt: todayISO }, status: "Pending" },
        { $set: { status: "Completed" } }
      );

      console.log(`${result.modifiedCount} expired events marked as 'Completed'.`);
    } catch (error) {
      console.error(" Error updating expired events:", error);
    }
  });
};

export default eventStatusUpdate;
