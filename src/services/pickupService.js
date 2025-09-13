import axiosInstance from '../axiosInstance';

// Get all pickup requests
export const getAllPickupRequests = async () => {
  try {
    const response = await axiosInstance.get('/pickup');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get pickup request by ID
export const getPickupRequestById = async (id) => {
  try {
    const response = await axiosInstance.get(`/pickup/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create new pickup request
export const createPickupRequest = async (pickupData) => {
  try {
    const response = await axiosInstance.post('/pickup', pickupData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update pickup request
export const updatePickupRequest = async (id, pickupData) => {
  try {
    const response = await axiosInstance.put(`/pickup/${id}`, pickupData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete pickup request
export const deletePickupRequest = async (id) => {
  try {
    const response = await axiosInstance.delete(`/pickup/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};