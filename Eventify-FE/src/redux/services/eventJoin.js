
import axios from "axios";
import { authHeader } from "../slices/eventSlice";


const API_URL = import.meta.env.VITE_BASE_URL;

const EVENT_URL = `${API_URL}/events`;
const USER_URL = `${API_URL}/user`


export const joinEvent = async (userId, eventId, ticketCount, totalPrice) => {
  try {
    const response = await axios.post(`${EVENT_URL}/join-event`, {
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


export const createCheckoutSession = async ({ eventId, userId, amount, quantity }) => {
  try {
    const { data } = await axios.post(`${API_URL}/payment/create-checkout-session`, {
      eventId,
      userId,
      amount,
      quantity,
    }, {
      headers: {
        "authorization": authHeader(),
      },
    });

    return {
      success: data.success,
      sessionId: data?.data?.sessionId,
      message: data?.message,
    };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message || "Failed to create checkout session",
    };
  }
};

export const getUserTickets = async () => {

  try {
    const res = await axios.get(`${USER_URL}/tickets`, {
      headers: {
        "authorization": authHeader(),
      },
    });

    return res.data;
  } catch (err) {
    return err.response?.data || "Error in get Tickets";
  }
}