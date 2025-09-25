







// PDF Generator Files Mapping (English)
// Current Selection → PDF File Used
// View Option	Entry/Doctor Selection	Report Type	PDF File Used
// UserWise  -	All Users -	All                     ---          UserWise_AllDoctors_all.js
// UserWise  -	All Users -	Only Doctor Ch.         ---        	UserWise_AllDoctors_summary.js
// UserWise  -	All Users -	Only Service Ch.        ---         	UserWise_AllDoctors_onlyServiceCh.js
// UserWise  -	All Users -	Doctor's Ch. (Summary)  ---          UserWise_AllDoctors_doctorSummary.js
// UserWise  -	All Users -	Visit ID Wise           ---      	  UserWise_AllDoctors_visitIdWise.js
// UserWise  -	All Users -	Visit Type Wise         ---        	UserWise_AllDoctors_visitTypeWise.js
// UserWise  -	All Users -	Visit Type User Wise    ---         	UserWise_AllDoctors_visitTypeUserWise.js
// UserWise  -	All Users -	Registration No Wise    ---         	UserWise_AllDoctors_registrationNoWise.js
// UserWise  -	All Users -	Visit Type grp Wise     ---        	UserWise_AllDoctors_visitTypeGrpWise.js
// UserWise  -	All Users -	COMPANY WISE            ---        	UserWise_AllDoctors_companyWise.js


























// PDF Generator Index - Import all PDF formats
import { generateUserWiseAllDoctorsPDF } from './UserWise_AllDoctors_all';
import { generateUserWiseAllDoctorsSummaryPDF } from './UserWise_AllDoctors_summary';
import { generateUserWiseAllDoctorsOnlyServiceChPDF } from './UserWise_AllDoctors_onlyServiceCh';
import { generateUserWiseAllDoctorsDoctorSummaryPDF } from './UserWise_AllDoctors_doctorSummary';
import { generateUserWiseAllDoctorsVisitIdWisePDF } from './UserWise_AllDoctors_visitIdWise';
import { generateUserWiseAllDoctorsVisitTypeWisePDF } from './UserWise_AllDoctors_visitTypeWise';
import { generateUserWiseAllDoctorsVisitTypeUserWisePDF } from './UserWise_AllDoctors_visitTypeUserWise';
import { generateUserWiseAllDoctorsRegistrationNoWisePDF } from './UserWise_AllDoctors_registrationNoWise';
import { generateUserWiseAllDoctorsVisitTypeGrpWisePDF } from './UserWise_AllDoctors_visitTypeGrpWise';
import { generateUserWiseAllDoctorsCompanyWisePDF } from './UserWise_AllDoctors_companyWise';
import { generateDoctorWiseAllDoctorsSummaryPDF } from './DoctorWise_AllDoctors_summary';

// PDF Generator mapping based on View Options and Doctor Selection
export const getPDFGenerator = (viewOption, doctorSelect, reportType) => {
  const key = `${viewOption}_${doctorSelect}_${reportType}`;
  console.log('PDF Generator Key:', key); // Debug log
  
  const generators = {
    'UserWise_allDoctors_All': generateUserWiseAllDoctorsPDF,
    'UserWise_allDoctors_Only Doctor Ch.': generateUserWiseAllDoctorsSummaryPDF,
    'UserWise_allDoctors_Only Service Ch.': generateUserWiseAllDoctorsOnlyServiceChPDF,
    'UserWise_allDoctors_Doctor\'s Ch. (Summary)': generateUserWiseAllDoctorsDoctorSummaryPDF,
    'UserWise_allDoctors_Visit ID Wise': generateUserWiseAllDoctorsVisitIdWisePDF,
    'UserWise_allDoctors_Visit Type Wise': generateUserWiseAllDoctorsVisitTypeWisePDF,
    'UserWise_allDoctors_Visit Type User Wise': generateUserWiseAllDoctorsVisitTypeUserWisePDF,
    'UserWise_allDoctors_Registration No Wise': generateUserWiseAllDoctorsRegistrationNoWisePDF,
    'UserWise_allDoctors_Visit Type grp Wise': generateUserWiseAllDoctorsVisitTypeGrpWisePDF,
    'UserWise_allDoctors_COMPANY WISE': generateUserWiseAllDoctorsCompanyWisePDF,
    'DoctorWise_allDoctors_All': generateUserWiseAllDoctorsPDF,
    'DoctorWise_selectiveDoctors_All': generateUserWiseAllDoctorsPDF,
    'DoctorWise_allDoctors_Only Doctor Ch.': generateDoctorWiseAllDoctorsSummaryPDF,
    'DoctorWise_selectiveDoctors_Only Doctor Ch.': generateDoctorWiseAllDoctorsSummaryPDF,
    'DoctorWise_allDoctors_Only Service Ch.': generateUserWiseAllDoctorsOnlyServiceChPDF,
    'DoctorWise_selectiveDoctors_Only Service Ch.': generateUserWiseAllDoctorsOnlyServiceChPDF,
    'DoctorWise_allDoctors_Doctor\'s Ch. (Summary)': generateUserWiseAllDoctorsDoctorSummaryPDF,
    'DoctorWise_selectiveDoctors_Doctor\'s Ch. (Summary)': generateUserWiseAllDoctorsDoctorSummaryPDF,
    'DoctorWise_allDoctors_Visit ID Wise': generateUserWiseAllDoctorsVisitIdWisePDF,
    'DoctorWise_selectiveDoctors_Visit ID Wise': generateUserWiseAllDoctorsVisitIdWisePDF,
    'DoctorWise_allDoctors_Visit Type Wise': generateUserWiseAllDoctorsVisitTypeWisePDF,
    'DoctorWise_selectiveDoctors_Visit Type Wise': generateUserWiseAllDoctorsVisitTypeWisePDF,
    'DoctorWise_allDoctors_Visit Type User Wise': generateUserWiseAllDoctorsVisitTypeUserWisePDF,
    'DoctorWise_selectiveDoctors_Visit Type User Wise': generateUserWiseAllDoctorsVisitTypeUserWisePDF,
    'DoctorWise_allDoctors_Registration No Wise': generateUserWiseAllDoctorsRegistrationNoWisePDF,
    'DoctorWise_selectiveDoctors_Registration No Wise': generateUserWiseAllDoctorsRegistrationNoWisePDF,
    'DoctorWise_allDoctors_Visit Type grp Wise': generateUserWiseAllDoctorsVisitTypeGrpWisePDF,
    'DoctorWise_selectiveDoctors_Visit Type grp Wise': generateUserWiseAllDoctorsVisitTypeGrpWisePDF,
    'DoctorWise_allDoctors_COMPANY WISE': generateUserWiseAllDoctorsCompanyWisePDF,
    'DoctorWise_selectiveDoctors_COMPANY WISE': generateUserWiseAllDoctorsCompanyWisePDF,
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