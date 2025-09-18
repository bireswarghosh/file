import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react';
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import ThemeToggleButton from "../helper/ThemeToggleButton";
import BusinessIcon from '@mui/icons-material/Business';
import AppointmentBookingMenu from "../components/AppointmentBookingMenu";
import { useAuth } from "../contexts/AuthContext";

// Add CSS for nested dropdowns
const nestedDropdownStyles = `
  .sidebar-submenu .dropdown > a {
    padding-left: 15px;
    position: relative;
    // background-color:rgb(231, 13, 13);
  }
  
  .sidebar-submenu .sidebar-submenu {
    padding-left: 15px;
    position: relative;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }
  
  .sidebar-submenu .dropdown.open > .sidebar-submenu {
    max-height: 1000px !important;
    overflow: visible;
  }
  
  .sidebar-menu a,
  .sidebar-menu Link,
  .sidebar-submenu a,
  .sidebar-submenu Link {
    text-decoration: none !important;
  }
  
  .sidebar-menu a:hover,
  .sidebar-menu Link:hover,
  .sidebar-submenu a:hover,
  .sidebar-submenu Link:hover {
    text-decoration: none !important;
  }
`;

const MasterLayout = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  // Add the nested dropdown styles to the document
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = nestedDropdownStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  let [sidebarActive, seSidebarActive] = useState(false);
  let [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation(); // Hook to get the current route

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    // Keep parent dropdowns open based on current route
    const keepDropdownsOpen = () => {
      const currentPath = location.pathname;
      console.log('Current path:', currentPath); // Debug log
      
      // OUTDOOR routes
      const outdoorRoutes = ['/visit_entry', '/table-data', '/dr-rect-visit-detail', '/opd_query', '/emr', '/other_charges'];
      // INDOOR routes  
      const indoorRoutes = ['/initialFormData', '/sampleReceipts', '/RefundMoneyReceiptForm', '/UnifiedMedicalForm', '/UnifiedMedicalWorkspace', '/UnifiedMedicalApp', '/sampleBookings', '/sampleCollection', '/sampleDetails', '/pos', '/RadiologyRequisition', '/RadiologyRequisitionDetail', '/PatientRegistrationList', '/PatientRegistrationDetail', '/CaseEntry', '/CaseEntryDetail', '/HealthCardDetail', '/OtherBillEntryDetail'];
      // DIAGNOSTIC routes
      const diagnosticRoutes = ['/PatientAdmissionList', '/PatientAdmissionDetail', '/MoneyReceiptList_DIAGNOSTIC', '/MoneyReceiptDetail_DIAGNOSTIC', '/OtherCharges', '/OtherChargesDetail', '/OTBillingList', '/OTBillingDetail', '/OTNoteProcedure', '/DoctorVisit', '/BedTransfer', '/Estimate', '/DischargeAndAdvise', '/DischargeAndAdvise_details', '/DischargeAdvise', '/DischargeMrd', '/FinalBillQuery', '/FinalBillingDetail', '/FinalBillingList', '/PatientEnquiryDetail'];
      // MASTER routes
      const masterRoutes = ['/IndoorParameterSetup', '/DepartmentGroup', '/department', '/department2', '/BedMaster', '/ReligionMaster', '/nurse', '/nurse-station-master', '/DayCareBedRate', '/OTMaster', '/OTSlotMaster', '/OTType', '/OTItemMaster', '/CashlessMaster', '/consent-master', '/BillPrintHeadMaster', '/OtherChargesMaster', '/CompanyWiseBedRate', '/company-wise-ot-item-rate', '/CompanyWiseOtherChargesMaster', '/ReferalMaster', '/doctor-test-rate', '/PackageMasterList', '/package-othercharge', '/ReferalMaster', '/DiseaseMaster', '/MedicinMaster', '/WardMaster', '/CashPaymentHeadMaster', '/diet-chart', '/DischargeTemplateMaster', '/AppointmentMaster', '/CoPaymentMaster', '/MarketingExecutiveMaster'];
      
      let targetDropdown = null;
      if (outdoorRoutes.includes(currentPath)) targetDropdown = 'OUTDOOR';
      else if (indoorRoutes.includes(currentPath)) targetDropdown = 'INDOOR';
      else if (diagnosticRoutes.includes(currentPath)) targetDropdown = 'DIAGNOSTIC';
      else if (masterRoutes.includes(currentPath)) targetDropdown = 'MASTER';
      
      console.log('Target dropdown:', targetDropdown); // Debug log
      
      if (targetDropdown) {
        // Multiple attempts to ensure DOM is ready
        const attempts = [0, 100, 300, 500];
        attempts.forEach(delay => {
          setTimeout(() => {
            const dropdowns = document.querySelectorAll('.sidebar-menu > .dropdown');
            console.log('Found dropdowns:', dropdowns.length); // Debug log
            dropdowns.forEach(dropdown => {
              const span = dropdown.querySelector('span');
              if (span && span.textContent.trim() === targetDropdown) {
                console.log('Opening dropdown:', targetDropdown); // Debug log
                dropdown.classList.add('open');
                const submenu = dropdown.querySelector('.sidebar-submenu');
                if (submenu) {
                  submenu.style.maxHeight = `${submenu.scrollHeight}px`;
                  
                  // For INDOOR and DIAGNOSTIC, also open nested dropdowns based on route
                  if (targetDropdown === 'INDOOR') {
                    const nestedDropdowns = submenu.querySelectorAll('.dropdown');
                    nestedDropdowns.forEach(nestedDropdown => {
                      const nestedSpan = nestedDropdown.querySelector('span');
                      if (nestedSpan) {
                        const nestedText = nestedSpan.textContent.trim();
                        // Check if current route belongs to this nested dropdown
                        if ((nestedText === 'MONEY RESPECT' && ['/initialFormData', '/sampleReceipts'].includes(currentPath)) ||
                            (nestedText === 'REFUND MONEY' && ['/RefundMoneyReceiptForm', '/UnifiedMedicalForm'].includes(currentPath)) ||
                            (nestedText === 'Laboratory' && ['/UnifiedMedicalWorkspace'].includes(currentPath)) ||
                            (nestedText === 'BOOKING' && ['/UnifiedMedicalApp', '/sampleBookings'].includes(currentPath)) ||
                            (nestedText === 'sample collection' && ['/sampleCollection', '/sampleDetails'].includes(currentPath)) ||
                            (nestedText === 'POS' && ['/pos'].includes(currentPath)) ||
                            (nestedText === 'Radiology Requisition' && ['/RadiologyRequisition', '/RadiologyRequisitionDetail'].includes(currentPath)) ||
                            (nestedText === 'Patient Registration' && ['/PatientRegistrationList', '/PatientRegistrationDetail'].includes(currentPath)) ||
                            (nestedText === 'CASE STUDY' && ['/CaseEntry', '/CaseEntryDetail'].includes(currentPath)) ||
                            (nestedText === 'HEALTH CARD' && ['/HealthCardDetail'].includes(currentPath)) ||
                            (nestedText === 'Other Bill Entry Detail' && ['/OtherBillEntryDetail'].includes(currentPath))) {
                          nestedDropdown.classList.add('open');
                          const nestedSubmenu = nestedDropdown.querySelector('.sidebar-submenu');
                          if (nestedSubmenu) {
                            nestedSubmenu.style.maxHeight = `${nestedSubmenu.scrollHeight}px`;
                          }
                        }
                      }
                    });
                  }
                  
                  if (targetDropdown === 'DIAGNOSTIC') {
                    const nestedDropdowns = submenu.querySelectorAll('.dropdown');
                    nestedDropdowns.forEach(nestedDropdown => {
                      const nestedSpan = nestedDropdown.querySelector('span');
                      if (nestedSpan) {
                        const nestedText = nestedSpan.textContent.trim();
                        // Check if current route belongs to this nested dropdown
                        if ((nestedText === 'ADMISSION' && ['/PatientAdmissionList', '/PatientAdmissionDetail'].includes(currentPath)) ||
                            (nestedText === 'Money Reecipt' && ['/MoneyReceiptList_DIAGNOSTIC', '/MoneyReceiptDetail_DIAGNOSTIC'].includes(currentPath)) ||
                            (nestedText === 'Other Charges' && ['/OtherCharges', '/OtherChargesDetail'].includes(currentPath)) ||
                            (nestedText === 'OT Billing List' && ['/OTBillingList', '/OTBillingDetail', '/OTNoteProcedure'].includes(currentPath)) ||
                            (nestedText === 'Doctor Visit' && ['/DoctorVisit'].includes(currentPath)) ||
                            (nestedText === 'Bed Transfer' && ['/BedTransfer'].includes(currentPath)) ||
                            (nestedText === 'Estimate' && ['/Estimate'].includes(currentPath)) ||
                            (nestedText === 'Discharge And Advise' && ['/DischargeAndAdvise', '/DischargeAndAdvise_details', '/DischargeAdvise', '/DischargeMrd'].includes(currentPath)) ||
                            (nestedText === 'Final Bill Query' && ['/FinalBillQuery'].includes(currentPath)) ||
                            (nestedText === 'Final Billing List' && ['/FinalBillingDetail', '/FinalBillingList'].includes(currentPath)) ||
                            (nestedText === 'Patient Enquiry Detail' && ['/PatientEnquiryDetail'].includes(currentPath))) {
                          nestedDropdown.classList.add('open');
                          const nestedSubmenu = nestedDropdown.querySelector('.sidebar-submenu');
                          if (nestedSubmenu) {
                            nestedSubmenu.style.maxHeight = `${nestedSubmenu.scrollHeight}px`;
                          }
                        }
                      }
                    });
                  }
                  
                  // Recalculate parent height after opening nested dropdowns
                  setTimeout(() => {
                    submenu.style.maxHeight = `${submenu.scrollHeight}px`;
                  }, 50);
                }
              }
            });
          }, delay);
        });
      }
    };
    
    // Call immediately and after a delay
    keepDropdownsOpen();
    setTimeout(keepDropdownsOpen, 500);

    const handleDropdownClick = (event) => {
      event.preventDefault();
      const clickedLink = event.currentTarget;
      const clickedDropdown = clickedLink.closest(".dropdown");

      if (!clickedDropdown) return;

      const isActive = clickedDropdown.classList.contains("open");

      // If this is a nested dropdown, don't close parent dropdowns
      const isNestedDropdown = clickedDropdown.closest(".sidebar-submenu") !== null;

      if (!isNestedDropdown) {
        // Close all top-level dropdowns
        const allDropdowns = document.querySelectorAll(".sidebar-menu > .dropdown");
        allDropdowns.forEach((dropdown) => {
          if (dropdown !== clickedDropdown) {
            dropdown.classList.remove("open");
            const submenu = dropdown.querySelector(".sidebar-submenu");
            if (submenu) {
              submenu.style.maxHeight = "0px"; // Collapse submenu
            }
          }
        });
      } else {
        // For nested dropdowns, only close siblings
        const parentSubmenu = clickedDropdown.closest(".sidebar-submenu");
        const siblingDropdowns = parentSubmenu.querySelectorAll(":scope > li.dropdown");
        siblingDropdowns.forEach((dropdown) => {
          if (dropdown !== clickedDropdown) {
            dropdown.classList.remove("open");
            const submenu = dropdown.querySelector(".sidebar-submenu");
            if (submenu) {
              submenu.style.maxHeight = "0px"; // Collapse submenu
            }
          }
        });
      }

      // Toggle the clicked dropdown
      if (!isActive) {
        clickedDropdown.classList.add("open");
        const submenu = clickedDropdown.querySelector(".sidebar-submenu");
        if (submenu) {
          // Calculate total height including any nested dropdowns
          let totalHeight = submenu.scrollHeight;
          submenu.style.maxHeight = `${totalHeight}px`; // Expand submenu

          // If this is a nested dropdown, update parent submenu heights
          let parent = clickedDropdown.closest(".sidebar-submenu");
          while (parent) {
            const parentHeight = parent.scrollHeight + totalHeight;
            parent.style.maxHeight = `${parentHeight}px`;
            parent = parent.parentElement.closest(".sidebar-submenu");
          }
        }
      } else {
        clickedDropdown.classList.remove("open");
        const submenu = clickedDropdown.querySelector(".sidebar-submenu");
        if (submenu) {
          submenu.style.maxHeight = "0px"; // Collapse submenu
        }
      }
    };

    // Attach click event listeners to all dropdown triggers (including nested ones)
    const dropdownTriggers = document.querySelectorAll(
      ".sidebar-menu .dropdown > a, .sidebar-menu .dropdown > Link, .sidebar-submenu .dropdown > a, .sidebar-submenu .dropdown > Link"
    );

    dropdownTriggers.forEach((trigger) => {
      trigger.addEventListener("click", handleDropdownClick);
    });



    // Cleanup event listeners on unmount
    return () => {
      dropdownTriggers.forEach((trigger) => {
        trigger.removeEventListener("click", handleDropdownClick);
      });
    };
  }, [location.pathname]);

  let sidebarControl = () => {
    seSidebarActive(!sidebarActive);
  };

  let mobileMenuControl = () => {
    setMobileMenu(!mobileMenu);
  };

  return (


    <section className={mobileMenu ? "overlay active" : "overlay "}>
      {/* sidebar */}
      <aside
        className={
          sidebarActive
            ? "sidebar active "
            : mobileMenu
              ? "sidebar sidebar-open"
              : "sidebar"
        }
      >
        <button
          onClick={mobileMenuControl}
          type='button'
          className='sidebar-close-btn'
        >
          <Icon icon='radix-icons:cross-2' />
        </button>
        <div>
          <Link to='/' className='sidebar-logo'>
            <img
              src='assets/images/logo.png'
              alt='site logo'
              className='light-logo'
            />
            <img
              src='assets/images/logo-light.png'
              alt='site logo'
              className='dark-logo'
            />
            <img
              src='assets/images/logo-icon.png'
              alt='site logo'
              className='logo-icon'
            />
          </Link>
        </div>
        <div className='sidebar-menu-area'>
          <ul className='sidebar-menu' id='sidebar-menu'>
            <li className=''>
              <Link to='#'>
                <Icon
                  icon='solar:home-smile-angle-outline'
                  className='menu-icon'
                />
                <span>Dashboard</span>
              </Link>
              
            </li>

            <li className='sidebar-menu-group-title'>Application</li>




            <li className='dropdown'>
              <Link to='#'>
                <Icon
                  icon='mdi:hospital-building'
                  className='menu-icon'
                />
                <span>OUTDOOR</span>
              </Link>
              <ul className='sidebar-submenu'>
                <li>
                  <NavLink
                    to='/visit_entry'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <Icon icon='mdi:account-plus-outline' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
                    Visit Entry
                  </NavLink>
                </li>




                <li>
                  <NavLink
                    to='/table-data'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <Icon icon='mdi:format-list-bulleted' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
                    Visit List
                  </NavLink>
                </li>




                <li>
                  <NavLink
                    to='/dr-rect-visit-detail'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <Icon icon='mdi:doctor' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
                    Dr Rect Visit Detail
                  </NavLink>
                </li>

                {/* <li>
                  <NavLink
                    to='/opd_query'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <Icon icon='mdi:magnify' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
                    OPD Query
                  </NavLink>
                </li> */}


                <li>
                  <NavLink
                    to='/emr'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <Icon icon='mdi:file-document' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
                    EMR
                  </NavLink>
                </li>







                <li>
                  <NavLink
                    to='/other_charges'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <Icon icon='mdi:currency-usd' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
                    Other Charge
                  </NavLink>
                </li>



                  <li>
                  <NavLink
                    to='/IVFBiodataMaster'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <Icon icon='mdi:file-document' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
                    IVFBiodataMaster
                  </NavLink>
                </li>

                {/* <li>
                  <NavLink
                    to='/table-data'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <Icon icon='mdi:baby' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
                    IVF Biodata
                  </NavLink>
                </li> */}
              </ul>
            </li>









            <li >
              <Link to='/department'>
                <Icon
                  icon='mdi:office-building'
                  className='menu-icon'
                />
                <span>DEPARTMENT</span>
              </Link>

            </li>




  <li >
              <Link to='/active-doctors'>
                <Icon
                  icon='mdi:doctor'
                  className='menu-icon'
                />
                <span>ONLY SHOW ACTIVE DOCTOR </span>
              </Link>

            </li>







 <li >
              <Link to='/doctor-wise-appointments'>
                <Icon
                  icon='mdi:doctor'
                  className='menu-icon'
                />
                <span>Doctor Wise Appointments</span>
              </Link>

            </li>





            <li >
              <Link to='/doctor'>
                <Icon
                  icon='mdi:doctor'
                  className='menu-icon'
                />
                <span>SHOW ALL DOCTOR </span>
              </Link>

            </li>







            {/* !  INDOOR  */}


            <li className='dropdown'>
              <Link to='#'>
                <Icon
                  icon='mdi:bed-empty'
                  className='menu-icon'
                />
                <span>INDOOR</span>
              </Link>
              <ul className='sidebar-submenu'>
                <li className='dropdown'>
                  <Link to='#'>
                    <Icon icon='mdi:cash-multiple' className='menu-icon' style={{fontSize: '16px', marginRight: '8px'}} />
                    <span>IND RESPECT</span>
                  </Link>
                  <ul className='sidebar-submenu'>
                    <li>
                      <NavLink
                        to='/initialFormData'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:form-select' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                        initialFormData
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to='/sampleReceipts'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:receipt' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                        sampleReceipts
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className='dropdown'>
                  <Link to='#'>
                    <Icon icon='mdi:cash-refund' className='menu-icon' style={{fontSize: '16px', marginRight: '8px'}} />
                    <span>REFUND MONEY</span>
                  </Link>
                  <ul className='sidebar-submenu'>
                    <li>
                      <NavLink
                        to='/RefundMoneyReceiptForm'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:cash-refund' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                        RefundMoneyReceiptForm
                      </NavLink>
                    </li>




                    <li>
                      <NavLink
                        to='/UnifiedMedicalForm'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:file-medical' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                        UnifiedMedicalForm
                      </NavLink>
                    </li>


                  </ul>
                </li>






                {/* !  Laboratory   */}


                <li className='dropdown'>
                  <Link to='#'>
                    <Icon icon='mdi:flask' className='menu-icon' style={{fontSize: '16px', marginRight: '8px'}} />
                    <span>Laboratory</span>
                  </Link>
                  <ul className='sidebar-submenu'>
                    <li>
                      <NavLink
                        to='/UnifiedMedicalWorkspace'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:desktop-mac-dashboard' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                        UnifiedMedicalWorkspace
                      </NavLink>
                    </li>


                  </ul>
                </li>



                {/* !  BOOKING   */}


                <li className='dropdown'>
                  <Link to='#'>
                    <Icon icon='mdi:calendar-check' className='menu-icon' style={{fontSize: '16px', marginRight: '8px'}} />
                    <span>BOOKING</span>
                  </Link>
                  <ul className='sidebar-submenu'>


                    <li>
                      <NavLink
                        to='/UnifiedMedicalApp'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:application' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                        UnifiedMedicalApp
                      </NavLink>
                    </li>







                    <li>
                      <NavLink
                        to='/sampleBookings'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:calendar-clock' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                        sampleBookings
                      </NavLink>
                    </li>




                  </ul>
                </li>






{/* !  sample  collection   */}


                <li className='dropdown'>
                  <Link to='#'>
                    <Icon icon='mdi:test-tube-empty' className='menu-icon' style={{fontSize: '16px', marginRight: '8px'}} />
                    <span>sample collection</span>
                  </Link>
                  <ul className='sidebar-submenu'>
                    <li>
                      <NavLink
                        to='/sampleCollection'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:test-tube' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                        sampleCollection
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to='/sampleDetails'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:details' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                        Sample Details
                      </NavLink>
                    </li>
                  </ul>
                </li>








{/* ! pos */}



  <li className='dropdown'>
                  <Link to='#'>
                    <Icon icon='mdi:point-of-sale' className='menu-icon' style={{fontSize: '16px', marginRight: '8px'}} />
                    <span>POS</span>
                  </Link>
                  <ul className='sidebar-submenu'>
                    <li>
                      <NavLink
                        to='/pos'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:cash-register' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                        POS
                      </NavLink>
                    </li>
                   
                  </ul>
                </li>
                

<li className='dropdown'>
                  <Link to='#'>
                    <Icon icon='mdi:radioactive' className='menu-icon' style={{fontSize: '16px', marginRight: '8px'}} />
                    <span>Radiology Requisition</span>
                  </Link>
                  <ul className='sidebar-submenu'>
                    <li>
                      <NavLink
                        to='/RadiologyRequisition'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:radioactive' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                        Radiology Requisition
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to='/RadiologyRequisitionDetail'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:file-document-outline' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                        Requisition Detail
                      </NavLink>
                    </li>
                  </ul>
                </li>
                
                <li className='dropdown'>
                  <Link to='#'>
                    <Icon icon='mdi:account-plus' className='menu-icon' style={{fontSize: '16px', marginRight: '8px'}} />
                    <span>Patient Registration</span>
                  </Link>
                  <ul className='sidebar-submenu'>
                    <li>
                      <NavLink
                        to='/PatientRegistrationList'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:format-list-bulleted' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                      Patient Registration List
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to='/PatientRegistrationDetail'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:account-details' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                        Registration Detail
                      </NavLink>
                    </li>
                  </ul>
                </li>





  <li className='dropdown'>
                  <Link to='#'>
                    <Icon icon='mdi:file-document-outline' className='menu-icon' style={{fontSize: '16px', marginRight: '8px'}} />
                    <span>CASE STUDY</span>
                  </Link>
                  <ul className='sidebar-submenu'>
                    <li>
                      <NavLink
                        to='/CaseEntry'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:file-plus' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                      Case Entry
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to='/CaseEntryDetail'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:file-document' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                        Case Entry Detail 
                      </NavLink>
                    </li>
                  </ul>
                </li>







  <li className='dropdown'>
                  <Link to='#'>
                    <Icon icon='mdi:card-account-details' className='menu-icon' style={{fontSize: '16px', marginRight: '8px'}} />
                    <span>HEALTH CARD</span>
                  </Link>
                  <ul className='sidebar-submenu'>
                    <li>
                      <NavLink
                        to='/HealthCardDetail'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:card-account-details' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                    Health Card
                      </NavLink>
                    </li>



                  </ul>
                </li>











<li className='dropdown'>
                  <Link to='#'>
                    <Icon icon='mdi:receipt' className='menu-icon' style={{fontSize: '16px', marginRight: '8px'}} />
                    <span>Other Bill Entry Detail</span>
                  </Link>
                  <ul className='sidebar-submenu'>
                    <li>
                      <NavLink
                        to='/OtherBillEntryDetail'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:receipt' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                    Other Bill Entry Detail
                      </NavLink>
                    </li>



                  </ul>
                </li>









              </ul>
            </li>










     {/* !  DIAGNOSTIC  */}


            <li className='dropdown'>
              <Link to='#'>
                <Icon
                  icon='mdi:test-tube'
                  className='menu-icon'
                />
                <span>DIAGNOSTIC</span>
              </Link>
              <ul className='sidebar-submenu'>






                <li className='dropdown'>
                  <Link to='#'>
                    <Icon icon='mdi:hospital-box' className='menu-icon' style={{fontSize: '16px', marginRight: '8px'}} />
                    <span>ADMISSION</span>
                  </Link>
                  <ul className='sidebar-submenu'>
                    <li>
                      <NavLink
                        to='/PatientAdmissionList'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:format-list-bulleted' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                        Patient Admission List
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to='/PatientAdmissionDetail'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:account-details' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                        Patient Admission Detail
                      </NavLink>
                    </li>
                  </ul>
                </li>



                <li className='dropdown'>
                  <Link to='#'>
                    <Icon icon='mdi:cash-register' className='menu-icon' style={{fontSize: '16px', marginRight: '8px'}} />
                    <span>Money Reecipt</span>
                  </Link>
                  <ul className='sidebar-submenu'>
                    <li>
                      <NavLink
                        to='/MoneyReceiptList_DIAGNOSTIC'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:format-list-bulleted' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                    List
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to='/MoneyReceiptDetail_DIAGNOSTIC'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:details' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                        Detail
                      </NavLink>
                    </li>
                  </ul>
                </li>





 <li className='dropdown'>
                  <Link to='#'>
                    <Icon icon='mdi:currency-usd' className='menu-icon' style={{fontSize: '16px', marginRight: '8px'}} />
                    <span>Other Charges</span>
                  </Link>
                  <ul className='sidebar-submenu'>
                    <li>
                      <NavLink
                        to='/OtherCharges'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:currency-usd' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                    Other Charges
                      </NavLink>
                    </li>


 <li>
                      <NavLink
                        to='/OtherChargesDetail'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:details' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                   Other Charges Detail
                      </NavLink>
                    </li>



                  </ul>
                </li>







 <li className='dropdown'>
                  <Link to='#'>
                    <Icon icon='mdi:medical-bag' className='menu-icon' style={{fontSize: '16px', marginRight: '8px'}} />
                    <span>OT Billing List</span>
                  </Link>
                  <ul className='sidebar-submenu'>
                    <li>
                      <NavLink
                        to='/OTBillingList'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:format-list-bulleted' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                  OTBilling List
                      </NavLink>
                    </li>
                 



 <li>
                      <NavLink
                        to='/OTBillingDetail'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:details' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                  OT Billing Detail
                      </NavLink>
                    </li>

                    

                    <li>
                      <NavLink
                        to='/OTNoteProcedure'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:note-text' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                  OT Note Procedure
                      </NavLink>
                    </li>





                  </ul>
                </li>






 <li className='dropdown'>
                  <Link to='#'>
                    <Icon icon='mdi:stethoscope' className='menu-icon' style={{fontSize: '16px', marginRight: '8px'}} />
                    <span>Doctor Visit</span>
                  </Link>
                  <ul className='sidebar-submenu'>
<li>
                      <NavLink
                        to='/DoctorVisit'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:doctor' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                 Doctor Visit
                      </NavLink>
                    </li>
                   
                  </ul>
                </li>








 <li className='dropdown'>
                  <Link to='#'>
                    <Icon icon='mdi:bed' className='menu-icon' style={{fontSize: '16px', marginRight: '8px'}} />
                    <span>Bed Transfer</span>
                  </Link>
                  <ul className='sidebar-submenu'>
<li>
                      <NavLink
                        to='/BedTransfer'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:bed' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                 Bed Transfer
                      </NavLink>
                    </li>
                   
                  </ul>
                </li>









 <li className='dropdown'>
                  <Link to='#'>
                    <Icon icon='mdi:calculator' className='menu-icon' style={{fontSize: '16px', marginRight: '8px'}} />
                    <span>Estimate</span>
                  </Link>
                  <ul className='sidebar-submenu'>
<li>
                      <NavLink
                        to='/Estimate'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:calculator' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                 Estimate
                      </NavLink>
                    </li>
                   
                  </ul>
                </li>

                





<li className='dropdown'>
                  <Link to='#'>
                    <Icon icon='mdi:exit-to-app' className='menu-icon' style={{fontSize: '16px', marginRight: '8px'}} />
                    <span>Discharge And Advise</span>
                  </Link>
                  <ul className='sidebar-submenu'>
                    <li>
                      <NavLink
                        to='/DischargeAndAdvise'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:exit-to-app' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                        Discharge Advise
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to='/DischargeAndAdvise_details'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:file-document-outline' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                        Discharge And Advise
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to='/DischargeAdvise'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:clipboard-text' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
 Advise
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to='/DischargeMrd'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:file-medical' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                        Discharge MRD
                      </NavLink>
                    </li>
                  </ul>
                </li>





{/* !  FinalBillingDetail   */}

 <li className='dropdown'>
                  <Link to='#'>
                    <Icon icon='mdi:file-search' className='menu-icon' style={{fontSize: '16px', marginRight: '8px'}} />
                    <span>Final Bill Query</span>
                  </Link>
                  <ul className='sidebar-submenu'>
<li>
                      <NavLink
                        to='/FinalBillQuery'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:file-search' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                 Final Bill Query
                      </NavLink>
                    </li>
                   
                  </ul>
                </li>






{/* !    */}
<li className='dropdown'>
                  <Link to='#'>
                    <Icon icon='mdi:format-list-bulleted' className='menu-icon' style={{fontSize: '16px', marginRight: '8px'}} />
                    <span>Final Billing List</span>
                  </Link>
                  <ul className='sidebar-submenu'>
<li>
                      <NavLink
                        to='/FinalBillingDetail'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:details' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                Final Billing Detail
                      </NavLink>
                    </li>


                    <li>
                      <NavLink
                        to='/FinalBillingList'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:format-list-bulleted' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                Final Billing List
                      </NavLink>
                    </li>
                   
                  </ul>
                </li>


{/*   case   entry  com   fcrom    indoor   cas e   entry   */}






{/* PatientEnquiryDetail */}


 <li className='dropdown'>
                  <Link to='#'>
                    <Icon icon='mdi:account-search' className='menu-icon' style={{fontSize: '16px', marginRight: '8px'}} />
                    <span>Patient Enquiry Detail</span>
                  </Link>
                  <ul className='sidebar-submenu'>
<li>
                      <NavLink
                        to='/PatientEnquiryDetail'
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <Icon icon='mdi:account-search' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                 Patient Enquiry Detail
                      </NavLink>
                    </li>
                   
                  </ul>
                </li>






 




              </ul>
            </li>




{/* app  booking  app  */}


<li className='dropdown'>
          <Link to='#'>
            <Icon icon='mdi:ambulance' className='menu-icon' style={{fontSize: '16px', marginRight: '8px'}} />
            <span>Booking App</span>
          </Link>


          <ul className='sidebar-submenu'>
       
       
       
       
              {/* <li>
              <NavLink
                to='/PatientAppointmentForm'
                className={(navData) =>
                  navData.isActive ? "active-page" : ""
                }
              >
                <Icon icon='mdi:format-list-bulleted' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
            Patient Appointment Form
              </NavLink>
            </li>
        */}
       
       

    {/* <li>
              <NavLink
                to='/DoctorAppointments'
                className={(navData) =>
                  navData.isActive ? "active-page" : ""
                }
              >
                <Icon icon='mdi:format-list-bulleted' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                Doctor Appointments
              </NavLink>
            </li> */}


       
       
       
       
       
            <li>
              <NavLink
                to='/ambulance-list'
                className={(navData) =>
                  navData.isActive ? "active-page" : ""
                }
              >
                <Icon icon='mdi:format-list-bulleted' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                Ambulance Category
              </NavLink>
            </li>



            <li>
              <NavLink
                to='/pickup-requests'
                className={(navData) =>
                  navData.isActive ? "active-page" : ""
                }
              >
                <Icon icon='mdi:map-marker' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
              Ambulance Booking Requests
              </NavLink>
            </li>



<li>
              <NavLink
                to='/nurshing_care'
                className={(navData) =>
                  navData.isActive ? "active-page" : ""
                }
              >
                <Icon icon='mdi:nurse' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
              Nursing Care Category 
              </NavLink>
            </li>




<li>
              <NavLink
                to='/nursing-bookings'
                className={(navData) =>
                  navData.isActive ? "active-page" : ""
                }
              >
                <Icon icon='mdi:calendar-check' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
              Nursing Booking  
              </NavLink>
            </li>





<li>
              <NavLink
                to='/DiagnosticBookingList'
                className={(navData) =>
                  navData.isActive ? "active-page" : ""
                }
              >
                <Icon icon='mdi:calendar-check' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
              Diagnostic Bookings 
              </NavLink>
            </li>





           <li>
              <NavLink
                to='/PackageManagement'
                className={(navData) =>
                  navData.isActive ? "active-page" : ""
                }
              >
                <Icon icon='mdi:calendar-check' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
               Package Booking List
              </NavLink>

            </li>


      <li>
              <NavLink
                to='/prescription-delivery'
                className={(navData) =>
                  navData.isActive ? "active-page" : ""
                }
              >
                <Icon icon='mdi:calendar-check' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
         prescription-delivery
              </NavLink>

            </li>






            
      <li>
              <NavLink
                to='/GenericMedicineManagement'
                className={(navData) =>
                  navData.isActive ? "active-page" : ""
                }
              >
                <Icon icon='mdi:calendar-check' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
        Generic Medicine Management
              </NavLink>

            </li>



    <li>
              <NavLink
                to='/razorpay-settings'
                className={(navData) =>
                  navData.isActive ? "active-page" : ""
                }
              >
                <Icon icon='mdi:credit-card' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
       Razorpay Settings
              </NavLink>
            </li>

            <li>
              <NavLink
                to='/app-terms-settings'
                className={(navData) =>
                  navData.isActive ? "active-page" : ""
                }
              >
                <Icon icon='mdi:file-document' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
       App Terms & Conditions
              </NavLink>
            </li>

            <li>
              <NavLink
                to='/app-banner-settings'
                className={(navData) =>
                  navData.isActive ? "active-page" : ""
                }
              >
                <Icon icon='mdi:image-multiple' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
       App Banner Management
              </NavLink>
            </li>

            <li>
              <NavLink
                to='/app-social-media-settings'
                className={(navData) =>
                  navData.isActive ? "active-page" : ""
                }
              >
                <Icon icon='mdi:share-variant' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
       Social Media Management
              </NavLink>
            </li>


          </ul>


          
        </li>





{/* MASTER    DROPDOWN   */}







{/* !  MASTER  */}



<li className='dropdown'>
  <Link to='#'>
    <Icon
      icon='solar:settings-outline'
      className='menu-icon'
    />
    <span>MASTER</span>
  </Link>
  <ul className='sidebar-submenu'>





    {/* Outdoor Master Dropdown */}
    <li className='dropdown'>
      <Link to='#'>
        <Icon icon='mdi:home-outline' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        <span>Outdoor Master</span>
      </Link>
      <ul className='sidebar-submenu'>
        <li>
          <NavLink
            to='/OutdoorParameterSetup'
            className={(navData) => navData.isActive ? "active-page" : ""}
          >
            <Icon icon='mdi:cog' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
            Outdoor Parameter Setup
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/ServiceMaster'
            className={(navData) => navData.isActive ? "active-page" : ""}
          >
            <Icon icon='mdi:room-service' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
            Service Master
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/OutdoorOtherChargeMaster'
            className={(navData) => navData.isActive ? "active-page" : ""}
          >
            <Icon icon='mdi:currency-usd' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
            Outdoor Other Charge Master
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/RoomNoMaster'
            className={(navData) => navData.isActive ? "active-page" : ""}
          >
            <Icon icon='mdi:door' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
            Room No Master
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/VisitTypeGrpMaster'
            className={(navData) => navData.isActive ? "active-page" : ""}
          >
            <Icon icon='mdi:group' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
            Visit Type Group Master
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/ChiefMaster'
            className={(navData) => navData.isActive ? "active-page" : ""}
          >
            <Icon icon='mdi:account-tie' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
            Chief Master
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/DiagoMaster'
            className={(navData) => navData.isActive ? "active-page" : ""}
          >
            <Icon icon='mdi:medical-bag' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
            Diagnosis Master
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/PastHistoryMaster'
            className={(navData) => navData.isActive ? "active-page" : ""}
          >
            <Icon icon='mdi:history' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
            Past History Master
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/DoseMaster'
            className={(navData) => navData.isActive ? "active-page" : ""}
          >
            <Icon icon='mdi:pill' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
            Dose Master
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/AdviceMaster'
            className={(navData) => navData.isActive ? "active-page" : ""}
          >
            <Icon icon='mdi:comment-text' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
            Advice Master
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/VisitourMaster'
            className={(navData) => navData.isActive ? "active-page" : ""}
          >
            <Icon icon='mdi:account-group' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
            Visitor Master
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/VisittypegrpMaster'
            className={(navData) => navData.isActive ? "active-page" : ""}
          >
            <Icon icon='mdi:format-list-group' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
            Visit Type Group Master
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/VisittypeMaster'
            className={(navData) => navData.isActive ? "active-page" : ""}
          >
            <Icon icon='mdi:format-list-bulleted' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
            Visit Type Master
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/CompanymstMaster'
            className={(navData) => navData.isActive ? "active-page" : ""}
          >
            <Icon icon='mdi:office-building' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
            Company Master
          </NavLink>
        </li>
      </ul>
    </li>





<li>
      <NavLink
        to='/AcHeadGroupManagement'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:cog' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
   Account
      </NavLink>
    </li>



    <li>
      <NavLink
        to='/IndoorParameterSetup'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:cog' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        Parameter Setup
      </NavLink>
    </li>

    <li>
      <NavLink
        to='/DepartmentGroup'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:group' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        Department Group  
      </NavLink>
    </li>

    {/* <li>
      <NavLink
        to='/department'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:office-building' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        Department   not   working
      </NavLink>
    </li> */}

    {/* <li>
      <NavLink
        to='/department2'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:office-building-outline' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        Department2  not  working 
      </NavLink>
    </li> */}

    <li>
      <NavLink
        to='/BedMaster'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:bed' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        Bed Master
      </NavLink>
    </li>

    <li>
      <NavLink
        to='/ReligionMaster'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:cross' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        ReligionMaster    
      </NavLink>
    </li>

    {/* <li>
      <NavLink
        to='/nurse'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:nurse' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        Nurse    not   working
      </NavLink>
    </li> */}

    {/* <li>
      <NavLink
        to='/nurse-station-master'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:hospital-marker' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        Nurse Station Master    not   working  
      </NavLink>
    </li> */}

    <li>
      <NavLink
        to='/DayCareBedRate'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:currency-usd' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        Day Care Bed Rate  
      </NavLink>
    </li>

    <li>
      <NavLink
        to='/OTMaster'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:medical-bag' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        O.T. Master
      </NavLink>
    </li>

    <li>
      <NavLink
        to='/OTSlotMaster'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:clock-outline' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        O.T. Slot Master
      </NavLink>
    </li>

    <li>
      <NavLink
        to='/OTType'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:format-list-bulleted-type' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        OT Type
      </NavLink>
    </li>




  <li>
      <NavLink
        to='/OTCategory'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:format-list-bulleted-type' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        OT Category
      </NavLink>
    </li>








    <li>
      <NavLink
        to='/OTItemMaster'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:package-variant' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        OT Item
      </NavLink>
    </li>

    <li>
      <NavLink
        to='/CashlessMaster'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:credit-card' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        Cash less Master
      </NavLink>
    </li>

    <li>
      <NavLink
        to='/consent-master'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:file-document-check' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        Consent Master    --    there   are  no  page   
      </NavLink>
    </li>

    <li>
      <NavLink
        to='/BillPrintHeadMaster'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:printer' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        Bill Print Head
      </NavLink>
    </li>

    <li>
      <NavLink
        to='/OtherChargesMaster'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:currency-usd' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        Other Charges Master
      </NavLink>
    </li>



   

    <li>
      <NavLink
        to='/CompanyWiseBedRate'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:bed' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        Company Wise Bed Rate (NOT  FIND  THIS   TABLE)
      </NavLink>
    </li>


    <li>
      <NavLink
        to='/company-wise-ot-item-rate'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:medical-bag' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        Company Wise OT Item Rate   --   not   working  
      </NavLink>
    </li>



    <li>
      <NavLink
        to='/CompanyWiseOtherChargesMaster'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:currency-usd' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        Company Wise Others Charges   ----   time   stamp  01.21.41  why  i  use   it   
      </NavLink>
    </li>



    <li>
      <NavLink
        to='/ReferalMaster'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:account-arrow-right' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        Company wise referal 
      </NavLink>
    </li>

    <li>
      <NavLink
        to='/doctor-test-rate'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:test-tube' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        Doctor test rate 
      </NavLink>
    </li>

    <li>
      <NavLink
        to='/PackageMasterList'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:package' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        Package Master
      </NavLink>
    </li>

    <li>
      <NavLink
        to='/package-othercharge'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:package-variant-closed' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        Package Other charge
      </NavLink>
    </li>




   <li>
      <NavLink
        to='/MExecutiveMaster'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:account-arrow-right' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        MExecutive Master
      </NavLink>
    </li>


    <li>
      <NavLink
        to='/ReferalMaster'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:account-arrow-right' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        Referal Master
      </NavLink>
    </li>



 


    <li>
      <NavLink
        to='/DiseaseMaster'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:virus' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        Disease Master
      </NavLink>
    </li>

    <li>
      <NavLink
        to='/MedicinMaster'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:pill' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        Medicine(have   a  black  data  in  video)
      </NavLink>
    </li>

    <li>
      <NavLink
        to='/WardMaster'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:package-variant' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        Batch(have   a  black  data  in  video)
      </NavLink>
    </li>

    <li>
      <NavLink
        to='/CashPaymentHeadMaster'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:cash' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        Cash Payment Head
      </NavLink>
    </li>

    <li>
      <NavLink
        to='/diet-chart'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:food-apple' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        Diet Chart  --   not   work  ing(use   pdf  )
      </NavLink>
    </li>

    <li>
      <NavLink
        to='/DischargeTemplateMaster'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:file-document-outline' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        Discharge Template Head
      </NavLink>
    </li>

    <li>
      <NavLink
        to='/AppointmentMaster'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:clipboard-text' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        Discharge Advise Template  --   have   no page   
      </NavLink>
    </li>

    <li>
      <NavLink
        to='/CoPaymentMaster'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:cash-multiple' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        Co Payment
      </NavLink>
    </li>

    <li>
      <NavLink
        to='/MarketingExecutiveMaster'
        className={(navData) =>
          navData.isActive ? "active-page" : ""
        }
      >
        <Icon icon='mdi:account-tie' className='menu-icon' style={{fontSize: '14px', marginRight: '8px'}} />
        MARKETING EXECUTIVE
      </NavLink>
    </li>
  </ul>
</li>









    
          </ul>
        </div>
      </aside>

      <main
        className={sidebarActive ? "dashboard-main active" : "dashboard-main"}
      >
        <div className='navbar-header'>
          <div className='row align-items-center justify-content-between'>
            <div className='col-auto'>
              <div className='d-flex flex-wrap align-items-center gap-4'>
                <button
                  type='button'
                  className='sidebar-toggle'
                  onClick={sidebarControl}
                >
                  {sidebarActive ? (
                    <Icon
                      icon='iconoir:arrow-right'
                      className='icon text-2xl non-active'
                    />
                  ) : (
                    <Icon
                      icon='heroicons:bars-3-solid'
                      className='icon text-2xl non-active '
                    />
                  )}
                </button>
                <button
                  onClick={mobileMenuControl}
                  type='button'
                  className='sidebar-mobile-toggle'
                >
                  <Icon icon='heroicons:bars-3-solid' className='icon' />
                </button>
                <form className='navbar-search'>
                  <input type='text' name='search' placeholder='Search' />
                  <Icon icon='ion:search-outline' className='icon' />
                </form>
              </div>
            </div>
            <div className='col-auto'>
              <div className='d-flex flex-wrap align-items-center gap-3'>
                {/* ThemeToggleButton */}
                <ThemeToggleButton />
                <div className='dropdown d-none d-sm-inline-block'>
                  <button
                    className='has-indicator w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center'
                    type='button'
                    data-bs-toggle='dropdown'
                  >
                    <img
                      src='assets/images/lang-flag.png'
                      alt='Wowdash'
                      className='w-24 h-24 object-fit-cover rounded-circle'
                    />
                  </button>
                  <div className='dropdown-menu to-top dropdown-menu-sm'>
                    <div className='py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2'>
                      <div>
                        <h6 className='text-lg text-primary-light fw-semibold mb-0'>
                          Choose Your Language
                        </h6>
                      </div>
                    </div>
                    <div className='max-h-400-px overflow-y-auto scroll-sm pe-8'>
                      <div className='form-check style-check d-flex align-items-center justify-content-between mb-16'>
                        <label
                          className='form-check-label line-height-1 fw-medium text-secondary-light'
                          htmlFor='english'
                        >
                          <span className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                            <img
                              src='assets/images/flags/flag1.png'
                              alt=''
                              className='w-36-px h-36-px bg-success-subtle text-success-main rounded-circle flex-shrink-0'
                            />
                            <span className='text-md fw-semibold mb-0'>
                              English
                            </span>
                          </span>
                        </label>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='crypto'
                          id='english'
                        />
                      </div>
                      <div className='form-check style-check d-flex align-items-center justify-content-between mb-16'>
                        <label
                          className='form-check-label line-height-1 fw-medium text-secondary-light'
                          htmlFor='japan'
                        >
                          <span className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                            <img
                              src='assets/images/flags/flag2.png'
                              alt=''
                              className='w-36-px h-36-px bg-success-subtle text-success-main rounded-circle flex-shrink-0'
                            />
                            <span className='text-md fw-semibold mb-0'>
                              Japan
                            </span>
                          </span>
                        </label>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='crypto'
                          id='japan'
                        />
                      </div>
                      <div className='form-check style-check d-flex align-items-center justify-content-between mb-16'>
                        <label
                          className='form-check-label line-height-1 fw-medium text-secondary-light'
                          htmlFor='france'
                        >
                          <span className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                            <img
                              src='assets/images/flags/flag3.png'
                              alt=''
                              className='w-36-px h-36-px bg-success-subtle text-success-main rounded-circle flex-shrink-0'
                            />
                            <span className='text-md fw-semibold mb-0'>
                              France
                            </span>
                          </span>
                        </label>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='crypto'
                          id='france'
                        />
                      </div>
                      <div className='form-check style-check d-flex align-items-center justify-content-between mb-16'>
                        <label
                          className='form-check-label line-height-1 fw-medium text-secondary-light'
                          htmlFor='germany'
                        >
                          <span className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                            <img
                              src='assets/images/flags/flag4.png'
                              alt=''
                              className='w-36-px h-36-px bg-success-subtle text-success-main rounded-circle flex-shrink-0'
                            />
                            <span className='text-md fw-semibold mb-0'>
                              Germany
                            </span>
                          </span>
                        </label>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='crypto'
                          id='germany'
                        />
                      </div>
                      <div className='form-check style-check d-flex align-items-center justify-content-between mb-16'>
                        <label
                          className='form-check-label line-height-1 fw-medium text-secondary-light'
                          htmlFor='korea'
                        >
                          <span className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                            <img
                              src='assets/images/flags/flag5.png'
                              alt=''
                              className='w-36-px h-36-px bg-success-subtle text-success-main rounded-circle flex-shrink-0'
                            />
                            <span className='text-md fw-semibold mb-0'>
                              South Korea
                            </span>
                          </span>
                        </label>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='crypto'
                          id='korea'
                        />
                      </div>
                      <div className='form-check style-check d-flex align-items-center justify-content-between mb-16'>
                        <label
                          className='form-check-label line-height-1 fw-medium text-secondary-light'
                          htmlFor='bangladesh'
                        >
                          <span className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                            <img
                              src='assets/images/flags/flag6.png'
                              alt=''
                              className='w-36-px h-36-px bg-success-subtle text-success-main rounded-circle flex-shrink-0'
                            />
                            <span className='text-md fw-semibold mb-0'>
                              Bangladesh
                            </span>
                          </span>
                        </label>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='crypto'
                          id='bangladesh'
                        />
                      </div>
                      <div className='form-check style-check d-flex align-items-center justify-content-between mb-16'>
                        <label
                          className='form-check-label line-height-1 fw-medium text-secondary-light'
                          htmlFor='india'
                        >
                          <span className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                            <img
                              src='assets/images/flags/flag7.png'
                              alt=''
                              className='w-36-px h-36-px bg-success-subtle text-success-main rounded-circle flex-shrink-0'
                            />
                            <span className='text-md fw-semibold mb-0'>
                              India
                            </span>
                          </span>
                        </label>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='crypto'
                          id='india'
                        />
                      </div>
                      <div className='form-check style-check d-flex align-items-center justify-content-between'>
                        <label
                          className='form-check-label line-height-1 fw-medium text-secondary-light'
                          htmlFor='canada'
                        >
                          <span className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                            <img
                              src='assets/images/flags/flag8.png'
                              alt=''
                              className='w-36-px h-36-px bg-success-subtle text-success-main rounded-circle flex-shrink-0'
                            />
                            <span className='text-md fw-semibold mb-0'>
                              Canada
                            </span>
                          </span>
                        </label>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='crypto'
                          id='canada'
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Language dropdown end */}
                <div className='dropdown'>
                  <button
                    className='has-indicator w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center'
                    type='button'
                    data-bs-toggle='dropdown'
                  >
                    <Icon
                      icon='mage:email'
                      className='text-primary-light text-xl'
                    />
                  </button>
                  <div className='dropdown-menu to-top dropdown-menu-lg p-0'>
                    <div className='m-16 py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2'>
                      <div>
                        <h6 className='text-lg text-primary-light fw-semibold mb-0'>
                          Message
                        </h6>
                      </div>
                      <span className='text-primary-600 fw-semibold text-lg w-40-px h-40-px rounded-circle bg-base d-flex justify-content-center align-items-center'>
                        05
                      </span>
                    </div>
                    <div className='max-h-400-px overflow-y-auto scroll-sm pe-4'>
                      <Link
                        to='#'
                        className='px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between'
                      >
                        <div className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                          <span className='w-40-px h-40-px rounded-circle flex-shrink-0 position-relative'>
                            <img
                              src='assets/images/notification/profile-3.png'
                              alt=''
                            />
                            <span className='w-8-px h-8-px bg-success-main rounded-circle position-absolute end-0 bottom-0' />
                          </span>
                          <div>
                            <h6 className='text-md fw-semibold mb-4'>
                              Kathryn Murphy
                            </h6>
                            <p className='mb-0 text-sm text-secondary-light text-w-100-px'>
                              hey! there i’m...
                            </p>
                          </div>
                        </div>
                        <div className='d-flex flex-column align-items-end'>
                          <span className='text-sm text-secondary-light flex-shrink-0'>
                            12:30 PM
                          </span>
                          <span className='mt-4 text-xs text-base w-16-px h-16-px d-flex justify-content-center align-items-center bg-warning-main rounded-circle'>
                            8
                          </span>
                        </div>
                      </Link>
                      <Link
                        to='#'
                        className='px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between'
                      >
                        <div className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                          <span className='w-40-px h-40-px rounded-circle flex-shrink-0 position-relative'>
                            <img
                              src='assets/images/notification/profile-4.png'
                              alt=''
                            />
                            <span className='w-8-px h-8-px  bg-neutral-300 rounded-circle position-absolute end-0 bottom-0' />
                          </span>
                          <div>
                            <h6 className='text-md fw-semibold mb-4'>
                              Kathryn Murphy
                            </h6>
                            <p className='mb-0 text-sm text-secondary-light text-w-100-px'>
                              hey! there i’m...
                            </p>
                          </div>
                        </div>
                        <div className='d-flex flex-column align-items-end'>
                          <span className='text-sm text-secondary-light flex-shrink-0'>
                            12:30 PM
                          </span>
                          <span className='mt-4 text-xs text-base w-16-px h-16-px d-flex justify-content-center align-items-center bg-warning-main rounded-circle'>
                            2
                          </span>
                        </div>
                      </Link>
                      <Link
                        to='#'
                        className='px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between bg-neutral-50'
                      >
                        <div className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                          <span className='w-40-px h-40-px rounded-circle flex-shrink-0 position-relative'>
                            <img
                              src='assets/images/notification/profile-5.png'
                              alt=''
                            />
                            <span className='w-8-px h-8-px bg-success-main rounded-circle position-absolute end-0 bottom-0' />
                          </span>
                          <div>
                            <h6 className='text-md fw-semibold mb-4'>
                              Kathryn Murphy
                            </h6>
                            <p className='mb-0 text-sm text-secondary-light text-w-100-px'>
                              hey! there i’m...
                            </p>
                          </div>
                        </div>
                        <div className='d-flex flex-column align-items-end'>
                          <span className='text-sm text-secondary-light flex-shrink-0'>
                            12:30 PM
                          </span>
                          <span className='mt-4 text-xs text-base w-16-px h-16-px d-flex justify-content-center align-items-center bg-neutral-400 rounded-circle'>
                            0
                          </span>
                        </div>
                      </Link>
                      <Link
                        to='#'
                        className='px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between bg-neutral-50'
                      >
                        <div className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                          <span className='w-40-px h-40-px rounded-circle flex-shrink-0 position-relative'>
                            <img
                              src='assets/images/notification/profile-6.png'
                              alt=''
                            />
                            <span className='w-8-px h-8-px bg-neutral-300 rounded-circle position-absolute end-0 bottom-0' />
                          </span>
                          <div>
                            <h6 className='text-md fw-semibold mb-4'>
                              Kathryn Murphy
                            </h6>
                            <p className='mb-0 text-sm text-secondary-light text-w-100-px'>
                              hey! there i’m...
                            </p>
                          </div>
                        </div>
                        <div className='d-flex flex-column align-items-end'>
                          <span className='text-sm text-secondary-light flex-shrink-0'>
                            12:30 PM
                          </span>
                          <span className='mt-4 text-xs text-base w-16-px h-16-px d-flex justify-content-center align-items-center bg-neutral-400 rounded-circle'>
                            0
                          </span>
                        </div>
                      </Link>
                      <Link
                        to='#'
                        className='px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between'
                      >
                        <div className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                          <span className='w-40-px h-40-px rounded-circle flex-shrink-0 position-relative'>
                            <img
                              src='assets/images/notification/profile-7.png'
                              alt=''
                            />
                            <span className='w-8-px h-8-px bg-success-main rounded-circle position-absolute end-0 bottom-0' />
                          </span>
                          <div>
                            <h6 className='text-md fw-semibold mb-4'>
                              Kathryn Murphy
                            </h6>
                            <p className='mb-0 text-sm text-secondary-light text-w-100-px'>
                              hey! there i’m...
                            </p>
                          </div>
                        </div>
                        <div className='d-flex flex-column align-items-end'>
                          <span className='text-sm text-secondary-light flex-shrink-0'>
                            12:30 PM
                          </span>
                          <span className='mt-4 text-xs text-base w-16-px h-16-px d-flex justify-content-center align-items-center bg-warning-main rounded-circle'>
                            8
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className='text-center py-12 px-16'>
                      <Link
                        to='#'
                        className='text-primary-600 fw-semibold text-md'
                      >
                        See All Message
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Message dropdown end */}
                <div className='dropdown'>
                  <button
                    className='has-indicator w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center'
                    type='button'
                    data-bs-toggle='dropdown'
                  >
                    <Icon
                      icon='iconoir:bell'
                      className='text-primary-light text-xl'
                    />
                  </button>
                  <div className='dropdown-menu to-top dropdown-menu-lg p-0'>
                    <div className='m-16 py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2'>
                      <div>
                        <h6 className='text-lg text-primary-light fw-semibold mb-0'>
                          Notifications
                        </h6>
                      </div>
                      <span className='text-primary-600 fw-semibold text-lg w-40-px h-40-px rounded-circle bg-base d-flex justify-content-center align-items-center'>
                        05
                      </span>
                    </div>
                    <div className='max-h-400-px overflow-y-auto scroll-sm pe-4'>
                      <Link
                        to='#'
                        className='px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between'
                      >
                        <div className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                          <span className='w-44-px h-44-px bg-success-subtle text-success-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0'>
                            <Icon
                              icon='bitcoin-icons:verify-outline'
                              className='icon text-xxl'
                            />
                          </span>
                          <div>
                            <h6 className='text-md fw-semibold mb-4'>
                              Congratulations
                            </h6>
                            <p className='mb-0 text-sm text-secondary-light text-w-200-px'>
                              Your profile has been Verified. Your profile has
                              been Verified
                            </p>
                          </div>
                        </div>
                        <span className='text-sm text-secondary-light flex-shrink-0'>
                          23 Mins ago
                        </span>
                      </Link>
                      <Link
                        to='#'
                        className='px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between bg-neutral-50'
                      >
                        <div className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                          <span className='w-44-px h-44-px bg-success-subtle text-success-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0'>
                            <img
                              src='assets/images/notification/profile-1.png'
                              alt=''
                            />
                          </span>
                          <div>
                            <h6 className='text-md fw-semibold mb-4'>
                              Ronald Richards
                            </h6>
                            <p className='mb-0 text-sm text-secondary-light text-w-200-px'>
                              You can stitch between artboards
                            </p>
                          </div>
                        </div>
                        <span className='text-sm text-secondary-light flex-shrink-0'>
                          23 Mins ago
                        </span>
                      </Link>
                      <Link
                        to='#'
                        className='px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between'
                      >
                        <div className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                          <span className='w-44-px h-44-px bg-info-subtle text-info-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0'>
                            AM
                          </span>
                          <div>
                            <h6 className='text-md fw-semibold mb-4'>
                              Arlene McCoy
                            </h6>
                            <p className='mb-0 text-sm text-secondary-light text-w-200-px'>
                              Invite you to prototyping
                            </p>
                          </div>
                        </div>
                        <span className='text-sm text-secondary-light flex-shrink-0'>
                          23 Mins ago
                        </span>
                      </Link>
                      <Link
                        to='#'
                        className='px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between bg-neutral-50'
                      >
                        <div className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                          <span className='w-44-px h-44-px bg-success-subtle text-success-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0'>
                            <img
                              src='assets/images/notification/profile-2.png'
                              alt=''
                            />
                          </span>
                          <div>
                            <h6 className='text-md fw-semibold mb-4'>
                              Annette Black
                            </h6>
                            <p className='mb-0 text-sm text-secondary-light text-w-200-px'>
                              Invite you to prototyping
                            </p>
                          </div>
                        </div>
                        <span className='text-sm text-secondary-light flex-shrink-0'>
                          23 Mins ago
                        </span>
                      </Link>
                      <Link
                        to='#'
                        className='px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between'
                      >
                        <div className='text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'>
                          <span className='w-44-px h-44-px bg-info-subtle text-info-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0'>
                            DR
                          </span>
                          <div>
                            <h6 className='text-md fw-semibold mb-4'>
                              Darlene Robertson
                            </h6>
                            <p className='mb-0 text-sm text-secondary-light text-w-200-px'>
                              Invite you to prototyping
                            </p>
                          </div>
                        </div>
                        <span className='text-sm text-secondary-light flex-shrink-0'>
                          23 Mins ago
                        </span>
                      </Link>
                    </div>
                    <div className='text-center py-12 px-16'>
                      <Link
                        to='#'
                        className='text-primary-600 fw-semibold text-md'
                      >
                        See All Notification
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Notification dropdown end */}
                <div className='dropdown'>
                  <button
                    className='d-flex justify-content-center align-items-center rounded-circle'
                    type='button'
                    data-bs-toggle='dropdown'
                  >
                    <img
                      src='assets/images/user.png'
                      alt='image_user'
                      className='w-40-px h-40-px object-fit-cover rounded-circle'
                    />
                  </button>
                  <div className='dropdown-menu to-top dropdown-menu-sm'>
                    <div className='py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2'>
                      <div>
                        <h6 className='text-lg text-primary-light fw-semibold mb-2'>
                          Shaidul Islam
                        </h6>
                        <span className='text-secondary-light fw-medium text-sm'>
                          Admin
                        </span>
                      </div>
                      <button type='button' className='hover-text-danger'>
                        <Icon
                          icon='radix-icons:cross-1'
                          className='icon text-xl'
                        />
                      </button>
                    </div>
                    <ul className='to-top-list'>
                      <li>
                        <Link
                          className='dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'
                          to='/view-profile'
                        >
                          <Icon
                            icon='solar:user-linear'
                            className='icon text-xl'
                          />{" "}
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          className='dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'
                          to='/email'
                        >
                          <Icon
                            icon='tabler:message-check'
                            className='icon text-xl'
                          />{" "}
                          Inbox
                        </Link>
                      </li>
                      <li>
                        <Link
                          className='dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'
                          to='/company'
                        >
                          <Icon
                            icon='icon-park-outline:setting-two'
                            className='icon text-xl'
                          />
                          Setting
                        </Link>
                      </li>
                      <li>
                        <button
                          className='dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-danger d-flex align-items-center gap-3'
                          onClick={handleLogout}
                          style={{border: 'none', background: 'none', width: '100%', textAlign: 'left'}}
                        >
                          <Icon icon='lucide:power' className='icon text-xl' />{" "}
                          Log Out
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Profile dropdown end */}
              </div>
            </div>
          </div>
        </div>

        {/* dashboard-main-body */}
        <div className='dashboard-main-body'>{children}</div>

        {/* Footer section */}
        <footer className='d-footer'>
          <div className='row align-items-center justify-content-between'>
            <div className='col-auto'>
              <p className='mb-0'>© 2025 Lords Health Care. All Rights Reserved.</p>
            </div>
            <div className='col-auto'>
              <p className='mb-0'>
                Made by <span className='text-primary-600'>Lords Health Care</span>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </section>
  );
};

export default MasterLayout;
























