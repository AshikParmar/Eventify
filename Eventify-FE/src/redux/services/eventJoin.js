
import axios from "axios";
import { authHeader } from "../slices/eventSlice";

const API_URL = "http://localhost:3000/events";

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