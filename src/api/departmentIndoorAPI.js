import axiosInstance from '../axiosInstance';

// GET all departments with search and pagination
export const getDepartments = async (search = '', page = 1, limit = 50) => {
  const params = { page, limit };
  if (search) params.search = search;
  return await axiosInstance.get('/departmentindoor', { params });
};

// GET single department by ID
export const getDepartment = async (id) => {
  return await axiosInstance.get(`/departmentindoor/${id}`);
};

// POST create new department
export const createDepartment = async (data) => {
  return await axiosInstance.post('/departmentindoor', data);
};

// PUT update department
export const updateDepartment = async (id, data) => {
  return await axiosInstance.put(`/departmentindoor/${id}`, data);
};

// DELETE department
export const deleteDepartment = async (id) => {
  return await axiosInstance.delete(`/departmentindoor/${id}`);
};

// GET departments by group ID
export const getDepartmentsByGroup = async (groupId) => {
  return await axiosInstance.get(`/departmentindoor/group/${groupId}`);
};

// GET departments by rate type
export const getDepartmentsByRateType = async (rateType) => {
  return await axiosInstance.get(`/departmentindoor/ratetype/${rateType}`);
};