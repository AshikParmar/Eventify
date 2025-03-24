import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useGlobalUI } from "./Global/GlobalUIContext";

const SingleEvent = () => {
    const { showSnackbar } = useGlobalUI();
    const { events } = useSelector((state) => state.event);
    const { user } = useSelector((state) => state.user);
    const { id } = useParams();
    const navigate = useNavigate();


    const event = events.find(event => event._id === id);

    const handleEnroll = () => {
        const eventDate = new Date(event.date); 
        const currentDate = new Date();

        // console.log("Event Date:", eventDate);
        // console.log("Current Date:", currentDate);
    
        if (eventDate <= currentDate) {
            showSnackbar("You cannot enroll in past events!", "error");
            return;
        }

        navigate(`/events/${event._id}/ordersummary`);
    
    }

    return (
        <div className={` bg-gray-100 ${user.role === "User" && "min-h-screen p-4 md:p-8"}`}>

            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="inline-flex gap-2 items-center mb-4 px-4 py-2 bg-blue-light text-black font-semibold rounded-md hover:bg-blue-500 transition">
                <IoMdArrowBack className="w-5 h-5" /> Back
            </button>

            {!event ?
                <div className="p-6">Event not found.</div>
                :
                <div className="bg-white md:space-y-0 space-y-4 flex md:flex-row flex-col text-lg shadow-md rounded-lg md:p-6 p-4">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full md:w-[50%] aspect-[5/3] object-cover rounded-md"
                    />

                    <div className=" md:ml-10">
                        <h2 className="text-4xl font-semibold mb-2">{event.title} - <span className=" text-2xl mb-2">{event.type}</span></h2>
                        <p className="text-gray-700 mb-2 ">📅 Date: {event.date}</p>
                        {event.isSingleDay ?
                           ( <p className="text-gray-700 mb-2 ">One Day Event</p>)
                            :
                           ( <p className="text-gray-700 mb-2 ">End Date: {event.endDate}</p>)
                        }
                        <p className="text-gray-700 mb-2">Time: {event.startTime} to {event.endTime}</p>

                        <p className="text-gray-700 mb-2">📍 Venue: {event.venue}</p>
                        <p className="text-gray-700 mb-2">💸 Price: {event.price === "Free" ? "Free" : `${event.price} Rs.`}</p>
                        <p className="text-gray-800 mb-2">🎟️ Remaining Slots: {event.availableSlots}</p>
                        <p className="text-gray-800 mb-2">Description: {event.description}</p>

                        {user.role === "User" &&
                            // <Link to={`/events/${event._id}/ordersummary`}>
                                <button
                                    onClick={handleEnroll}
                                    className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                                >
                                    Enroll
                                </button>
                            // </Link>
                        }
                    </div>

                </div>
            }
        </div>
    );
};

export default SingleEvent;
