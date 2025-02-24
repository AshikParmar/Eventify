import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../../redux/slices/userSlice";
// import { Loader2 } from "lucide-react";

const SignUp = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    if (!input.username || !input.email || !input.password) {
      toast.error("All fields are required!");
      return;
    }

      try{  
      const res = await dispatch(signupUser(input));

      if (res.payload.success) {
        navigate("/user/login");
        toast.success(res.payload.message);
        setInput({
          username: "",
          email: "",
          password: "",
        });
      }
      else{
        console.log(error); 
        toast.error(error.response.payload.message);
      };
    }
    catch(e) {
      console.error("internal error ", e.message);
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[90%] sm:w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">SignUp</h2>
        <form onSubmit={signupHandler}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              type="text"
              name="username"
              className="w-full mt-2 p-2 rounded-md"
              placeholder="Enter your name"
              value={input.username}
              onChange={changeEventHandler}
              required
            > </input>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              name="email"              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
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
              name="password"
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
            Sign Up
          </button>
        </form>
        <p className='text-center mt-5'>Already Have an Account, <Link to='/user/login' className='text-blue-700  hover:text-blue-900'>LogIn</Link>
        </p>
      </div>
    </div>
  )
};

export default SignUp
