// src/pages/Home.jsx
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// progress bar + toasts
import LoadingBar from "react-top-loading-bar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// your components & assets
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import abstractDesign from "../assets/abstract-design/abstract-landing-page.png";
import WelcomeSection from "../components/LandingPage/WelcomeSection";
import FeaturesSection from "../components/LandingPage/FeaturesSection";
import FinancialJourneySection from "../components/LandingPage/FinancialJourneySection";
import ProductSection from "../components/HomePage/ProductSection";
import Usecase from "../components/HomePage/Usecase";
import TestimonialsSection from "../components/HomePage/Testimonial";

const AbstractImage = styled.div`
  background: url(${abstractDesign}) top left no-repeat;
  width: 100%;
  height: 280px;
  background-size: contain;
  position: absolute;
  top: -10px;
  left: -10px;
  z-index: 0;
`;

const Home = () => {
  const navigate = useNavigate();
  const loadingRef = useRef(null);

  useEffect(() => {
    // start the bar on mount
    loadingRef.current.continuousStart();

    // small delay to simulate "load" before checking tokens
    const timer = setTimeout(() => {
      // complete the loading bar
      loadingRef.current.complete();

      // check first auth token
      if (!localStorage.getItem("authToken")) {
        toast.error("Please login to continue");
        return navigate("/login");
      }

      // check video‐password token
      if (!localStorage.getItem("authToken2")) {
        toast.info("Please enter your video password");
        return navigate("/videoPasswordLogin");
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      {/* Top loading bar */}
      <LoadingBar color="#29d" height={3} ref={loadingRef} />

      {/* Toast container (position, autoClose, etc.) */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />

      {/* Your existing page layout */}
      <br />
      <Navbar />
      <AbstractImage />
      <WelcomeSection />
      <ProductSection />
      <Usecase />
      <FeaturesSection />
      <TestimonialsSection />
      <FinancialJourneySection />
      <Footer />
    </>
  );
};

export default Home;