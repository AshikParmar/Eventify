import React from "react";
import { useSelector } from "react-redux";
import Loading from "../../ui/Loading";

const UpcomingEvents = () => {

    const { pendingEvents, loading, error } = useSelector((state) => state.event);
    

    if (loading) return <Loading title="Loading events..."/>
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
              <th className="p-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {pendingEvents?.map((event)=>{
              return  <tr key={event._id} className="border-b">
                        <td className="p-3">{event.title}</td>
                        <td className="p-3">{event.date}
                          {!event.isSingleDay && (<span> to {event.endDate}</span>)}
                        </td>
                        <td className="p-3">{event.type}</td>
                        <td className="p-3">{event.price}</td>
                        <td className="p-3 text-right">{event.status}</td>
                      </tr>

            })} 
          </tbody>
        </table>
      </div>
  )
}

export default UpcomingEvents
