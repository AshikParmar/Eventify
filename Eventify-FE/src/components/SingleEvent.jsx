import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const SingleEvent = () => {
  const { events } = useSelector((state)=> state.event);
  const { id } = useParams();
  const navigate = useNavigate();

 
  const event = events.find(event => event._id === id );


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
            <div className="bg-white flex text-lg shadow-md rounded-lg p-6">
                <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-[50%] h-[450px] object-cover rounded-md" 
                />

                <div className=" ml-10">
                    <div className="flex gap-3 items-end">
                        <h2 className="text-4xl font-semibold mb-2">{event.title} -</h2>
                        <p className=" text-2xl mb-2"> {event.type}</p>

                    </div>
                  <p className="text-gray-700 mb-2 ">📅 Date: {event.date}</p>
                  <p className="text-gray-700 mb-2 ml-8">Time: {event.startTime} to {event.endTime}</p>

                  <p className="text-gray-700 mb-2">📍 venue: {event.venue}</p>
                  <p className="text-gray-700 mb-2">💲 Price: {event.price}</p>
                  <p className="text-gray-800 mb-2">Remaining Slots: {event.availableSlots}</p>
                  <p className="text-gray-800 mb-2">{event.description}</p>
                  
                  
                  <button 
                      className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                      onClick={() => alert(`Enrolled in ${event.title}`)}
                  >
                      Enroll
                  </button>
                </div>
                
            </div>
        }
    </div>
  );
};

export default SingleEvent;
