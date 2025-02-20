import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// Sample Data (Ideally, fetch this from the backend or global state)
const eventsData = [
  { 
    id: 1, 
    title: "Tech Conference 2025", 
    date: "March 15, 2025", 
    location: "New York", 
    type: "Technology", 
    price: "Free", 
    description: "An exclusive conference for tech enthusiasts.", 
    image: "https://via.placeholder.com/300" 
  },
  { 
    id: 2, 
    title: "Music Festival", 
    date: "April 20, 2025", 
    location: "Los Angeles", 
    type: "Cultural", 
    price: "$50", 
    description: "A grand music festival featuring top artists.", 
    image: "https://via.placeholder.com/300" 
  }
];

const SingleEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

 
  const event = eventsData.find(event => event.id === parseInt(id));


  return (
    <div className="p-8 bg-gray-50 min-h-screen">
     
        <button 
            onClick={() => navigate(-1)} 
            className="bg-blue-light hover:bg-blue-500 font-semibold  px-4 py-2 rounded-md mb-4">
            ← Go Back
        </button>
     
        {!event ? 
            <div className="p-6">Event not found.</div>
            :
            <div className="bg-white shadow-md rounded-lg p-6">
                <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-60 object-cover rounded-md mb-4" 
                />
                <h2 className="text-3xl font-bold mb-2">{event.title}</h2>
                <p className="font-semibold text-xl mb-2">{event.type}</p>
                <p className="text-gray-600 mb-2">📅 Date: {event.date}</p>
                <p className="text-gray-600 mb-2">📍 vanue: {event.location}</p>
                <p className="text-gray-600 mb-2">💰 Price: {event.price}</p>
                <p className="text-gray-800 mb-4">{event.description}</p>
                
                
                <button 
                    className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                    onClick={() => alert(`Enrolled in ${event.title}`)}
                >
                    Enroll
                </button>
            </div>
        }
    </div>
  );
};

export default SingleEvent;
