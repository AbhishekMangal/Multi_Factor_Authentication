import React, { useContext, useState } from 'react'
import backgroundImage from "../assets/abstract-design/background.png";
import abstractImage from "../assets/abstract-design/abstract.png";

import styled from "styled-components";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router';
import userContext from '../Context/userContext';



const OtpPage = () => {
  const {checkOtp} = useContext(userContext)
  
  const [values,setValues] = useState({otp: ""})
   const handleChange = (e)=>
   {
     setValues({...values , [e.target.id]: e.target.value});
   }
    const handleSubmit = (e)=>
    {
      e.preventDefault();
      checkOtp(values.otp)
    }
  return (
    <div>
      <>
    <Container className="flex flex-col">
    <div className="mt-5 mx-auto w-[85%]">
    <Navbar />
    </div>

        <Box>
          <BackgroundOverlay />
          <AbstractOverlay />
          <ContentWrapper>
            <Title>Enter OTP to Reset Your Password</Title>
            
            <Form>
              <Input type="text" id="otp" placeholder="Enter OTP"  value={values.otp} onChange={handleChange}/>
              <Button type="submit" className='mb-2' onClick={handleSubmit} >submit</Button>
              {/* <Link onClick={handleResend} className="inline-block text-caff33  border-caff33 px-4 py-2 font-inherit transition-opacity duration-300 ease-in-out hover:opacity-70"> */}
                {/* <u> Resend OTP </u> */}
                {/* </Link> */}
            </Form>
          </ContentWrapper>
        </Box>
      <Footer/>
      </Container>
      </>
    </div>
  )
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #101010; /* overall page background */
  height:110vh;
  
  `
  ;

const Box = styled.div`
  position: relative;
  font-family: 'Lexend', sans-serif;
  width: 100%;
  height: 350px;
  max-width: 600px;
  padding: 1.5rem 2rem;
  border: 1px solid #262626; /* 1px stroke */
  border-radius: 8px;
  overflow: hidden;
  margin: auto;
  background-color: #1c1c1c; /* solid background color */
`;

// Background overlay: covers the box with the background image at 30% opacity.
const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${backgroundImage}) center/cover no-repeat;
  opacity: 1;
  z-index: 1;
`;

// Abstract design overlay: positioned at top right with 30% opacity.
const AbstractOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;  /* adjust width as needed */
  height: 200px; /* adjust height as needed */
  background: url(${abstractImage}) center/contain no-repeat;
  opacity: 1;
  z-index: 2;
`;

// Content that appears above the overlays
const ContentWrapper = styled.div`
  position: relative;
  z-index: 3;
  text-align: center;
  color: white;

`;

const Title = styled.h2`
  color: #CAFF33;
  font: inherit;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #BFBFBF;
  font: inherit;
  font-size: 0.8rem;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const Input = styled.input`
  width: 75%;
  font: inherit;
  max-width: 500px;
  padding: 0.75rem 0.75rem 0.75rem 1rem;
  border-radius: 20px;
  border: 1px solid #333;
  background-color: #222;
  color: #fff;
  margin-bottom: 1.5rem;
`;

const Button = styled.button`
  width: 20rem;
  background-color: #CAFF33;
  color: #1c1c1c;
  font:inherit;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #1c1c1c;
    color: #CAFF33;
    border: 1px solid #CAFF33;
  }
`;

export default OtpPage
