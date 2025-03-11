
import axios from "axios";
import { authHeader } from "../slices/eventSlice";

const API_URL = `${import.meta.env.VITE_BASE_URL}/events`;

// export const joinEvents = async ({ eventId, userId }) => {
//   try {
//     const response = await axios.post(`${API_URL}/join-event`, { eventId, userId }, {
//       headers: {
//         "authorization": authHeader(),
//       },
//     });
//     return response.data;
//   } catch (error) {
//     return error.response.data;
//   }
// };

export const joinEvent = async (userId, eventId, ticketCount, totalPrice) => {
  try {
    const response = await axios.post(`${API_URL}/join-event`, {
      userId,
      eventId,
      numberOfTickets: ticketCount,
      totalPrice
    }, {
      headers: {
        "authorization": authHeader(),
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error joining event:", error.response?.data || error);
    throw error.response?.data || { success: false, message: "Error joining event" };
  }
};
