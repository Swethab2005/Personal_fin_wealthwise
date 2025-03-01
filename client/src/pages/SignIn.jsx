import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const SignIn = () => {
    const navigate = useNavigate();
    const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);

    const [state, setState] = useState("Sign Up");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Debugging log: Check context values
    console.log("Backend URL from context:", backendUrl);

    const onSubitHandler = async (e) => {
        e.preventDefault(); 
        
        console.log("Form Submitted - State:", state);
        console.log("User Input:", { name, email, password });

        try {
            axios.defaults.withCredentials = true; // Ensure this is set globally
            
            let url = "";
            let payload = {};
            
            if (state === "Sign Up") {
                url = `${backendUrl}/api/finance/register`;
                payload = { name, email, password };
            } else {
                url = `${backendUrl}/api/finance/login`;
                payload = { email, password };
            }

            console.log("Sending API Request to:", url);
            console.log("Payload:", payload);

            const { data } = await axios.post(url, payload, { withCredentials: true });

            console.log("API Response:", data);

            if (data.success) {
                setIsLoggedin(true);
                getUserData();
                navigate("/");
            } else {
                console.error("API Error:", data.message);
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Axios Error:", error);
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
            <img
                onClick={() => navigate("/")}
                src={assets.logo}
                alt="Logo"
                className="absolute left-5 sm:left-20 top-5 w-32 sm:w-36 cursor-pointer"
            />
            <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
                <h2 className="text-3xl font-semibold text-white text-center mb-3">
                    {state === "Sign Up" ? "Create Account" : "Login"}
                </h2>
                <p className="text-center text-sm mb-6">
                    {state === "Sign Up" ? "Create your account" : "Login to Your account!"}
                </p>
                <form onSubmit={onSubitHandler}>
                    {state === "Sign Up" && (
                        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                            <img src={assets.person_icon} alt="" />
                            <input
                                onChange={(e) => {
                                    setName(e.target.value);
                                    console.log("Name:", e.target.value);
                                }}
                                value={name}
                                className="bg-transparent outline-none"
                                type="text"
                                placeholder="Full Name"
                                required
                            />
                        </div>
                    )}
                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                        <img src={assets.mail_icon} alt="" />
                        <input
                            onChange={(e) => {
                                setEmail(e.target.value);
                                console.log("Email:", e.target.value);
                            }}
                            value={email}
                            className="bg-transparent outline-none"
                            type="email"
                            placeholder="Email id"
                            required
                        />
                    </div>
                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                        <img src={assets.lock_icon} alt="" />
                        <input
                            onChange={(e) => {
                                setPassword(e.target.value);
                                console.log("Password:", e.target.value);
                            }}
                            value={password}
                            className="bg-transparent outline-none"
                            type="password"
                            placeholder="Password"
                            required
                        />
                    </div>
                    {state === "Login" && (
                        <p onClick={() => navigate("/resetpass")} className="mb-4 text-indigo-500 cursor-pointer">
                            Forgot password?
                        </p>
                    )}
                    <button type="submit" className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">
                        {state}
                    </button>
                </form>
                {state === "Sign Up" ? (
                    <p className="text-gray-400 text-center text-xs mt-4">
                        Already have an account?{" "}
                        <span onClick={() => {
                            setState("Login");
                            console.log("Switched to Login");
                        }} className="text-blue-400 cursor-pointer underline">
                            Login here
                        </span>
                    </p>
                ) : (
                    <p className="text-gray-400 text-center text-xs mt-4">
                        Don't have an account?{" "}
                        <span onClick={() => {
                            setState("Sign Up");
                            console.log("Switched to Sign Up");
                        }} className="text-blue-400 cursor-pointer underline">
                            Sign Up
                        </span>
                    </p>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignIn;
