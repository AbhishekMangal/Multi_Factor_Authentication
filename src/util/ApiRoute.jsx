// src/services/api.js

import axios from "axios";
import { useNavigate } from "react-router";

const API_BASE_URL =  'https://multi-factor-authentication-5um0.onrender.com/api';


const apiCall = async (endpoint, method, data = null) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('authToken')
    };

    const config = {
      method,
      headers,
      ...(data && { body: JSON.stringify(data) })
    };

    const response = await fetch(`${API_BASE_URL}/videoPassword${endpoint}`, config);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'API call failed');
    }

    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Create new video password
export const createVideoPassword = async (passwordData) => {
  return apiCall('/create', 'POST', {
    password: passwordData.password,
  });
};

// Verify video password
export const verifyVideoPassword = async (passwordData) => {
  return apiCall('/verify', 'POST', {
    password: passwordData.password,
  });
};

export const updateVideoPassword = async (newPassword) => {
  try {
    const data = await axios.put("https://multi-factor-authentication-5um0.onrender.com/api/videoPassword/update", {
      newPassword,
      header: {
        "auth-token":localStorage.getItem('authToken'),               
      },
    });
   
  } catch (error) {
    console.error("Error during login", error);
  }
};


// Example usage with error handling
export const handleVideoPasswordOperation = async (operation, data) => {
  try {
    let result;
    switch (operation) {
      case 'create':
        result = await createVideoPassword(data);
        break;
      case 'verify':
        result = await verifyVideoPassword(data);
        break;
      case 'update':
        result = await updateVideoPassword(data);
        break;
      default:
        throw new Error('Invalid operation');
    }
    return result;
  } catch (error) {
    // Handle specific error types
    if (error.message.includes('401')) {
      throw new Error('Authentication failed. Please login again.');
    }
    if (error.message.includes('404')) {
      throw new Error('Video password not found.');
    }
    throw error;
  }
};