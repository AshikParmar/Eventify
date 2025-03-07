
import axios from "axios";
import { authHeader } from "../slices/eventSlice";

const API_URL = `${import.meta.env.VITE_BASE_URL}/events`;

export const joinEvents = async ({ eventId, userId }) => {
    try {
      const response = await axios.post(`${API_URL}/joinevent`,{eventId, userId},{
            headers:{ 
              "authorization": authHeader(),
            },
          });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };