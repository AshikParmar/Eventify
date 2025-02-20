import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-blue sticky top-0 flex items-center justify-between py-5 px-3 sm:px-10 text-white'>
      <h2 className='font-bold text-2xl'>Eventify</h2>
      <ul className='flex list-none gap-2 sm:gap-5 text-lg'>
        <li><NavLink to="/">Home</NavLink></li>
        <NavLink to="/events">Events</NavLink>
        <NavLink to="/user/login">LogIn</NavLink>
      </ul>
    </div>
  )
}
// 
// 

export default Navbar
