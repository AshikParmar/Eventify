import React from 'react'
import { Link } from 'react-router-dom'

const EventCard = ({ event }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-80 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <div className="overflow-hidden rounded-md">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-40 object-cover rounded-md transition-transform duration-300 hover:scale-110"
        />
      </div>

      <h3 className="text-lg font-bold mt-3 text-indigo-700">{event.title}</h3>
      <p className="text-gray-600">📅 {event.date}</p>
      <p className="text-gray-600">📍 {event.venue}</p>

      <Link to={`/events/${event._id}`}>
        <button className="mt-3 px-4 py-2 bg-indigo-700 text-white rounded-md w-full transition-all duration-300 hover:bg-indigo-800 hover:shadow-md active:scale-95">
          View Details
        </button>
      </Link>
    </div>
  )
}

export default EventCard
