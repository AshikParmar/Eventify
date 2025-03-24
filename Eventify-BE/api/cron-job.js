import Event from "../models/event.js";
import moment from "moment-timezone";

const handler = async(req, res) => {
  if (req?.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const now = moment().tz("Asia/Kolkata");
    const todayISO = now.format("YYYY-MM-DD"); // YYYY-MM-DD format
    const currentTime = now.format("HH:mm"); // 24-hour format HH:mm 

    console.log(`🕒 Running Event Update at ${currentTime} on ${todayISO}`);
 
    // Update events to "Running" when start time is reached
    const startedResult = await Event.updateMany(
      { date: {$lte: todayISO}, startTime: {$lte: currentTime}, status: "Pending" },
      { $set: { status: "Ongoing" } }
    );

    // Update events to "Completed" when end time is reached
    const completedResult = await Event.updateMany(
      { endDate: {$lte: todayISO},endTime: {$lte: currentTime}, status: "Ongoing" },
      { $set: { status: "Completed" } }
    );

    console.log(`🎯 ${startedResult.modifiedCount} events started (Ongoing).`);
    console.log(`✅ ${completedResult.modifiedCount} events completed (Completed).`);

    return res.status(200).json({
      success: true,
      message: "Event statuses updated",
      startedUpdated: startedResult.modifiedCount,
      completedUpdated: completedResult.modifiedCount,
    });

  } catch (error) {
    console.error("❌ Error updating events:", error);
    return res.status(500).json({ success: false, message: "Error updating event statuses" });
  }
}

export default handler;
