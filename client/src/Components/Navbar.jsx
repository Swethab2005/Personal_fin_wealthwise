import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
const Navbar = () => {
    const navigate = useNavigate();
    const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContext);
    const logout=async()=>{
      try{
        axios.defaults.withCredentials=true
        const{data}=await axios.post(backendUrl+'/api/finance/logout')
        data.success && setIsLoggedin(false)
        data.success && setUserData(false)
        navigate('/')
      }catch(error){
        toast.error(error.message)
      }
    }
    const sendVerificationOtp=async()=>{
      try{
        axios.defaults.withCredentials=true;
        const{data}=await axios.post(backendUrl +'/api/finance/send-verify-otp')
        if(data.success){
          navigate('/EmailVerify')
          toast.success(data.message)
        }
        else{
          toast.error(data.message)
        }
      }
      catch(error){
        toast.error(error.message)
      }
    }
    return (
        <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>

            <img src={assets.logo} alt="Logo" className='w-55 sm:w-48 md:w-43' />

            {userData ? (
              <div className='w-8 h-8 flex justify-center items-center rounded-full
              bg-black text-white relative group'>
              {userData.name[0].toUpperCase()}
                  <div className='absolute hidden group-hover:block top-0 right-0
                  z-10 text-black rounded pt-10'>
                    <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
                      {!userData.isAccountVerified && 
                       <li onClick={sendVerificationOtp} className='py-1 px-2 hover:bg-gray-200'>Verify email</li>}
                     
                      <li onClick={logout} className='py-1 px-2 hover:bg-gray-200 pr-10'>Logout</li>
                    </ul>
                  </div>
                </div> 
            ) : (
                <button onClick={() => navigate('/login')}
                    className='flex items-center gap-2 border border-gray-500
                    rounded-full px-6 py-2 text-white hover:bg-teal-600
                    transition-all'>
                    Login 
                    <img src={assets.arrow_icon} alt="Arrow Icon" />
                </button>
            )}

        </div>
    )
}

export default Navbar;
