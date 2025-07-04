// src/pages/Home.jsx
import React, { useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import abstractDesign from "../assets/abstract-design/abstract-landing-page.png";
import WelcomeSection from "../components/LandingPage/WelcomeSection";
import FeaturesSection from "../components/LandingPage/FeaturesSection";
import FinancialJourneySection from "../components/LandingPage/FinancialJourneySection";
import ProductSection from "../components/HomePage/ProductSection";
import Usecase from "../components/HomePage/Usecase";
import TestimonialsSection from "../components/HomePage/Testimonial";
import { useNavigate } from "react-router";



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
  useEffect(()=>
{
  if(!localStorage.getItem('authToken') )
  {
    navigate('/login');
  }
  if( !localStorage.getItem('authToken2'))
  {
    navigate('/videoPasswordLogin')
  }
})
    return (
        <>
            <br/>
            <Navbar/>
            <WelcomeSection></WelcomeSection>
            <ProductSection></ProductSection>
            <Usecase></Usecase>
            <FeaturesSection></FeaturesSection>
            <TestimonialsSection></TestimonialsSection>
            <FinancialJourneySection></FinancialJourneySection>
            <Footer></Footer>
        </>
    );
};

export default Home;
