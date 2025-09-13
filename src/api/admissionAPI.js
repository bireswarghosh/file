// Admission CRUD API Documentation
// Base URL: /api/v1/admission

/**
 * CREATE - Add new admission
 * POST /api/v1/admission
 * Body: {
 *   AdmitionNo: string,
 *   AdmitionDate: datetime,
 *   AdmitionTime: string,
 *   BillTime: string,
 *   OPD: char(1),
 *   OPDId: string,
 *   Booking: char(1),
 *   BookingId: string,
 *   PatientName: string,
 *   Add1: string,
 *   Add2: string,
 *   Add3: string,
 *   Age: number,
 *   AgeType: char(1),
 *   Sex: char(1),
 *   MStatus: char(1),
 *   PhoneNo: string,
 *   AreaId: number,
 *   ReligionId: number,
 *   GurdianName: string,
 *   Relation: string,
 *   RelativeName: string,
 *   RelativePhoneNo: string,
 *   Company: char(1),
 *   CompanyId: number,
 *   DepartmentId: number,
 *   BedId: number,
 *   UCDoctor1Id: number,
 *   UCDoctor2Id: number,
 *   UCDoctor3Id: number,
 *   DiseaseId: number,
 *   RMOId: number,
 *   Referral: char(1),
 *   ReferralId: number,
 *   RefDoctorId: number,
 *   Package: char(1),
 *   PackageId: number,
 *   PackageAmount: number,
 *   CashLess: char(1),
 *   CashLessId: number,
 *   UserId: number,
 *   Status: char(1),
 *   Discharge: char(1),
 *   AdmitionNo1: string,
 *   Rename: string,
 *   AdmType: number,
 *   InsComp: string,
 *   DayCareYN: string,
 *   BedRate: number,
 *   DayCareId: number,
 *   PatientId: string,
 *   Remarks: string,
 *   SpRemarks: string,
 *   IdentNo: string,
 *   PolcNo: string,
 *   CCNNo: string,
 *   CardNo: string,
 *   PPN: number,
 *   BillDone: string,
 *   Occupation: string,
 *   Passport: string,
 *   DietChartId: number,
 *   tpaper: number,
 *   PanNo: string,
 *   PackageCHK: number,
 *   nameemployer: string,
 *   refdate: datetime,
 *   Nameemp: string,
 *   empcode: string,
 *   RefDoctorId2: number,
 *   packagevalid: datetime,
 *   optdiagoinc: number,
 *   optmediinc: number,
 *   optotherchargeinc: number,
 *   Weight: string,
 *   oprationdate: datetime,
 *   optime: string,
 *   AgeD: number,
 *   AgeTypeD: char(1),
 *   AgeN: number,
 *   AgeTypeN: char(1),
 *   URN: string,
 *   packagestart: datetime,
 *   AcGenLedCompany: number,
 *   optotinc: number,
 *   MEXECUTIVE: number,
 *   PackageId2: number,
 *   PackageId3: number,
 *   PackageId4: number,
 *   PackageAmount2: number,
 *   PackageAmount3: number,
 *   PackageAmount4: number
 * }
 */

/**
 * READ - Get all admissions with pagination
 * GET /api/v1/admission?page=1&limit=50&search=keyword
 */

/**
 * READ - Get specific admission by ID
 * GET /api/v1/admission/:admitionId
 */

/**
 * UPDATE - Update admission
 * PUT /api/v1/admission/:admitionId
 * Body: Same as CREATE
 */

/**
 * DELETE - Delete admission
 * DELETE /api/v1/admission/:admitionId
 */

/**
 * SEARCH - Search admissions by patient name or phone
 * GET /api/v1/admission/search?q=searchTerm
 */

/**
 * FILTER - Get admissions by date range
 * GET /api/v1/admission/filter?startDate=2025-01-01&endDate=2025-12-31
 */

export const admissionAPI = {
  // Base URL
  baseURL: '/api/v1/admission',
  
  // Create new admission
  create: (data) => ({
    method: 'POST',
    url: '/api/v1/admission',
    data
  }),
  
  // Get all admissions
  getAll: (page = 1, limit = 50, search = '') => ({
    method: 'GET',
    url: `/api/v1/admission?page=${page}&limit=${limit}&search=${search}`
  }),
  
  // Get admission by ID
  getById: (admitionId) => ({
    method: 'GET',
    url: `/api/v1/admission/${admitionId}`
  }),
  
  // Update admission
  update: (admitionId, data) => ({
    method: 'PUT',
    url: `/api/v1/admission/${admitionId}`,
    data
  }),
  
  // Delete admission
  delete: (admitionId) => ({
    method: 'DELETE',
    url: `/api/v1/admission/${admitionId}`
  }),
  
  // Search admissions
  search: (searchTerm) => ({
    method: 'GET',
    url: `/api/v1/admission/search?q=${searchTerm}`
  }),
  
  // Filter by date range
  filterByDate: (startDate, endDate) => ({
    method: 'GET',
    url: `/api/v1/admission/filter?startDate=${startDate}&endDate=${endDate}`
  })
};

// Field validation schema
export const admissionSchema = {
  required: ['AdmitionId'], // Only primary key is required
  optional: [
    'AdmitionNo', 'AdmitionDate', 'AdmitionTime', 'BillTime', 'OPD', 'OPDId',
    'Booking', 'BookingId', 'PatientName', 'Add1', 'Add2', 'Add3', 'Age',
    'AgeType', 'Sex', 'MStatus', 'PhoneNo', 'AreaId', 'ReligionId',
    'GurdianName', 'Relation', 'RelativeName', 'RelativePhoneNo', 'Company',
    'CompanyId', 'DepartmentId', 'BedId', 'UCDoctor1Id', 'UCDoctor2Id',
    'UCDoctor3Id', 'DiseaseId', 'RMOId', 'Referral', 'ReferralId',
    'RefDoctorId', 'Package', 'PackageId', 'PackageAmount', 'CashLess',
    'CashLessId', 'UserId', 'Status', 'Discharge', 'AdmitionNo1', 'Rename',
    'AdmType', 'InsComp', 'DayCareYN', 'BedRate', 'DayCareId', 'PatientId',
    'Remarks', 'SpRemarks', 'IdentNo', 'PolcNo', 'CCNNo', 'CardNo', 'PPN',
    'BillDone', 'Occupation', 'Passport', 'DietChartId', 'tpaper', 'PanNo',
    'PackageCHK', 'nameemployer', 'refdate', 'Nameemp', 'empcode',
    'RefDoctorId2', 'packagevalid', 'optdiagoinc', 'optmediinc',
    'optotherchargeinc', 'Weight', 'oprationdate', 'optime', 'AgeD',
    'AgeTypeD', 'AgeN', 'AgeTypeN', 'URN', 'packagestart', 'AcGenLedCompany',
    'optotinc', 'MEXECUTIVE', 'PackageId2', 'PackageId3', 'PackageId4',
    'PackageAmount2', 'PackageAmount3', 'PackageAmount4'
  ]
};