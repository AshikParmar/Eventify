import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { Menu, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from '../redux/slices/userSlice';
import { useGlobalUI } from './Global/GlobalUIContext';



const Navbar = () => {

  const { showSnackbar, showDialog } = useGlobalUI();
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
    showDialog(
      "Confirm Logout",
      `Are you sure you want to Logout?`,
      async () => {
        try {
          const response = await dispatch(logout());
          // console.log('response: ', response);
          navigate("/login");
          showSnackbar("Logout successfully!", "success");
          // window.location.reload();

        } catch (error) {
          showSnackbar(
            error.message || "Failed to Logout.",
            "error"
          );
        }
      }
    );
    handleMenuClose();
  };

  const handleProfile = () => {
    navigate("/user");
    handleMenuClose();
  }


  const profile = () => {
    return <div>
      <button onClick={handleMenuOpen} className="text-white flex items-center gap-2 hover:text-blue-500 transition duration-300">
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

          <circle cx="12" cy="12" r="11" stroke="white" />
          <circle cx="12" cy="8" r="3" />
          <path d="M8 16c2-3 6-3 8 0" />

        </svg>


      </button>
      <Menu
        className=""
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        {user.role === "User" && <MenuItem onClick={handleProfile}>Profile</MenuItem>}

        <MenuItem onClick={handleLogout}>
          {/* <LogoutIcon /> */}
          <p className="">Logout</p>
        </MenuItem>
      </Menu>
    </div>
  }

  return (
    <div className='bg-blue sticky top-0 z-999 flex items-center justify-between py-5 px-3 sm:px-10 text-white border-b-2 border-gray-800'>
      <Link to="/">
        <h2 className='font-bold text-2xl'>Eventify</h2>
      </Link>
      {
        user?.role === "Admin" ?
          (<div className='flex gap-2'>
            <p>Wellcome, Admin</p>
            {profile()}
          </div>)
          :
          (<ul className="flex list-none gap-2 text-lg">
            {user ? (
              <>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `hover:text-blue-500 transition duration-300 px-2 ${isActive ? "border-b-3 border-blue-500 font-semibold" : ""
                    }`
                  }
                >
                  Home
                </NavLink>

                <NavLink
                  to="/events"
                  className={({ isActive }) =>
                    `hover:text-blue-500 transition duration-300 px-2 ${isActive ? "border-b-3 border-blue-500 font-semibold" : ""
                    }`
                  }
                >
                  Events
                </NavLink>

                <NavLink
                  to="/calendar"
                  className={({ isActive }) =>
                    `hover:text-blue-500 transition duration-300 px-2 ${isActive ? "border-b-3 border-blue-500 font-semibold" : ""
                    }`
                  }
                >
                  Calendar
                </NavLink>

                {profile()}
              </>
            ) : (
              <>
                <NavLink
                  to="/about-us"
                  className="hover:text-blue-500 transition duration-300 px-2"
                >
                  About Us
                </NavLink>

                <NavLink
                  to="/contact-us"
                  className="hover:text-blue-500 transition duration-300 px-2"
                >
                  Contact Us
                </NavLink>

                <NavLink
                  to="/login"
                  className="hover:text-blue-500 transition duration-300 px-2"
                >
                  LogIn
                </NavLink>
              </>
            )}
          </ul>
          )
      }
    </div>
  )
}
// 
// 

export default Navbar
