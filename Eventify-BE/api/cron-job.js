import Event from "../models/event.js";  

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const now = new Date();
    const localTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })); // Change to your time zone
    const todayISO = localTime.toISOString().split("T")[0];
    const currentTime = localTime.toTimeString().slice(0, 5); 

    console.log(`🕒 Running Event Update at ${currentTime} on ${todayISO}`);

    // Update events to "Running" when start time is reached
    const runningResult = await Event.updateMany(
      { date: todayISO, startTime: { $lte: currentTime }, status: "Pending" },
      { $set: { status: "Running" } }
    );

    // Update events to "Completed" when end time is reached
    const completedResult = await Event.updateMany(
      { date: todayISO, endTime: { $lte: currentTime }, status: "Running" },
      { $set: { status: "Completed" } }
    );

    console.log(`🎯 ${runningResult.modifiedCount} events started (Running).`);
    console.log(`✅ ${completedResult.modifiedCount} events completed (Completed).`);

    return res.status(200).json({
      success: true,
      message: "Event statuses updated",
      runningUpdated: runningResult.modifiedCount,
      completedUpdated: completedResult.modifiedCount,
    });

  } catch (error) {
    console.error("❌ Error updating events:", error);
    return res.status(500).json({ success: false, message: "Error updating event statuses" });
  }
}
