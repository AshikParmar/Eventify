import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../../redux/slices/userSlice";
// import { Loader2 } from "lucide-react";

const SignupPage = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
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
    <div className="flex items-center min-h-screen p-4 bg-gray-100 justify-center">
        <div className="flex flex-col-reverse overflow-hidden bg-white rounded-md shadow-lg md:flex-row md:flex-1 lg:max-w-screen-md">
            <div className="p-4 py-6 text-white bg-blue-light md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
                <div className="my-3 text-4xl font-bold tracking-wider text-center">
                <a href="#">Eventify</a>
                </div>
                <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
                Welcome to MyApp! Securely manage your digital experience with us.
                </p>
                <p className="flex gap-2 items-center justify-center mt-10 text-center">
                <span>Already Have an Account?</span>
                <Link to='/user/login' className="underline">Log In</Link>
                </p>
                <p className="mt-6 text-sm text-center text-gray-300">
                Read our <a href="#" className="underline">terms</a> and <a href="#" className="underline">conditions</a>
                </p>
            </div>


            <div className="p-5 bg-white md:flex-1">
                <h3 className="my-4 text-2xl font-semibold text-gray-700">Register Your Account</h3>
                <form onSubmit={signupHandler} className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Name</label>
                        <div className="bg-gray-300 w-full rounded-md flex items-center">
                            <input
                            id="name"
                            type="text"
                            name="username"
                            className="w-full p-2 rounded-md outline-none "
                            placeholder="Enter your name"
                            value={input.username}
                            onChange={changeEventHandler}
                            // autocomplete="off"
                            required
                            />
                            <i className="bx bx-user text-gray-700 text-xl mr-3"></i>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</label>
                        <div className="bg-gray-300 w-full rounded-md flex items-center">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                className="w-full p-2 rounded-md outline-none"
                                placeholder="Enter your email"
                                value={input.email}
                                onChange={changeEventHandler}
                                required
                            />
                            <i className="bx bx-envelope text-gray-700 text-xl mr-3"></i> 
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</label>
                        <div className="bg-gray-300 w-full rounded-md flex items-center">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name='password'
                                className="w-full p-2 outline-none rounded-md"
                                placeholder="Enter your password"
                                value={input.password}
                                onChange={changeEventHandler}
                                required
                            />

                            <button
                            type="button"
                            className="mr-3"
                            onClick={() => setShowPassword(!showPassword)}
                            >
                              
                              {showPassword ? <i class="bx bx-lock-open-alt text-gray-700 text-xl"></i>
                                :<i className="bx bx-lock text-gray-700 text-xl"></i>}
                            </button>
                        </div>
                    </div>
                    <div className="my-4">
                        <button type="submit" className="w-full px-4 py-2 text-lg font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">
                            Sign Up
                        </button>
                    </div>
                </form>
                {/* <div className="mt-5 flex flex-col space-y-5">
                    <span className="flex items-center justify-center space-x-2">
                        <span className="h-px bg-gray-400 w-14"></span>
                        <span className="font-normal text-gray-500">or login with</span>
                        <span className="h-px bg-gray-400 w-14"></span>
                    </span>
                    <div className="flex justify-center space-x-6">
                    <a href="#" className="">
                        <img src="https://cdn-icons-png.flaticon.com/512/300/300221.png" alt="Google" className="w-8 h-8" />
                    </a>
                    <a href="#" className="">
                        <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" className="w-8 h-8" />
                    </a>
                    
                    </div>
                </div> */}
            </div>
        </div>
    </div>
  )
};

export default SignupPage
