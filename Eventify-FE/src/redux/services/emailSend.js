
const API_URL = `${import.meta.env.VITE_BASE_URL}/email`;

export const sendEmail = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/send-email`, formData);
        return response; 
    } catch (error) {
        throw error; 
    }
};