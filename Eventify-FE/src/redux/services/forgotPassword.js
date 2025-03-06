
import axios from "axios";

export const requestForgotPassword = async (email) => {

    try {
        const res = await axios.post("http://localhost:3000/password/forgot", { email });
        return res.data;
    } catch (err) {
        return err.response?.data || "Error in post API.";
    }
}

export const requestResetPassword = async (token, password) => {

    try {
        const res = await axios.post(`http://localhost:3000/password/reset/${token}`, { password });
        return res.data;
    } catch (err) {
        return err.response?.data || "Error in post API.";
    }
}