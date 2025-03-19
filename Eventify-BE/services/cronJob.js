import cron from "node-cron";
import Event from "../models/event.js";

const eventStatusUpdate = () => {
  cron.schedule("*/1 * * * *", async () => {  //Runs every minute
    console.log("Running event status update job...");

    try {
      const now = new Date();
      const todayISO = now.toISOString().split("T")[0]; 
      const currentTime = now.toTimeString().split(" ")[0].slice(0, 5); // Current time in "HH:mm"

      console.log(`🕒 Current Time: ${currentTime}, 📅 Today: ${todayISO}`);

      // Update events to "Running" when their start date & time arrive
      const runningResult = await Event.updateMany(
        { date: {$lte: todayISO}, startTime: { $lte: currentTime }, status: "Pending" },
        { $set: { status: "Running" } }
      );

      // Update events to "Completed" when their end date & time arrive
      const completedResult = await Event.updateMany(
        { endDate: {$lte: todayISO}, endTime: { $lte: currentTime }, status: "Running" },
        { $set: { status: "Completed" } }
      );

      console.log(`🎯 ${runningResult.modifiedCount} events started (Status: Running).`);
      console.log(`✅ ${completedResult.modifiedCount} events completed (Status: Completed).`);

    } catch (error) {
      console.error("❌ Error updating event statuses:", error);
    }
  });
};

export default eventStatusUpdate;
