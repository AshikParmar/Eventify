import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { Menu, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from '../redux/slices/userSlice';



const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user);
  // console.log(user);
  
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleLogout = async () => {
    try {
      const response = await dispatch(logout());
      // console.log('response: ', response);
   
      navigate("/user/login");
      window.location.reload();

    } catch (e) {
      console.error("Logout error: ", e.message);
    }
    handleMenuClose();
  };


  const profile = () => {
    return <div>
      <button onClick={handleMenuOpen} className="text-white flex items-center gap-2">
              <label > {user?.username} </label>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  >

                  <circle cx="12" cy="12" r="11" stroke="white"/>
                  <circle cx="12" cy="8" r="3"/>
                  <path d="M8 16c2-3 6-3 8 0"/>
              
                </svg>


              </button>
              <Menu
                className=""
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
              >
                <MenuItem className="">Profile</MenuItem>

                <MenuItem onClick={handleLogout}>
                  {/* <LogoutIcon /> */}
                  <p className="">Logout</p>
                </MenuItem>
              </Menu>
    </div>
  }

  return (
    <div className='bg-blue sticky top-0 z-999 flex items-center justify-between py-5 px-3 sm:px-10 text-white'>
      <h2 className='font-bold text-2xl'>Eventify</h2>
      {
        user?.role === "Admin" ? 
        <div className='flex gap-2'>
          <p>Wellcome, Admin</p>
          {profile()}
        </div>
        :
        <ul className='flex list-none gap-2 sm:gap-5 text-lg'>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/events">Events</NavLink>
        
          { user ?
            profile()
          :<NavLink to="/user/login">LogIn</NavLink>}
        </ul>
       }
    </div>
  )
}
// 
// 

export default Navbar
