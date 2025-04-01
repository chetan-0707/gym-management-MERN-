import React from "react";
import Login from "../../components/Login/Login";
import Signup from "../../components/Signup/Signup";
import { Link } from "react-router-dom";
// import Login from "../../Components/Login/login";
// import SignUp from "../../Components/Signup/signUp";

const Home = () => {
  return (
    <div className="w-full h-[100vh]">
      <div className="mx-auto justify-between items-center border-2 border-slate-800 bg-slate-800 text-white p-5 font-semibold text-xl sticky top-0 flex gap-30">
      <Link to={"/"} className="text-2xl font-bold">Welcome To Google Fitness Club</Link>
      <div>
          <ul className="flex space-x-6">
            <li>
              <a href="#about" className="hover:text-gray-400">Service</a>
            </li>
            <Link to={"/about-us"} className="hover:text-gray-400">About</Link>
            <Link to={"/contact-us"} className="hover:text-gray-400">Contact</Link>
          </ul>
        </div>
      </div>

      <div className='w-full bg-cover mt-auto flex justify-center  h-[100%] bg-[url("https://i.pinimg.com/736x/fd/34/f6/fd34f68d144811f2c120560a6e2ff3c4.jpg")]'>
        <div className="w-full lg:flex gap-32">
          <Login />
          <Signup />
        </div>
      </div>
    </div>
  );
};
export default Home;
