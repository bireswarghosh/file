// Patient Visit CRUD API Documentation
// Base URL: /api/v1/patient-visits

/**
 * CREATE - Add new patient visit
 * POST /api/v1/patient-visits
 * Body: {
 *   RegistrationId: string (required),
 *   PVisitDate: datetime (required),
 *   Rate: number,
 *   VisitTypeId: number,
 *   DoctorId: number,
 *   SpecialityId: number,
 *   TotAmount: number,
 *   Weight: string,
 *   BpMin: number,
 *   BpMax: number,
 *   vTime: string,
 *   Remarks: string,
 *   // ... all other PatientVisit fields
 * }
 */

/**
 * READ - Get all patient visits with pagination and search
 * GET /api/v1/patient-visits?page=1&limit=20&search=keyword&registrationId=&patientName=&doctorId=&fromDate=&toDate=
 */

/**
 * READ - Get specific patient visit by ID
 * GET /api/v1/patient-visits/:id
 */

/**
 * UPDATE - Update patient visit
 * PUT /api/v1/patient-visits/:id
 * Body: Same as CREATE
 */

/**
 * DELETE - Delete patient visit
 * DELETE /api/v1/patient-visits/:id
 */

/**
 * GET visits by registration ID
 * GET /api/v1/patient-visits/registration/:registrationId
 */

export const patientVisitAPI = {
  // Base URL
  baseURL: '/api/v1/patient-visits',
  
  // Create new patient visit
  create: (data) => ({
    method: 'POST',
    url: '/api/v1/patient-visits',
    data
  }),
  
  // Get all patient visits with filters
  getAll: (params = {}) => {
    const { 
      page = 1, 
      limit = 20, 
      search = '', 
      registrationId = '', 
      patientName = '', 
      doctorId = '', 
      fromDate = '', 
      toDate = '' 
    } = params;
    
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
      ...(registrationId && { registrationId }),
      ...(patientName && { patientName }),
      ...(doctorId && { doctorId }),
      ...(fromDate && { fromDate }),
      ...(toDate && { toDate })
    });
    
    return {
      method: 'GET',
      url: `/api/v1/patient-visits?${queryParams}`
    };
  },
  
  // Get patient visit by ID
  getById: (id) => ({
    method: 'GET',
    url: `/api/v1/patient-visits/${id}`
  }),
  
  // Update patient visit
  update: (id, data) => ({
    method: 'PUT',
    url: `/api/v1/patient-visits/${id}`,
    data
  }),
  
  // Delete patient visit
  delete: (id) => ({
    method: 'DELETE',
    url: `/api/v1/patient-visits/${id}`
  }),
  
  // Get visits by registration ID
  getByRegistrationId: (registrationId) => ({
    method: 'GET',
    url: `/api/v1/patient-visits/registration/${registrationId}`
  })
};

// Field validation schema
export const patientVisitSchema = {
  required: ['RegistrationId', 'PVisitDate'],
  optional: [
    'Rate', 'VisitTypeId', 'UserId', 'Discount', 'TotAmount', 'AdvAmt', 'ServiceCh',
    'SpecialityId', 'DoctorId', 'vTime', 'BTime', 'BDate', 'BookingYN', 'RegCh', 
    'NewRegYN', 'Asst1YN', 'Asst1', 'Asst2YN', 'Asst2', 'Asst3YN', 'Asst3', 
    'SrvChDisc', 'QNo', 'Quota', 'Remarks', 'Narration', 'Referalid', 'Weight', 
    'Temperatare', 'BpMin', 'BpMax', 'Others', 'Hight', 'PaymentType', 'BANK', 
    'Cheque', 'REG', 'RecAmt', 'DueAmt', 'FinalRecAmt', 'CompanyId', 'm_CompanyId', 
    'ReferralId', 'CashLess', 'CashLessId', 'Admissionno', 'type', 'discp', 
    'admissionid', 'Clearing', 'cashno', 'clrpayment'
  ]
};

// Helper functions for common operations
export const patientVisitHelpers = {
  // Format date for API
  formatDate: (date) => {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  },
  
  // Format datetime for API
  formatDateTime: (datetime) => {
    if (!datetime) return '';
    return new Date(datetime).toISOString();
  },
  
  // Validate required fields
  validateRequired: (data) => {
    const errors = [];
    patientVisitSchema.required.forEach(field => {
      if (!data[field]) {
        errors.push(`${field} is required`);
      }
    });
    return errors;
  },
  
  // Clean data for API submission
  cleanData: (data) => {
    const cleaned = {};
    [...patientVisitSchema.required, ...patientVisitSchema.optional].forEach(field => {
      if (data[field] !== undefined && data[field] !== null && data[field] !== '') {
        cleaned[field] = data[field];
      }
    });
    return cleaned;
  }
};