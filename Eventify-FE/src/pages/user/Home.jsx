import React from 'react'
import EventCard from '../../components/EventCard';
import { Link } from 'react-router-dom';
import event01 from "../../assets/event01.png"


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
    image: {event01} 
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
];


const Home = () => {
  return (
    <div>
        <section className="bg-cover bg-center h-screen"
          style={{ backgroundImage: `url(${event01})` }}
        
        >
            <div className=" flex flex-col items-center  justify-center h-full p-3 opacity-100">
                <h1 className="text-4xl font-semibold text-white mb-12 text-border">Catch the Latest Events Before They're Gone!</h1>
                <Link to='/events'>
                  <button className="bg-blue-600 text-white shadow-lg shadow-gray-500 px-6 py-2 rounded-lg hover:bg-blue-700">Explore Events</button>
                </Link>
            </div>
        </section>

        <div className="p-8 bg-gray-200  ">
          <h2 className='text-2xl font-semibold text-blue mb-10'>Exciting Events Ahead...</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-y-6">
                  {eventsData.map(event => <EventCard key={event.id} event={event} />)}
          </div>
        </div>
    </div>
  )
}

export default Home
