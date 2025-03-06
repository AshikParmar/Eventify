import React, { useEffect } from 'react'
import EventCard from '../../components/EventCard';
import { Link } from 'react-router-dom';
import hero from "../../assets/hero.png"
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../redux/slices/eventSlice';


const Home = () => {
  const { pendingEvents , loading, error } = useSelector((state)=> state.event);
  const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchEvents());
    }, [])
    
    const events = pendingEvents.slice(0,4);

  return (
    <div>
        <section className="bg-cover bg-center h-screen"
          style={{ backgroundImage: `url(${hero})` }}
        
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
                  {events.map(event => <EventCard key={event._id} event={event} />)}
          </div>
        </div>
    </div>
  )
}

export default Home
