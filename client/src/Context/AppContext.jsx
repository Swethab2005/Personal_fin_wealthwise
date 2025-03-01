import React, { createContext, useState } from "react";
import axios from "axios";  // ✅ Import axios
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    axios.defaults.withCredentials=true
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(null); // Default as null or {}
    const getAuthState=async()=>{
        try{
           const{data}=await axios.get(backendUrl+'/api/finance/is-auth')
           if(data.success){

            setIsLoggedin(true)
            getUserData()
           }
        }
        catch (error) {
            toast.error(error.message);
        }
    }
    const getUserData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/data`, { withCredentials: true });

            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(error.message);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            toast.error(error.response?.data?.message || "Failed to fetch user data");
        }
    };

    useEffect(()=>{
        getAuthState();
    },[])

    const value = {  
        backendUrl,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        getUserData
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};
