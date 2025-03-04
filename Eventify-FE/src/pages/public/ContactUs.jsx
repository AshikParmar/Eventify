import React, { useState, useEffect } from 'react';
import { useGlobalUI } from '../../components/Globel/GlobalUIContext';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ContactUs = () => {
    const { showSnackbar, showDialog } = useGlobalUI();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    
    const user = useSelector(state => state.user.user);

    useEffect(() => {
        if (user) {
            setFormData({ name: user.username || '', email: user.email || '', message: '' });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        showDialog(
            "Send Mail",
            `Are you sure you want to send the email from: ${formData.email}?`,
            async () => {
                setLoading(true);

                try {
                    const response = await axios.post("http://localhost:3000/email/send-email", formData);
                    showSnackbar(response.data.message, "success");

                    setFormData({ name: user?.username || "", email: user?.email || "", message: "" });
                } catch (error) {
                    showSnackbar("Failed to send email: " + (error.response?.data?.error || error.message), "error");
                } finally {
                    setLoading(false);
                }
            }
        );
    };

    return (
        <div className='bg-gray-50 p-8'>
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Get in Touch</h1>
                <p className="text-gray-700 text-center mb-6">At Eventify, we value our users and strive to create the best experience possible. Your feedback helps us improve and bring new features to our platform.</p>

                <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-md">
                    <input 
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                        required>
                    </textarea>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white font-bold p-3 rounded-lg hover:bg-blue-700 transition duration-300">
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
