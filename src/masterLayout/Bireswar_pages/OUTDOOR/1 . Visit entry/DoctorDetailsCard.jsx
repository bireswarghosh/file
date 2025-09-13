import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import DoctorSelect from './DoctorSelect';

const DoctorDetailsCard = ({ formData, setFormData, handleChange, departments, hideHeader = false }) => {
  if (hideHeader) {
    return (
      <div className="doctor-details-content">
        <Row className="g-3">
          <Col md={6}>
            <div className="form-group">
              <label htmlFor="DepartmentId" className="form-label modern-label">
                <i className="fas fa-hospital me-1"></i>Department *
              </label>
              <select 
                id="DepartmentId" 
                name="DepartmentId"
                className="form-select modern-input"
                value={formData.DepartmentId || ""}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept.DepartmentId} value={dept.DepartmentId}>
                    {dept.Department}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">Please select a department.</div>
            </div>
          </Col>

          <Col md={6}>
            <div className="form-group">
              <label className="form-label modern-label">
                <i className="fas fa-stethoscope me-1"></i>Consulting Doctor *
              </label>
              <DoctorSelect 
                formData={formData} 
                setFormData={setFormData} 
                departmentId={formData.DepartmentId} 
              />
            </div>
          </Col>

          <Col md={6}>
            <div className="form-group">
              <label htmlFor="RefDoctorId" className="form-label modern-label">
                <i className="fas fa-user-friends me-1"></i>Referred By Doctor
              </label>
              <select 
                id="RefDoctorId" 
                name="RefDoctorId"
                className="form-select modern-input"
                value={formData.RefDoctorId || ""}
                onChange={handleChange}
              >
                <option value="">Select Referring Doctor</option>
                {departments.map(dept => (
                  <option key={dept.DepartmentId} value={dept.DepartmentId}>
                    {dept.Department} - Dr. {dept.DoctorName || 'Available'}
                  </option>
                ))}
              </select>
            </div>
          </Col>

          <Col md={6}>
            <div className="form-group">
              <label htmlFor="ReferralId" className="form-label modern-label">
                <i className="fas fa-handshake me-1"></i>Referral Source
              </label>
              <select 
                id="ReferralId" 
                name="ReferralId"
                className="form-select modern-input"
                value={formData.ReferralId || ""}
                onChange={handleChange}
              >
                <option value="">Select Referral Source</option>
                <option value="1">Hospital Website</option>
                <option value="2">Social Media</option>
                <option value="3">Friend/Family</option>
                <option value="4">Other Hospital</option>
                <option value="5">Emergency</option>
              </select>
            </div>
          </Col>

          <Col md={12}>
            <div className="cancel-section p-3 rounded" style={{ background: 'linear-gradient(135deg, #ffefef 0%, #ffe0e0 100%)', border: '1px solid #ffcccb' }}>
              <div className="d-flex align-items-center mb-3">
                <i className="fas fa-times-circle text-danger me-2"></i>
                <h6 className="mb-0 text-danger">Cancellation Options</h6>
              </div>
              <Row className="g-3">
                <Col md={6}>
                  <div className="form-check modern-checkbox">
                    <input 
                      type="checkbox" 
                      name="cancelVisit"
                      id="cancelVisit"
                      className="form-check-input"
                      checked={formData.cancelVisit}
                      onChange={handleChange}
                    />
                    <label className="form-check-label modern-label" htmlFor="cancelVisit">
                      <i className="fas fa-ban me-1"></i>Cancel Visit Entry
                    </label>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="cancelDate" className="form-label modern-label">
                      <i className="fas fa-calendar-times me-1"></i>Cancellation Date
                    </label>
                    <input
                      type="date"
                      id="cancelDate"
                      name="cancelDate"
                      className="form-control modern-input"
                      value={formData.cancelDate}
                      onChange={handleChange}
                      disabled={!formData.cancelVisit}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <Card className="modern-card doctor-card mb-4 shadow-sm">
      <Card.Header className="modern-card-header">
        <div className="d-flex align-items-center">
          <i className="fas fa-user-md me-2"></i>
          <h5 className="mb-0">Doctor & Department Selection</h5>
        </div>
      </Card.Header>
      <Card.Body className="modern-card-body">
      </Card.Body>
    </Card>
  );
};

export default DoctorDetailsCard;