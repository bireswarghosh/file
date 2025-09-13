import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';

const AppointmentBookingMenu = () => {
  return (
    <li className='dropdown'>
      <Link to='#'>
        <Icon
          icon='mdi:calendar-clock'
          className='menu-icon'
        />
        <span>APPOINTMENT BOOKING APP</span>
      </Link>
      <ul className='sidebar-submenu'>
        <li className='dropdown'>
          <Link to='#'>
            <Icon icon='mdi:ambulance' className='menu-icon' style={{fontSize: '16px', marginRight: '8px'}} />
            <span>AMBULANCE</span>
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
       
       

    <li>
              <NavLink
                to='/DoctorAppointments'
                className={(navData) =>
                  navData.isActive ? "active-page" : ""
                }
              >
                <Icon icon='mdi:format-list-bulleted' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                Doctor Appointments
              </NavLink>
            </li>


       
       
       
       
       
            <li>
              <NavLink
                to='/ambulance-list'
                className={(navData) =>
                  navData.isActive ? "active-page" : ""
                }
              >
                <Icon icon='mdi:format-list-bulleted' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
                Ambulance List
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
                Pickup Requests
              </NavLink>
            </li>



<li>
              <NavLink
                to='/nurshing_care'
                className={(navData) =>
                  navData.isActive ? "active-page" : ""
                }
              >
                <Icon icon='mdi:map-marker' className='menu-icon' style={{fontSize: '12px', marginRight: '6px'}} />
              Nursing Care
              </NavLink>
            </li>




          </ul>


          
        </li>
      </ul>
    </li>
  );
};

export default AppointmentBookingMenu;