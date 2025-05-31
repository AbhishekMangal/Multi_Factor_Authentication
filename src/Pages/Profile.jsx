// src/pages/Profile.jsx
import React, { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileContent from "../components/ProfilePage/ProfileContent";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import userContext from "../Context/userContext";

const Profile = () => {
    const navigate = useNavigate();
    const {getUser} = useContext(userContext)
    useEffect(()=>
    {
        if(!localStorage.getItem('authToken') || !localStorage.getItem('authToken2'))
        {
            navigate('/Login')
        }
        else
        {
            getUser();
        }
    },[localStorage.getItem('authToken')])
    return (
        <>
            <br/>
            <Navbar></Navbar>
            <ProfileContent></ProfileContent>
            <Footer></Footer>
        </>
    );
};

export default Profile;
