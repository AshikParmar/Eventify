import React, { useState, useEffect } from "react";
import EventCard from "../../components/EventCard"; 
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../redux/slices/eventSlice";


const Events = () => {

  const { events , loading, error } = useSelector((state)=> state.event);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const dispatch = useDispatch();

  const eventTypes = ["All", ...new Set(events.map(event => event.type))];

  // Filter events based on search and type input
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(search.toLowerCase()) &&
    (filterType === "All" || event.type === filterType)
  );


  useEffect(() => {
    dispatch(fetchEvents());
  }, [])
  

  return (
    <div className="p-8 bg-gray-50 min-h-screen ">
      <h2 className="text-3xl font-bold text-center mb-6">Browse Events</h2>

      <div className="flex flex-row gap-4 justify-center mb-6">
        <input
          type="text"
          placeholder="Search events..."
          className="p-2 border border-gray-300 rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          {eventTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

    
      
        {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-y-6">
                {filteredEvents.map(event => <EventCard key={event._id} event={event} />)}
            </div>
        ) : (
            <div className="min-h-64 flex justify-center items-center">
                <p className="text-gray-600 justify-center">No events found</p>
            </div>
        )}
  
    </div>
  );
};

export default Events;
