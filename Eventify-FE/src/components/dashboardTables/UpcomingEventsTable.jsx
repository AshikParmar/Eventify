import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEvents } from "../../redux/slices/eventSlice";

const UpcomingEvents = () => {

    const { ucEvents, loading, error } = useSelector((state) => state.event);
    

    if (loading) return <p>Loading events...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Recent Events</h3>
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Date</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="w-5 p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {ucEvents.map((event)=>{
              return  <tr key={event._id} className="border-b">
                        <td className="p-3">{event.title}</td>
                        <td className="p-3">{event.date}</td>
                        <td className="p-3">{event.type}</td>
                        <td className="p-3">{event.price}</td>
                        <td className="p-3">{event.status}</td>
                      </tr>

            })} 
          </tbody>
        </table>
      </div>
  )
}

export default UpcomingEvents
