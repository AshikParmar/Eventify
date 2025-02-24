import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from '../../redux/slices/userSlice';

const LogIn = () => {
    const [input, setInput] = useState({
      email: "",
      password: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const changeEventHandler = (e) => {
      setInput({ ...input, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
      // debugger;
      e.preventDefault();
      if (!input.email || !input.password) {
        toast.error("All fields are required!");
        return;
      }
      
      try{ 
        const res = await dispatch(loginUser(input));
        if (res.payload.success) {
          navigate("/");
          toast.success(res.payload.message);
          setInput({
            username: "",
            email: "",
            password: "",
          });
          let data = res.payload.user
          console.log('data: ', data);
        }else{
          console.log(res.payload.message); 
          toast.error(res.payload.message);
        }
      }
      catch(e) {
        console.error("internal error ", e.message);
      }

    };
  
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-[90%] sm:w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                placeholder="Enter your email"
                value={input.email}
                onChange={changeEventHandler}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                name='password'
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                placeholder="Enter your password"
                value={input.password}
                onChange={changeEventHandler}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Login
            </button>
          </form>
          <p className='text-center mt-5'>New Here, <Link to='/user/signup' className='text-blue-700  hover:text-blue-800'>SignUp</Link>
          </p>
        </div>
      </div>
    );
  };


export default LogIn
