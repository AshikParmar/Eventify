
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BASE_URL}/password`;

export const requestForgotPassword = async (email) => {

    try {
        const res = await axios.post(`${API_URL}/forgot`, { email });
        return res.data;
    } catch (err) {
        return err.response?.data || "Error in post API.";
    }
}

export const requestResetPassword = async (token, password) => {

    try {
        const res = await axios.post(`${API_URL}/reset/${token}`, { password });
        return res.data;
    } catch (err) {
        return err.response?.data || "Error in post API.";
    }
}