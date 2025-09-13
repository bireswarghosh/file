import React, { useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const PatientDetailsCard = ({ formData, handleChange, religions, hideHeader = false }) => {
  // Format date to DD/MM/YYYY for display
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString + 'T00:00:00');
    if (isNaN(date.getTime())) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Auto-calculate DOB when age fields have values
  useEffect(() => {
    const years = parseInt(formData.Age) || 0;
    const months = parseInt(formData.AgeD) || 0;
    const days = parseInt(formData.AgeN) || 0;
    
    if ((years || months || days) && !formData.dob) {
      const regDate = formData.RegistrationDate ? new Date(formData.RegistrationDate) : new Date();
      const birthDate = new Date(regDate.getFullYear() - years, regDate.getMonth() - months, regDate.getDate() - days);
      const dobString = birthDate.toISOString().split('T')[0];
      
      handleChange({
        target: { name: 'dob', value: dobString }
      });
    }
  }, [formData.Age, formData.AgeD, formData.AgeN, formData.RegistrationDate]);
  if (hideHeader) {
    return (
      <div className="patient-details-content">
        <Row className="g-3">
          <Col md={6} lg={2}>
            <div className="form-group">
              <label htmlFor="PPr" className="form-label modern-label">
                <i className="fas fa-user-tag me-1"></i>Prefix
              </label>
              <select 
                id="PPr" 
                name="PPr" 
                className="form-select modern-input" 
                value={formData.PPr || ''}
                onChange={handleChange}
              >
                <option value="">Select...</option>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
                <option value="Dr.">Dr.</option>
                <option value="Prof.">Prof.</option>
              </select>
            </div>
          </Col>

          <Col md={6} lg={3}>
            <div className="form-group">
              <label htmlFor="GurdianName" className="form-label modern-label">
                <i className="fas fa-user-friends me-1"></i>Guardian Name *
              </label>
              <input
                type="text"
                id="GurdianName"
                name="GurdianName"
                style={{ textTransform: 'uppercase' }}
                className="form-control modern-input"
                value={formData.GurdianName}
                onChange={handleChange}
                placeholder="Enter guardian name"
                required
              />
              <div className="invalid-feedback">Please enter guardian name.</div>
            </div>
          </Col>

          <Col md={6} lg={2}>
            <div className="form-group">
              <label htmlFor="CareOf" className="form-label modern-label">
                <i className="fas fa-heart me-1"></i>Care Of
              </label>
              <select 
                id="CareOf" 
                name="CareOf" 
                className="form-select modern-input" 
                value={formData.CareOf || ''}
                onChange={handleChange}
                required
              >
                <option value="">Select...</option>
                <option value="Father">Father</option>
                <option value="Husband">Husband</option>
                <option value="Mother">Mother</option>
                <option value="Wife">Wife</option>
                <option value="Son">Son</option>
                <option value="Daughter">Daughter</option>
                <option value="W/O">W/O</option>
                <option value="S/O">S/O</option>
                <option value="D/O">D/O</option>
              </select>
              <div className="invalid-feedback">Select care of.</div>
            </div>
          </Col>

          <Col md={6} lg={2}>
            <div className="form-group">
              <label htmlFor="Sex" className="form-label modern-label">
                <i className="fas fa-venus-mars me-1"></i>Gender
              </label>
              <select 
                id="Sex" 
                name="Sex" 
                className="form-select modern-input" 
                value={formData.Sex}
                onChange={handleChange}
                required
              >
                <option value="">Select...</option>
                <option value="M">MALE</option>
                <option value="F">FEMALE</option>
                <option value="O">OTHER</option>
              </select>
              <div className="invalid-feedback">Select gender</div>
            </div>
          </Col>

          <Col md={6} lg={2}>
            <div className="form-group">
              <label htmlFor="MStatus" className="form-label modern-label">
                <i className="fas fa-ring me-1"></i>Marital Status
              </label>
              <select 
                id="MStatus" 
                name="MStatus" 
                className="form-select modern-input" 
                value={formData.MStatus}
                onChange={handleChange}
                required
              >
                <option value="">Select...</option>
                <option value="M">MARRIED</option>
                <option value="U">UNMARRIED</option>
                <option value="D">DIVORCED</option>
                <option value="W">WIDOWED</option>
              </select>
              <div className="invalid-feedback">Select marital status</div>
            </div>
          </Col>

          <Col md={6} lg={3}>
            <div className="form-group">
              <label className="form-label modern-label">
                <i className="fas fa-barcode me-1"></i>Patient ID
              </label>
              <div className="barcode-container p-3 rounded" style={{ background: 'linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%)', border: '2px solid #f39c12' }}>
                <div className="text-center mb-2">
                  <div className="barcode-lines" style={{ 
                    background: 'repeating-linear-gradient(90deg, #000 0px, #000 2px, #fff 2px, #fff 4px)', 
                    height: '40px', 
                    width: '100%' 
                  }}></div>
                </div>
                <div className="text-center">
                  <strong style={{ fontFamily: 'monospace', fontSize: '14px' }}>
                    {formData.RegistrationId || formData.registrationNo || 'Will be auto-generated'}
                  </strong>
                </div>
              </div>
            </div>
          </Col>

          {/* DOB & Age Section */}
          <Col md={12}>
            <div className="professional-section p-4 mb-4 rounded" style={{ background: 'linear-gradient(135deg, #e8f4fd 0%, #f1f8ff 100%)', border: '2px solid #b3d9ff' }}>
              <h6 className="section-title mb-4 text-primary">
                <i className="fas fa-calendar-alt me-2"></i>Date of Birth & Age Information
              </h6>
              <Row className="g-4 align-items-end">
                <Col md={12} lg={4}>
                  <div className="form-group mb-0">
                    <label htmlFor="dob" className="form-label modern-label mb-2">
                      <i className="fas fa-birthday-cake me-1"></i>Date of Birth
                    </label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      className="form-control modern-input"
                      value={formData.dob}
                      onChange={(e) => {
                        const value = e.target.value;
                        
                        if (value) {
                          const birthDate = new Date(value);
                          const regDate = formData.RegistrationDate ? new Date(formData.RegistrationDate) : new Date();
                          
                          let years = regDate.getFullYear() - birthDate.getFullYear();
                          let months = regDate.getMonth() - birthDate.getMonth();
                          let days = regDate.getDate() - birthDate.getDate();
                          
                          if (days < 0) {
                            months--;
                            const lastMonth = new Date(regDate.getFullYear(), regDate.getMonth(), 0);
                            days += lastMonth.getDate();
                          }
                          
                          if (months < 0) {
                            years--;
                            months += 12;
                          }
                          
                          handleChange({
                            target: { name: 'dob', value }
                          });
                          handleChange({
                            target: { name: 'Age', value: years.toString() }
                          });
                          handleChange({
                            target: { name: 'AgeD', value: months.toString() }
                          });
                          handleChange({
                            target: { name: 'AgeN', value: days.toString() }
                          });
                        } else {
                          handleChange(e);
                        }
                      }}
                      required
                    />
                    {formData.dob && (
                      <small className="text-muted mt-1 d-block">
                        <i className="fas fa-calendar me-1"></i>
                        {formatDateForDisplay(formData.dob)}
                      </small>
                    )}
                  </div>
                </Col>
                <Col md={12} lg={8}>
                  <div className="form-group mb-0">
                    <label className="form-label modern-label mb-2">
                      <i className="fas fa-hourglass-half me-1"></i>Age (Auto-calculated)
                    </label>
                    <Row className="g-2">
                      <Col xs={4}>
                        <input
                          type="number"
                          name="Age"
                          className="form-control modern-input text-center"
                          placeholder="0"
                          value={formData.Age}
                          onChange={(e) => {
                            const years = parseInt(e.target.value) || 0;
                            const months = parseInt(formData.AgeD) || 0;
                            const days = parseInt(formData.AgeN) || 0;
                            
                            if (years || months || days) {
                              const regDate = formData.RegistrationDate ? new Date(formData.RegistrationDate) : new Date();
                              const birthDate = new Date(regDate.getFullYear() - years, regDate.getMonth() - months, regDate.getDate() - days);
                              const dobString = birthDate.toISOString().split('T')[0];
                              
                              handleChange({
                                target: { name: 'dob', value: dobString }
                              });
                            }
                            handleChange(e);
                          }}
                          required
                        />
                        <small className="text-muted d-block text-center mt-1">Years</small>
                      </Col>
                      <Col xs={4}>
                        <input
                          type="number"
                          name="AgeN"
                          className="form-control modern-input text-center"
                          placeholder="0"
                          value={formData.AgeD}
                          onChange={(e) => {
                            const years = parseInt(formData.Age) || 0;
                            const months = parseInt(e.target.value) || 0;
                            const days = parseInt(formData.AgeN) || 0;
                            
                            if (years || months || days) {
                              const regDate = formData.RegistrationDate ? new Date(formData.RegistrationDate) : new Date();
                              const birthDate = new Date(regDate.getFullYear() - years, regDate.getMonth() - months, regDate.getDate() - days);
                              const dobString = birthDate.toISOString().split('T')[0];
                              
                              handleChange({
                                target: { name: 'dob', value: dobString }
                              });
                            }
                            handleChange(e);
                          }}
                        />
                        <small className="text-muted d-block text-center mt-1">Months</small>
                      </Col>
                      <Col xs={4}>
                        <input
                          type="number"
                          name="AgeD"
                          className="form-control modern-input text-center"
                          placeholder="0"
                          value={formData.AgeN}
                          onChange={(e) => {
                            const years = parseInt(formData.Age) || 0;
                            const months = parseInt(formData.AgeD) || 0;
                            const days = parseInt(e.target.value) || 0;
                            
                            if (years || months || days) {
                              const regDate = formData.RegistrationDate ? new Date(formData.RegistrationDate) : new Date();
                              const birthDate = new Date(regDate.getFullYear() - years, regDate.getMonth() - months, regDate.getDate() - days);
                              const dobString = birthDate.toISOString().split('T')[0];
                              
                              handleChange({
                                target: { name: 'dob', value: dobString }
                              });
                            }
                            handleChange(e);
                          }}
                        />
                        <small className="text-muted d-block text-center mt-1">Days</small>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>

          {/* Physical Measurements Section */}
          <Col md={12}>
            <div className="professional-section p-4 mb-4 rounded" style={{ background: 'linear-gradient(135deg, #f0fff4 0%, #e6ffed 100%)', border: '2px solid #90ee90' }}>
              <h6 className="section-title mb-4 text-success">
                <i className="fas fa-ruler-combined me-2"></i>Physical Measurements
              </h6>
              <Row className="g-4 align-items-end">
                <Col md={6} lg={3}>
                  <div className="form-group mb-0">
                    <label htmlFor="Weight" className="form-label modern-label mb-2">
                      <i className="fas fa-weight me-1"></i>Weight (kg)
                    </label>
                    <input
                      type="text"
                      id="Weight"
                      name="Weight"
                      className="form-control modern-input"
                      value={formData.Weight}
                      onChange={handleChange}
                      placeholder="Enter weight"
                      required
                    />
                  </div>
                </Col>
                <Col md={6} lg={3}>
                  <div className="form-group mb-0">
                    <label htmlFor="Height" className="form-label modern-label mb-2">
                      <i className="fas fa-ruler-vertical me-1"></i>Height (cm)
                    </label>
                    <input
                      type="text"
                      id="Height"
                      name="Height"
                      className="form-control modern-input"
                      value={formData.Height}
                      onChange={handleChange}
                      placeholder="Enter height"
                      required
                    />
                  </div>
                </Col>
                <Col md={12} lg={6}>
                  <div className="form-group mb-0">
                    <label className="form-label modern-label mb-2">
                      <i className="fas fa-heartbeat me-1"></i>Blood Pressure (mmHg)
                    </label>
                    <div className="bp-container p-3 rounded" style={{ background: 'linear-gradient(135deg, #ffe6e6 0%, #ffcccc 100%)', border: '2px solid #ff9999' }}>
                      <Row className="g-2 align-items-end">
                        <Col xs={5}>
                          <label className="form-label small text-danger fw-bold mb-1">
                            <i className="fas fa-arrow-up me-1"></i>Systolic
                          </label>
                          <input
                            type="text"
                            id="BpMax"
                            name="BpMax"
                            className="form-control modern-input text-center"
                            value={formData.BpMax}
                            onChange={handleChange}
                            placeholder="120"
                            style={{ borderColor: '#ff6b6b', background: 'white' }}
                          />
                        </Col>
                        <Col xs={2} className="text-center">
                          <span className="fw-bold text-danger" style={{ fontSize: '2rem', lineHeight: '1' }}>/</span>
                        </Col>
                        <Col xs={5}>
                          <label className="form-label small text-primary fw-bold mb-1">
                            <i className="fas fa-arrow-down me-1"></i>Diastolic
                          </label>
                          <input
                            type="text"
                            id="BpMin"
                            name="BpMin"
                            className="form-control modern-input text-center"
                            value={formData.BpMin}
                            onChange={handleChange}
                            placeholder="80"
                            style={{ borderColor: '#4dabf7', background: 'white' }}
                          />
                        </Col>
                      </Row>
                      <div className="text-center mt-2">
                        <small className="text-muted">
                          <i className="fas fa-info-circle me-1"></i>
                          Normal: 120/80 mmHg
                        </small>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>

          <Col md={12}>
            <div className="form-group">
              <label htmlFor="fullAddress" className="form-label modern-label">
                <i className="fas fa-map-marker-alt me-1"></i>Complete Address
              </label>
              <textarea
                id="fullAddress"
                name="fullAddress"
                className="form-control modern-input"
                value={formData.fullAddress}
                onChange={(e) => {
                  handleChange({
                    target: {
                      name: 'fullAddress',
                      value: e.target.value
                    }
                  });
                }}
                placeholder="Enter complete address with landmarks..."
                rows={3}
                required
              />
              <div className="invalid-feedback">Enter complete address.</div>
            </div>
          </Col>

          <Col md={6} lg={3}>
            <div className="form-group">
              <label htmlFor="ReligionId" className="form-label modern-label">
                <i className="fas fa-pray me-1"></i>Religion
              </label>
              <select 
                id="ReligionId" 
                name="ReligionId" 
                className="form-select modern-input"
                value={formData.ReligionId || ""}
                onChange={handleChange}
              >
                <option value="">Select Religion</option>
                {religions.map(religion => (
                  <option key={religion.ReligionId} value={religion.ReligionId}>
                    {religion.Religion}
                  </option>
                ))}
              </select>
            </div>
          </Col>

          <Col md={6} lg={3}>
            <div className="form-group">
              <label htmlFor="email" className="form-label modern-label">
                <i className="fas fa-envelope me-1"></i>Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control modern-input"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
              />
            </div>
          </Col>

          <Col md={6} lg={3}>
            <div className="form-group">
              <label htmlFor="Company" className="form-label modern-label">
                <i className="fas fa-building me-1"></i>Insurance/Company
              </label>
              <select
                id="Company"
                name="Company"
                className="form-select modern-input"
                value={formData.Company}
                onChange={handleChange}
              >
                <option value="">Select...</option>
                <option value="N">No Insurance</option>
                <option value="Y">Has Insurance</option>
              </select>
            </div>
          </Col>

          <Col md={6} lg={3}>
            <div className="form-group">
              <label htmlFor="emergencyContact" className="form-label modern-label">
                <i className="fas fa-phone-alt me-1"></i>Emergency Contact
              </label>
              <input
                type="text"
                id="emergencyContact"
                name="emergencyContact"
                className="form-control modern-input"
                value={formData.emergencyContact}
                onChange={handleChange}
                placeholder="Emergency contact number"
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <Card className="modern-card patient-card mb-4 shadow-sm">
      <Card.Header className="modern-card-header">
        <div className="d-flex align-items-center">
          <i className="fas fa-user-injured me-2"></i>
          <h5 className="mb-0">Patient Information</h5>
        </div>
      </Card.Header>
      <Card.Body className="modern-card-body">
      </Card.Body>
    </Card>
  );
};

export default PatientDetailsCard;