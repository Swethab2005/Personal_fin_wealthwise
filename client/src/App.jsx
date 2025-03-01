import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Everify from './pages/Everify';
import Welcome from './pages/Welcome';
import SignIn from './pages/SignIn';
import ResetPassword from './pages/ResetPassword';
import { ToastContainer, toast } from 'react-toastify';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';


  
const App = () => {
  return (
    <div>
     < ToastContainer/>
       <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='/login' element={<SignIn />} />
      <Route path='/resetpass' element={<ResetPassword />} />
      <Route path='/EmailVerify' element={<Everify />} />
      <Route path='/DashBoard' element={<Dashboard/>}/>
      <Route path='/transaction' element={<Transactions/>}/>
    </Routes>
    </div>
    
  );
};

export default App;
