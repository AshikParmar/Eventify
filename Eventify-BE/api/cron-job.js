import Event from "../models/event.js";

export default async function handler(req, res) {
  if (req?.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const today = new Date();
    const todayISO = today.toISOString().split("T")[0];
    const currentTime = today.toTimeString().split(" ")[0].slice(0, 5); 

    console.log(`🕒 Running Event Update at ${currentTime} on ${todayISO}`);

    // Update events to "Running" when start time is reached
    // const runningResult = await Event.updateMany(
    //   { date: {$lte: todayISO}, status: "Pending" },
    //   { $set: { status: "Running" } }
    // );

    // Update events to "Completed" when end time is reached
    const pendingEvents = await Event.find({ endDate: { $lt: today }, status: "Pending" }).limit(100); // Adjust batch size as needed

    if (pendingEvents.length === 0) {
      console.log("✅ No pending events to update.");
      // return res.status(200).json({ success: true, message: "No events to update." });
    }

    // Update events one by one to avoid performance issues
    for (const event of pendingEvents) {
      await Event.updateOne({ _id: event._id }, { $set: { status: "Completed" } });
    }

    console.log(`✅ ${pendingEvents.length} events completed (Completed).`);

    // console.log(`🎯 ${runningResult.modifiedCount} events started (Running).`);
    // console.log(`✅ ${completedResult.modifiedCount} events completed (Completed).`);

    return res.status(200).json({
      success: true,
      message: "Event statuses updated",
      // runningUpdated: runningResult.modifiedCount,
      completedUpdated: completedResult.modifiedCount,
    });

  } catch (error) {
    console.error("❌ Error updating events:", error);
    return res.status(500).json({ success: false, message: "Error updating event statuses" });
  }
}
