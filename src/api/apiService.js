import axiosInstance from '../axiosInstance';

// Generic API service helper
export const apiService = {
  // Make API call with automatic token handling
  call: async (apiCall, options = {}) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        ...apiCall,
        headers: {
          Authorization: `Bearer ${token}`,
          ...apiCall.headers,
          ...options.headers
        }
      };
      
      const response = await axiosInstance(config);
      return response;
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  },

  // Simplified methods for common operations
  get: async (url, params = {}) => {
    return apiService.call({
      method: 'GET',
      url,
      params
    });
  },

  post: async (url, data = {}) => {
    return apiService.call({
      method: 'POST',
      url,
      data
    });
  },

  put: async (url, data = {}) => {
    return apiService.call({
      method: 'PUT',
      url,
      data
    });
  },

  delete: async (url) => {
    return apiService.call({
      method: 'DELETE',
      url
    });
  }
};

// Patient Visit specific service
export const patientVisitService = {
  // Get all visits with filters
  getAll: async (filters = {}) => {
    const { patientVisitAPI } = await import('./patientVisitAPI');
    const apiCall = patientVisitAPI.getAll(filters);
    return apiService.call(apiCall);
  },

  // Get visit by ID
  getById: async (id) => {
    const { patientVisitAPI } = await import('./patientVisitAPI');
    const apiCall = patientVisitAPI.getById(id);
    return apiService.call(apiCall);
  },

  // Create new visit
  create: async (data) => {
    const { patientVisitAPI, patientVisitHelpers } = await import('./patientVisitAPI');
    const cleanedData = patientVisitHelpers.cleanData(data);
    const apiCall = patientVisitAPI.create(cleanedData);
    return apiService.call(apiCall);
  },

  // Update visit
  update: async (id, data) => {
    const { patientVisitAPI, patientVisitHelpers } = await import('./patientVisitAPI');
    const cleanedData = patientVisitHelpers.cleanData(data);
    const apiCall = patientVisitAPI.update(id, cleanedData);
    return apiService.call(apiCall);
  },

  // Delete visit
  delete: async (id) => {
    const { patientVisitAPI } = await import('./patientVisitAPI');
    const apiCall = patientVisitAPI.delete(id);
    return apiService.call(apiCall);
  },

  // Get visits by registration ID
  getByRegistrationId: async (registrationId) => {
    const { patientVisitAPI } = await import('./patientVisitAPI');
    const apiCall = patientVisitAPI.getByRegistrationId(registrationId);
    return apiService.call(apiCall);
  }
};