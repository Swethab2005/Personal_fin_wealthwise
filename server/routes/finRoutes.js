import express from 'express'
import { isAuthenticated, login, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail } from "../controllers/fincontroller.js";
import { register } from '../controllers/fincontroller.js';
import { logout } from "../controllers/fincontroller.js";

import userAuth from '../Middleware/finmid.js';

const finRouter=express.Router();


finRouter.post('/register',register);
finRouter.post('/login',login);
finRouter.post('/logout',logout);
finRouter.post('/send-verify-otp',userAuth, sendVerifyOtp);
finRouter.post('/verify-account',userAuth,verifyEmail);
finRouter.get('/is-auth',userAuth,isAuthenticated);
finRouter.post('/send-reset-otp',sendResetOtp);
finRouter.post('/reset-password',resetPassword);
export default finRouter;
