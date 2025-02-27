import React from 'react'
import { Link, useParams } from 'react-router-dom'

const EventCard = (props) => {
  const event = props.event;
  return (
    <div className="bg-white space-y-1 shadow-md rounded-lg p-4 w-80">
        <img src={event.image} alt={event.title} className="w-full h-40 object-cover rounded-md" />
        <h3 className="text-lg font-bold mt-2 text-indigo-700">{event.title}</h3>
        <p className="text-gray-600">📅 {event.date}</p>
        <p className="text-gray-600">📍 {event.venue}</p>
        <Link to={`/events/${event._id}`}>
          <button className="mt-2 px-4 py-2 bg-indigo-700 text-white rounded-md w-full hover:bg-indigo-800">View Details</button>
        </Link>
    </div>
  )
}

export default EventCard
