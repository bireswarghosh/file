import React, { useState, useEffect } from "react";
import { Form, Card, Row, Col, Button, Badge, Collapse } from "react-bootstrap";
import MasterLayout from "../../../MasterLayout";
import PatientDetailsCard from "./PatientDetailsCard";
import DoctorDetailsCard from "./DoctorDetailsCard";
import BillingDetailsCard from "./BillingDetailsCard";
import PaymentDetailsCard from "./PaymentDetailsCard";
import axiosInstance from "../../../../axiosInstance";
import './OutdoorBooking.css';

const CollapsibleForm = ({ formData, handleChange, handleSubmit, isSubmitting, validated, religions, departments, setFormData }) => {
  const [openSections, setOpenSections] = useState({
    booking: true,
    registration: false,
    patient: false,
    doctor: false,
    billing: false,
    payment: false
  });

  const calculateProgress = () => {
    let completed = 0;
    let total = 6;
    
    if (formData.Booking && formData.AdmitionDate && formData.AdmitionTime) completed++;
    if (formData.OPD && formData.PatientName && formData.PhoneNo) completed++;
    if (formData.GurdianName && formData.Sex && formData.dob && formData.Age && formData.Weight) completed++;
    if (formData.DepartmentId && formData.doctorId) completed++;
    if (formData.billNo && formData.billAmt) completed++;
    if (formData.receiptAmount && parseFloat(formData.receiptAmount) > 0) completed++;
    
    return Math.round((completed / total) * 100);
  };

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getSectionProgress = (section) => {
    switch(section) {
      case 'booking':
        return (formData.Booking && formData.AdmitionDate && formData.AdmitionTime) ? 100 : 0;
      case 'registration':
        return (formData.OPD && formData.PatientName && formData.PhoneNo) ? 100 : 0;
      case 'patient':
        return (formData.GurdianName && formData.Sex && formData.dob && formData.Age && formData.Weight) ? 100 : 0;
      case 'doctor':
        return (formData.DepartmentId && formData.doctorId) ? 100 : 0;
      case 'billing':
        return (formData.billNo && formData.billAmt) ? 100 : 0;
      case 'payment':
        return (formData.receiptAmount && parseFloat(formData.receiptAmount) > 0) ? 100 : 0;
      default:
        return 0;
    }
  };

  return (
    <MasterLayout>
      <div className="outdoor-booking-container">
        <div className="page-header mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="page-title mb-1">Outdoor Patient Registration</h5>
              <p className="page-subtitle mb-0">Complete patient information and booking details</p>
            </div>
            <div className="d-flex align-items-center">
              <div className="progress-circle me-3" style={{ width: '60px', height: '60px', position: 'relative' }}>
                <svg width="60" height="60" className="progress-ring">
                  <circle cx="30" cy="30" r="25" stroke="#e9ecef" strokeWidth="4" fill="transparent" />
                  <circle
                    cx="30" cy="30" r="25" stroke="#28a745" strokeWidth="4" fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 25}`}
                    strokeDashoffset={`${2 * Math.PI * 25 * (1 - calculateProgress() / 100)}`}
                    style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                  />
                </svg>
                <div className="progress-text" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '12px', fontWeight: 'bold' }}>
                  {calculateProgress()}%
                </div>
              </div>
              <Badge bg="success" className="status-badge">Progress: {calculateProgress()}%</Badge>
            </div>
          </div>
        </div>
        
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="modern-form">
          <div className="row">
            {/* Booking Section */}
            <div className="col-lg-12">
              <Card className="modern-card booking-card mb-4 shadow-sm">
                <Card.Header className="modern-card-header collapsible-header" onClick={() => toggleSection('booking')} style={{ cursor: 'pointer' }}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-calendar-check me-2"></i>
                      <h5 className="mb-0">Booking Information</h5>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className={`badge me-2 ${getSectionProgress('booking') === 100 ? 'bg-success' : 'bg-warning'}`}>
                        {getSectionProgress('booking')}% Complete
                      </span>
                      <i className={`fas fa-chevron-${openSections.booking ? 'up' : 'down'}`}></i>
                    </div>
                  </div>
                </Card.Header>
                <Collapse in={openSections.booking}>
                  <Card.Body className="modern-card-body">
                    <Row className="g-3">
                      <Col md={6} lg={2}>
                        <div className="form-group">
                          <label htmlFor="Booking" className="form-label modern-label">
                            <i className="fas fa-clock me-1"></i>Advance Booking
                          </label>
                          <select id="Booking" name="Booking" className="form-select modern-input" value={formData.Booking} onChange={handleChange} required>
                            <option value="">Select...</option>
                            <option value="N">No</option>
                            <option value="Y">Yes</option>
                          </select>
                        </div>
                      </Col>
                      <Col md={6} lg={2}>
                        <div className="form-group">
                          <label htmlFor="AdmitionDate" className="form-label modern-label">
                            <i className="fas fa-calendar me-1"></i>Visit Date
                          </label>
                          <input type="date" id="AdmitionDate" name="AdmitionDate" className="form-control modern-input" value={formData.AdmitionDate} onChange={handleChange} required />
                        </div>
                      </Col>
                      <Col md={6} lg={2}>
                        <div className="form-group">
                          <label htmlFor="AdmitionTime" className="form-label modern-label">
                            <i className="fas fa-clock me-1"></i>Visit Time
                          </label>
                          <input type="time" id="AdmitionTime" name="AdmitionTime" className="form-control modern-input" value={formData.AdmitionTime} onChange={handleChange} required />
                        </div>
                      </Col>
                      <Col md={6} lg={2}>
                        <div className="form-group">
                          <label className="form-label modern-label">&nbsp;</label>
                          <div className="form-check modern-checkbox">
                            <input className="form-check-input" type="checkbox" name="quota" id="quotaCheck" checked={formData.quota} onChange={handleChange} />
                            <label className="form-check-label modern-label" htmlFor="quotaCheck">
                              <i className="fas fa-star me-1"></i>Quota
                            </label>
                          </div>
                        </div>
                      </Col>
                      <Col md={6} lg={2}>
                        <div className="form-group">
                          <label className="form-label modern-label">
                            <i className="fas fa-list-ol me-1"></i>Queue No.
                          </label>
                          <input type="number" name="queueNo" className="form-control modern-input" value={formData.queueNo} onChange={handleChange} readOnly />
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Collapse>
              </Card>
            </div>

            {/* Registration Section */}
            <div className="col-lg-12">
              <Card className="modern-card registration-card mb-4 shadow-sm">
                <Card.Header className="modern-card-header collapsible-header" onClick={() => toggleSection('registration')} style={{ cursor: 'pointer' }}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-user-plus me-2"></i>
                      <h5 className="mb-0">Registration Details</h5>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className={`badge me-2 ${getSectionProgress('registration') === 100 ? 'bg-success' : 'bg-warning'}`}>
                        {getSectionProgress('registration')}% Complete
                      </span>
                      <i className={`fas fa-chevron-${openSections.registration ? 'up' : 'down'}`}></i>
                    </div>
                  </div>
                </Card.Header>
                <Collapse in={openSections.registration}>
                  <Card.Body className="modern-card-body">
                    <Row className="g-3">
                      <Col md={6} lg={3}>
                        <div className="form-group">
                          <label htmlFor="OPD" className="form-label modern-label">
                            <i className="fas fa-user-check me-1"></i>Registration Type
                          </label>
                          <select id="OPD" name="OPD" className="form-select modern-input" value={formData.OPD} onChange={handleChange} required>
                            <option value="">Select...</option>
                            <option value="Y">New Registration</option>
                            <option value="N">Existing Patient</option>
                          </select>
                        </div>
                      </Col>
                      <Col md={6} lg={4}>
                        <div className="form-group">
                          <label htmlFor="PatientName" className="form-label modern-label">
                            <i className="fas fa-user me-1"></i>Patient's Name *
                          </label>
                          <input type="text" id="PatientName" name="PatientName" className="form-control modern-input" style={{ textTransform: 'uppercase' }} value={formData.PatientName} onChange={handleChange} placeholder="Enter patient's full name" required />
                        </div>
                      </Col>
                      <Col md={6} lg={3}>
                        <div className="form-group">
                          <label htmlFor="PhoneNo" className="form-label modern-label">
                            <i className="fas fa-phone me-1"></i>Phone Number *
                          </label>
                          <input type="text" id="PhoneNo" name="PhoneNo" className="form-control modern-input" value={formData.PhoneNo} onChange={handleChange} placeholder="Enter 10-digit phone number" maxLength="10" />
                        </div>
                      </Col>
                      <Col md={6} lg={2}>
                        <div className="form-group">
                          <label className="form-label modern-label">&nbsp;</label>
                          <Button type="button" className="modern-btn search-btn w-100" style={{ display: formData.OPD === 'Y' ? 'none' : 'block' }}>
                            <i className="fas fa-search me-2"></i>Search
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Collapse>
              </Card>
            </div>

            {/* Patient Details */}
            <div className="col-lg-12">
              <Card className="modern-card patient-card mb-4 shadow-sm">
                <Card.Header className="modern-card-header collapsible-header" onClick={() => toggleSection('patient')} style={{ cursor: 'pointer' }}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-user-injured me-2"></i>
                      <h5 className="mb-0">Patient Information</h5>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className={`badge me-2 ${getSectionProgress('patient') === 100 ? 'bg-success' : 'bg-warning'}`}>
                        {getSectionProgress('patient')}% Complete
                      </span>
                      <i className={`fas fa-chevron-${openSections.patient ? 'up' : 'down'}`}></i>
                    </div>
                  </div>
                </Card.Header>
                <Collapse in={openSections.patient}>
                  <Card.Body className="modern-card-body">
                    <PatientDetailsCard formData={formData} handleChange={handleChange} religions={religions} />
                  </Card.Body>
                </Collapse>
              </Card>
            </div>

            {/* Doctor Details */}
            <div className="col-lg-12">
              <Card className="modern-card doctor-card mb-4 shadow-sm">
                <Card.Header className="modern-card-header collapsible-header" onClick={() => toggleSection('doctor')} style={{ cursor: 'pointer' }}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-user-md me-2"></i>
                      <h5 className="mb-0">Doctor & Department Selection</h5>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className={`badge me-2 ${getSectionProgress('doctor') === 100 ? 'bg-success' : 'bg-warning'}`}>
                        {getSectionProgress('doctor')}% Complete
                      </span>
                      <i className={`fas fa-chevron-${openSections.doctor ? 'up' : 'down'}`}></i>
                    </div>
                  </div>
                </Card.Header>
                <Collapse in={openSections.doctor}>
                  <Card.Body className="modern-card-body">
                    <DoctorDetailsCard formData={formData} setFormData={setFormData} handleChange={handleChange} departments={departments} />
                  </Card.Body>
                </Collapse>
              </Card>
            </div>

            {/* Billing Details */}
            <div className="col-lg-12">
              <Card className="modern-card billing-card mb-4 shadow-sm">
                <Card.Header className="modern-card-header collapsible-header" onClick={() => toggleSection('billing')} style={{ cursor: 'pointer' }}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-file-invoice-dollar me-2"></i>
                      <h5 className="mb-0">Billing Information</h5>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className={`badge me-2 ${getSectionProgress('billing') === 100 ? 'bg-success' : 'bg-warning'}`}>
                        {getSectionProgress('billing')}% Complete
                      </span>
                      <i className={`fas fa-chevron-${openSections.billing ? 'up' : 'down'}`}></i>
                    </div>
                  </div>
                </Card.Header>
                <Collapse in={openSections.billing}>
                  <Card.Body className="modern-card-body">
                    <BillingDetailsCard formData={formData} handleChange={handleChange} />
                  </Card.Body>
                </Collapse>
              </Card>
            </div>

            {/* Payment Details */}
            <div className="col-lg-12">
              <Card className="modern-card payment-card mb-4 shadow-sm">
                <Card.Header className="modern-card-header collapsible-header" onClick={() => toggleSection('payment')} style={{ cursor: 'pointer' }}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-credit-card me-2"></i>
                      <h5 className="mb-0">Multiple Payment Methods</h5>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className={`badge me-2 ${getSectionProgress('payment') === 100 ? 'bg-success' : 'bg-warning'}`}>
                        {getSectionProgress('payment')}% Complete
                      </span>
                      <i className={`fas fa-chevron-${openSections.payment ? 'up' : 'down'}`}></i>
                    </div>
                  </div>
                </Card.Header>
                <Collapse in={openSections.payment}>
                  <Card.Body className="modern-card-body">
                    <PaymentDetailsCard formData={formData} handleChange={handleChange} />
                  </Card.Body>
                </Collapse>
              </Card>
            </div>

            {/* Submit Button */}
            <div className="col-12 text-center mb-4">
              <div className="submit-section">
                <Button type="submit" size="lg" className="modern-btn submit-btn px-5 py-3" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin me-2"></i>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save me-2"></i>
                      Register Patient
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </MasterLayout>
  );
};

export default CollapsibleForm;