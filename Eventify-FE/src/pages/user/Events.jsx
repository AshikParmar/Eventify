import React, { useState } from "react";
import EventCard from "../../components/EventCard"; 

// Sample Events Data
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
  },
  { 
    id: 3, 
    title: "Startup Meetup", 
    date: "May 10, 2025", 
    location: "San Francisco", 
    type: "Business", 
    price: "$30", 
    description: "Networking and discussion for startup founders.", 
    image: {} 
  },
  { 
    id: 4, 
    title: "AI Summit", 
    date: "June 5, 2025", 
    location: "New York", 
    type: "Technology", 
    price: "Free", 
    description: "AI innovations and research discussions.", 
    image: "https://via.placeholder.com/300" 
  },
  { 
    id: 5, 
    title: "National Football Championship", 
    date: "July 15, 2025", 
    location: "Chicago", 
    type: "Sports", 
    price: "$100", 
    description: "Witness the top football teams compete!", 
    image: "" 
  },
];

const Events = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");

  const eventTypes = ["All", ...new Set(eventsData.map(event => event.type))];

  // Filter events based on search and type input
  const filteredEvents = eventsData.filter(event =>
    event.title.toLowerCase().includes(search.toLowerCase()) &&
    (filterType === "All" || event.type === filterType)
  );


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
                {filteredEvents.map(event => <EventCard key={event.id} event={event} />)}
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
