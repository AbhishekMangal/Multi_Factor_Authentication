// src/Context/userState.jsx
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../Features/User/userSlice';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import userContext from './userContext';

// NEW imports for loading bar + toasts
import LoadingBar from 'react-top-loading-bar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserState = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ref for controlling the top loading bar
  const loadingRef = useRef(null);

  const login = async (email, password, videoPassword) => {
    loadingRef.current.continuousStart();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
        videoPassword,
      });

      if (data.success) {
        localStorage.setItem('authToken', data.authToken);
        dispatch(setUser(data.user));
        toast.success("Login successful!");
        navigate('/videoPasswordLogin');
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Error during login", err);
      toast.error("Network error, please try again");
    } finally {
      loadingRef.current.complete();
    }
  };

  const register = async (username, email, password) => {
    loadingRef.current.continuousStart();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem('authToken', data.authToken);
        dispatch(setUser(data.user));
        toast.success("Registration successful!");
        navigate('/videoPasswordSetup');
      } else {
        toast.error(data.error || "Signup failed");
      }
    } catch (err) {
      console.error("Error during register", err);
      toast.error("Network error, please try again");
    } finally {
      loadingRef.current.complete();
    }
  };

  const getUser = async () => {
    loadingRef.current.continuousStart();
    try {
      const { data } = await axios.get("http://localhost:5000/api/auth/getUser", {
        headers: { "auth-token": localStorage.getItem('authToken') },
      });
      dispatch(setUser(data.User));
      // toast.info("User data loaded");
    } catch (err) {
      console.error("Error fetching user", err);
      toast.error("Could not fetch user data");
    } finally {
      loadingRef.current.complete();
    }
  };

  const otpSender = async (email) => {
    loadingRef.current.continuousStart();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/otp-sender",
        { email }
      );
      if (data.success) {
        toast.info("OTP sent! Check your email.");
        navigate('/OtpPage');
      } else {
        toast.error(data.error || "Failed to send OTP");
      }
    } catch (err) {
      console.error("Error sending OTP", err);
      toast.error("Network error, please try again");
    } finally {
      loadingRef.current.complete();
    }
  };

  const checkOtp = async (otp) => {
    loadingRef.current.continuousStart();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/otp-verify",
        { otp }
      );
      if (data.success) {
        dispatch(setUser(data.User));
        toast.success("OTP verified!");
        navigate('/videoPasswordReset');
      } else {
        toast.error("Invalid OTP, try again");
        navigate('/videoPasswordReset');
      }
    } catch (err) {
      console.error("Error verifying OTP", err);
      toast.error("Network error, please try again");
    } finally {
      loadingRef.current.complete();
    }
  };

  const videoLogin = async (password) => {
    loadingRef.current.continuousStart();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/videoPassword/verify",
        { password },
        { headers: { 'auth-token': localStorage.getItem('authToken') } }
      );
      if (res.data.success) {
        toast.success("Video password accepted!");
      } else {
        toast.error("Incorrect video password");
      }
      return res;
    } catch (err) {
      console.error("Error during video login", err);
      toast.error("Network error, please try again");
      throw err;
    } finally {
      loadingRef.current.complete();
    }
  };

  return (
    <>
      {/* Top-loading bar */}
      <LoadingBar color="#29d" height={3} ref={loadingRef} />

      {/* Toast container: only one needed here */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />

      <userContext.Provider
        value={{ login, register, getUser, otpSender, checkOtp, videoLogin }}
      >
        {props.children}
      </userContext.Provider>
    </>
  );
};

export default UserState;