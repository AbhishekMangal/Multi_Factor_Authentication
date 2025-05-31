// src/App.jsx
import React, { useRef, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import LoadingBar from "react-top-loading-bar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// your pages
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import About from "./Pages/About";
import Security from "./Pages/Security";
import Login from "./Pages/Login";
import Forgot from "./Pages/Forgot";
import Signup from "./Pages/Signup";
import VideoPassword from "./Pages/videoPasswordLogin";
import VideoPasswordSetup from "./Pages/VideoPasswordSetup";
import VideoPasswordReset from "./Pages/VideoPasswordReset";
import OtpPage from "./Pages/OtpPage";

// context & redux
import UserState from "./Context/userState";
import { Provider } from "react-redux";
import { store } from "./App/store";

// -------------------
// NEW: Routes + Loading + Toast wrapper
// -------------------
const MyRoutes = () => {
  const loadingRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // start bar on every route change
    loadingRef.current.continuousStart();

    // complete after your "loading" is done (adjust timeout or hook into real data fetch)
    const t = setTimeout(() => loadingRef.current.complete(), 300);

    return () => clearTimeout(t);
  }, [location]);

  return (
    <>
      {/* Top loading bar: color & height customizable */}
      <LoadingBar color="#29d" height={3} ref={loadingRef} />

      {/* Toast container: configure position, autoClose, etc. */}
      

      {/* Your existing routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Security" element={<Security />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Forgot-password" element={<Forgot />} />
        <Route path="/videoPasswordLogin" element={<VideoPassword />} />
        <Route path="/videoPasswordSetup" element={<VideoPasswordSetup />} />
        <Route path="/videoPasswordReset" element={<VideoPasswordReset />} />
        <Route path="/OtpPage" element={<OtpPage />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <div style={{ backgroundColor: "#101010", minHeight: "100vh" }}>
      <BrowserRouter>
        <Provider store={store}>
          <UserState>
            {/* just swap your old <Routes> for <MyRoutes> */}
            <MyRoutes />
          </UserState>
        </Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;