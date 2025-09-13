import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const BillingDetailsCard = ({ formData, handleChange, hideHeader = false }) => {
  const today = new Date().toISOString().split('T')[0];
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  const calculateTotals = () => {
    const regCh = parseFloat(formData.regnCh || 0);
    const profCh = parseFloat(formData.proffCh || 0);
    const svcCh = parseFloat(formData.svrCh || 0);
    const pDisc = parseFloat(formData.pDisc || 0);
    const profDisc = parseFloat(formData.proffDisc || 0);
    const svcDisc = parseFloat(formData.srvChDisc || 0);
    
    const subtotal = regCh + profCh + svcCh;
    const patientDiscAmount = subtotal * (pDisc / 100);
    const totalDiscount = profDisc + svcDisc + patientDiscAmount;
    const finalAmount = subtotal - totalDiscount;
    
    return {
      subtotal: subtotal.toFixed(2),
      totalDiscount: totalDiscount.toFixed(2),
      finalAmount: Math.max(0, finalAmount).toFixed(2)
    };
  };
  
  const totals = calculateTotals();

  if (hideHeader) {
    return (
      <div className="billing-details-content">
        <Row className="g-3">
          <Col md={6} lg={2}>
            <div className="form-group">
              <label htmlFor="billNo" className="form-label modern-label">
                <i className="fas fa-hashtag me-1"></i>Bill No.
              </label>
              <input 
                type="text" 
                id="billNo" 
                name="billNo"
                className="form-control modern-input" 
                value={formData.billNo}
                onChange={handleChange}
                placeholder="Auto-generated"
                required 
              />
              <div className="invalid-feedback">Enter bill number.</div>
            </div>
          </Col>

          <Col md={6} lg={2}>
            <div className="form-group">
              <label htmlFor="billDate" className="form-label modern-label">
                <i className="fas fa-calendar me-1"></i>Bill Date
              </label>
              <input
                type="date"
                id="billDate"
                name="billDate"
                className="form-control modern-input"
                value={formData.billDate || today}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Select bill date.</div>
            </div>
          </Col>

          <Col md={6} lg={2}>
            <div className="form-group">
              <label htmlFor="BillTime" className="form-label modern-label">
                <i className="fas fa-clock me-1"></i>Bill Time
              </label>
              <input
                type="time"
                id="BillTime"
                name="BillTime"
                className="form-control modern-input"
                value={formData.BillTime || currentTime}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Select bill time.</div>
            </div>
          </Col>

          <Col md={6} lg={3}>
            <div className="form-group">
              <label htmlFor="typeOfVisit" className="form-label modern-label">
                <i className="fas fa-clipboard-list me-1"></i>Type of Visit
              </label>
              <select
                id="typeOfVisit"
                name="typeOfVisit"
                className="form-select modern-input"
                value={formData.typeOfVisit}
                onChange={handleChange}
              >
                <option value="">Select Visit Type</option>
                <option value="OPD">OPD Consultation</option>
                <option value="Emergency">Emergency</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Routine">Routine Check-up</option>
              </select>
            </div>
          </Col>

          <Col md={6} lg={3}>
            <div className="form-group">
              <label className="form-label modern-label">
                <i className="fas fa-user-tie me-1"></i>Entry By
              </label>
              <input 
                type="text" 
                className="form-control modern-input" 
                defaultValue="Admin" 
                readOnly 
              />
            </div>
          </Col>

          {/* Charges & Discounts Section */}
          <Col md={12}>
            <div className="billing-calculation-section p-4 rounded mb-4" style={{ background: 'linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%)', border: '2px solid #4facfe' }}>
              <h6 className="mb-4 text-primary">
                <i className="fas fa-calculator me-2"></i>Charges & Discounts
              </h6>
              
              {/* Charges Row */}
              <Row className="g-3 mb-4">
                <Col md={4}>
                  <div className="charge-item p-3 rounded" style={{ background: '#e8f5e9', border: '1px solid #28a745' }}>
                    <label className="form-label fw-bold text-success mb-2">
                      <i className="fas fa-user-plus me-1"></i>Registration Charge
                    </label>
                    <input
                      type="number"
                      name="regnCh"
                      className="form-control modern-input"
                      value={formData.regnCh}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                </Col>
                <Col md={4}>
                  <div className="charge-item p-3 rounded" style={{ background: '#e3f2fd', border: '1px solid #2196f3' }}>
                    <label className="form-label fw-bold text-primary mb-2">
                      <i className="fas fa-user-md me-1"></i>Professional Charge
                    </label>
                    <input
                      type="number"
                      name="proffCh"
                      className="form-control modern-input"
                      value={formData.proffCh}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                </Col>
                <Col md={4}>
                  <div className="charge-item p-3 rounded" style={{ background: '#fff3e0', border: '1px solid #ff9800' }}>
                    <label className="form-label fw-bold text-warning mb-2">
                      <i className="fas fa-cogs me-1"></i>Service Charge
                    </label>
                    <input
                      type="number"
                      name="svrCh"
                      className="form-control modern-input"
                      value={formData.svrCh}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                </Col>
              </Row>

              {/* Discounts Row */}
              <Row className="g-3 mb-4">
                <Col md={4}>
                  <div className="discount-item p-3 rounded" style={{ background: '#ffebee', border: '1px solid #f44336' }}>
                    <label className="form-label fw-bold text-danger mb-2">
                      <i className="fas fa-percentage me-1"></i>Patient Discount %
                    </label>
                    <input
                      type="number"
                      name="pDisc"
                      className="form-control modern-input"
                      value={formData.pDisc}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                      max="100"
                    />
                  </div>
                </Col>
                <Col md={4}>
                  <div className="discount-item p-3 rounded" style={{ background: '#f3e5f5', border: '1px solid #9c27b0' }}>
                    <label className="form-label fw-bold mb-2" style={{ color: '#9c27b0' }}>
                      <i className="fas fa-minus-circle me-1"></i>Professional Discount
                    </label>
                    <input
                      type="number"
                      name="proffDisc"
                      className="form-control modern-input"
                      value={formData.proffDisc}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                </Col>
                <Col md={4}>
                  <div className="discount-item p-3 rounded" style={{ background: '#e8f5e8', border: '1px solid #4caf50' }}>
                    <label className="form-label fw-bold text-success mb-2">
                      <i className="fas fa-minus-circle me-1"></i>Service Discount
                    </label>
                    <input
                      type="number"
                      name="srvChDisc"
                      className="form-control modern-input"
                      value={formData.srvChDisc}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                </Col>
              </Row>

              {/* Bill Summary */}
              <div className="bill-summary-section p-4 rounded" style={{ background: 'linear-gradient(135deg, #fff9e6 0%, #fff0cc 100%)', border: '2px solid #ffd700' }}>
                <h6 className="mb-3 text-warning">
                  <i className="fas fa-file-invoice-dollar me-2"></i>Bill Summary
                </h6>
                <Row className="g-3">
                  <Col md={3}>
                    <div className="summary-item text-center p-3 rounded" style={{ background: 'rgba(40, 167, 69, 0.1)' }}>
                      <small className="text-muted d-block">Subtotal</small>
                      <strong className="text-success" style={{ fontSize: '1.1rem' }}>₹{totals.subtotal}</strong>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="summary-item text-center p-3 rounded" style={{ background: 'rgba(220, 53, 69, 0.1)' }}>
                      <small className="text-muted d-block">Total Discount</small>
                      <strong className="text-danger" style={{ fontSize: '1.1rem' }}>₹{totals.totalDiscount}</strong>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="summary-item text-center p-3 rounded" style={{ background: 'rgba(23, 162, 184, 0.1)' }}>
                      <small className="text-muted d-block">Final Amount</small>
                      <strong className="text-info" style={{ fontSize: '1.2rem' }}>₹{totals.finalAmount}</strong>
                    </div>
                  </Col>
                  <Col md={3}>
                    <input
                      type="hidden"
                      name="billAmt"
                      value={totals.finalAmount}
                    />
                  </Col>
                </Row>
              </div>
            </div>
          </Col>



          <Col md={12}>
            <div className="form-group">
              <label htmlFor="narration" className="form-label modern-label">
                <i className="fas fa-sticky-note me-1"></i>Narration / Notes
              </label>
              <textarea
                id="narration"
                name="narration"
                className="form-control modern-input"
                value={formData.narration}
                onChange={handleChange}
                placeholder="Enter any additional notes or comments..."
                rows={2}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <Card className="modern-card billing-card mb-4 shadow-sm">
      <Card.Header className="modern-card-header">
        <div className="d-flex align-items-center">
          <i className="fas fa-file-invoice-dollar me-2"></i>
          <h5 className="mb-0">Billing Information</h5>
        </div>
      </Card.Header>
      <Card.Body className="modern-card-body">
      </Card.Body>
    </Card>
  );
};

export default BillingDetailsCard;