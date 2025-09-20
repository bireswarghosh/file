// PDF Generator Index - Import all PDF formats
import { generateUserWiseAllDoctorsPDF } from './UserWise_AllDoctors_all';
import { generateUserWiseAllDoctorsSummaryPDF } from './UserWise_AllDoctors_summary';

// PDF Generator mapping based on View Options and Doctor Selection
export const getPDFGenerator = (viewOption, doctorSelect, reportType) => {
  const key = `${viewOption}_${doctorSelect}_${reportType}`;
  
  const generators = {
    'UserWise_allDoctors_All': generateUserWiseAllDoctorsPDF,
    'UserWise_allDoctors_Doctor\'s Ch. (Summary)': generateUserWiseAllDoctorsSummaryPDF,
    // Add more generators here as needed
    // 'DoctorWise_allDoctors_All': generateDoctorWiseAllDoctorsPDF,
    // 'UserWise_selectiveDoctors_All': generateUserWiseSelectiveDoctorsPDF,
    // etc...
  };
  
  return generators[key] || generateUserWiseAllDoctorsPDF; // Default fallback
};

// List of all available PDF formats
export const availablePDFFormats = [
  'UserWise_AllDoctors_All',
  'DoctorWise_AllDoctors_All', 
  'UserWise_SelectiveDoctors_All',
  'DoctorWise_SelectiveDoctors_All',
  'VisitType_AllDoctors_All',
  'RefDoctorWise_AllDoctors_All',
  'RefWise_AllDoctors_All',
  'AdvanceBooking_AllDoctors_All',
  'UserWise_AllDoctors_OnlyDoctorCh',
  'UserWise_AllDoctors_OnlyServiceCh',
  'UserWise_AllDoctors_DoctorChSummary',
  'UserWise_AllDoctors_VisitIDWise',
  'UserWise_AllDoctors_CompanyWise'
];