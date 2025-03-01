import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
   const{userData}=useContext(AppContext)
   const navigate=useNavigate()
  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center">
      <img
        src={assets.header_img}
        alt=""
        className="w-36 h-36 rounded-full mb-6"
      />
      <h1
        className="flex items-center gap-2 text-xl sm:text-3xl
        font-medium mb-2"
      >
        Hey {userData?userData.name:"Buddy"}!
        <img
          className="w-8
        aspect-square"
          src={assets.hand_wave}
          alt=""
        />
      </h1>
      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
        Welcome to WealthWise
      </h2>
      <p className="mb-8 max-w-md">
        Take Control of Your Finances with WealthWise!
      </p>
      <button onClick={()=>navigate('/DashBoard')}
        className="border border-gray-500 rounded-full px-8 py-2.5
        hover:bg-teal-600 transition-all"
      >
        Get Started
      </button>
    </div>
  );
};

export default Header;
