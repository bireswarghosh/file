import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1'; // Change to your backend URL

// Get all ambulances
export const getAllAmbulances = async () => {
  try {
    const response = await axios.get(`${API_URL}/ambulance`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get ambulance by ID
export const getAmbulanceById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/ambulance/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create new ambulance
export const createAmbulance = async (ambulanceData) => {
  try {
    const formData = new FormData();
    formData.append('name', ambulanceData.name);
    
    if (ambulanceData.logo) {
      formData.append('logo', ambulanceData.logo);
    }
    
    const response = await axios.post(`${API_URL}/ambulance`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update ambulance
export const updateAmbulance = async (id, ambulanceData) => {
  try {
    const formData = new FormData();
    formData.append('name', ambulanceData.name);
    
    if (ambulanceData.logo) {
      formData.append('logo', ambulanceData.logo);
    }
    
    const response = await axios.put(`${API_URL}/ambulance/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete ambulance
export const deleteAmbulance = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/ambulance/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};