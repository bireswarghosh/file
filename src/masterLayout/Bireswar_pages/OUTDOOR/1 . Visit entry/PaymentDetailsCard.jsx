import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Collapse } from 'react-bootstrap';

const PaymentDetailsCard = ({ formData, handleChange, hideHeader = false }) => {
  const [paymentMethods, setPaymentMethods] = useState({
    cash: { enabled: false, amount: '' },
    upi: { enabled: false, amount: '', transactionId: '' },
    card: { enabled: false, amount: '', cardNo: '', bankName: '' },
    cheque: { enabled: false, amount: '', chequeNo: '', bankName: '' },
    bankTransfer: { enabled: false, amount: '', transactionId: '', bankName: '' }
  });

  const [totalPaid, setTotalPaid] = useState(0);
  const [dueAmount, setDueAmount] = useState(0);

  // Calculate totals when payment methods change
  useEffect(() => {
    const total = Object.values(paymentMethods).reduce((sum, method) => {
      return sum + (method.enabled ? parseFloat(method.amount || 0) : 0);
    }, 0);
    setTotalPaid(total);
    
    const billAmount = parseFloat(formData.billAmt || 0);
    setDueAmount(Math.max(0, billAmount - total));
    
    // Update form data
    handleChange({ target: { name: 'receiptAmount', value: total.toString() } });
    handleChange({ target: { name: 'dueAmount', value: Math.max(0, billAmount - total).toString() } });
  }, [paymentMethods, formData.billAmt]);

  const handlePaymentMethodChange = (method, field, value) => {
    setPaymentMethods(prev => ({
      ...prev,
      [method]: {
        ...prev[method],
        [field]: value
      }
    }));
  };

  const paymentMethodsConfig = [
    { key: 'cash', label: 'Cash', icon: 'fas fa-money-bill-alt', color: '#4caf50', bgColor: '#e8f5e9' },
    { key: 'upi', label: 'UPI', icon: 'fas fa-mobile-alt', color: '#2196f3', bgColor: '#e3f2fd' },
    { key: 'card', label: 'Card', icon: 'fas fa-credit-card', color: '#ff9800', bgColor: '#fff3e0' },
    { key: 'cheque', label: 'Cheque', icon: 'fas fa-money-check', color: '#9c27b0', bgColor: '#f3e5f5' },
    { key: 'bankTransfer', label: 'Bank Transfer', icon: 'fas fa-university', color: '#f44336', bgColor: '#ffebee' }
  ];

  if (hideHeader) {
    return (
      <div className="payment-details-content">
        <Row className="g-3">
          {/* Compact Payment Methods */}
          <Col md={12}>
            <div className="compact-payment-section p-3 rounded" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', border: '2px solid #dee2e6' }}>
              <h6 className="mb-3 text-primary">
                <i className="fas fa-money-bill-wave me-2"></i>Payment Methods
              </h6>
              
              <Row className="g-2">
                {paymentMethodsConfig.map((config) => (
                  <Col key={config.key} md={6} lg={4} xl={2}>
                    <div 
                      className="payment-method-compact p-2 rounded text-center" 
                      style={{ 
                        background: paymentMethods[config.key].enabled ? config.bgColor : '#fff',
                        border: `2px solid ${paymentMethods[config.key].enabled ? config.color : '#ddd'}`,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onClick={() => handlePaymentMethodChange(config.key, 'enabled', !paymentMethods[config.key].enabled)}
                    >
                      <div className="form-check d-flex align-items-center justify-content-center">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          id={`${config.key}Payment`}
                          checked={paymentMethods[config.key].enabled}
                          onChange={() => {}}
                        />
                        <label className="form-check-label modern-label mb-0" htmlFor={`${config.key}Payment`}>
                          <i className={`${config.icon} me-1`} style={{ color: config.color }}></i>
                          <small>{config.label}</small>
                        </label>
                      </div>
                      {paymentMethods[config.key].enabled && (
                        <div className="mt-2">
                          <input
                            type="number"
                            className="form-control form-control-sm modern-input"
                            placeholder="₹ Amount"
                            value={paymentMethods[config.key].amount}
                            onChange={(e) => {
                              e.stopPropagation();
                              handlePaymentMethodChange(config.key, 'amount', e.target.value);
                            }}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      )}
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>

          {/* Payment Details - Only show for enabled methods */}
          {Object.entries(paymentMethods).some(([key, method]) => method.enabled) && (
            <Col md={12}>
              <div className="payment-details-section p-3 rounded" style={{ background: 'linear-gradient(135deg, #fff9e6 0%, #fff0cc 100%)', border: '2px solid #ffd700' }}>
                <h6 className="mb-3 text-warning">
                  <i className="fas fa-info-circle me-2"></i>Payment Details
                </h6>
                
                {/* UPI Details */}
                {paymentMethods.upi.enabled && (
                  <div className="payment-detail-item mb-3 p-3 rounded" style={{ background: '#e3f2fd', border: '1px solid #2196f3' }}>
                    <h6 className="text-primary mb-2">
                      <i className="fas fa-mobile-alt me-2"></i>UPI Payment Details
                    </h6>
                    <Row className="g-2">
                      <Col md={6}>
                        <input
                          type="text"
                          className="form-control modern-input"
                          placeholder="Transaction ID"
                          value={paymentMethods.upi.transactionId}
                          onChange={(e) => handlePaymentMethodChange('upi', 'transactionId', e.target.value)}
                        />
                      </Col>
                    </Row>
                  </div>
                )}

                {/* Card Details */}
                {paymentMethods.card.enabled && (
                  <div className="payment-detail-item mb-3 p-3 rounded" style={{ background: '#fff3e0', border: '1px solid #ff9800' }}>
                    <h6 className="text-warning mb-2">
                      <i className="fas fa-credit-card me-2"></i>Card Payment Details
                    </h6>
                    <Row className="g-2">
                      <Col md={6}>
                        <input
                          type="text"
                          className="form-control modern-input"
                          placeholder="Last 4 digits"
                          value={paymentMethods.card.cardNo}
                          onChange={(e) => handlePaymentMethodChange('card', 'cardNo', e.target.value)}
                          maxLength="4"
                        />
                      </Col>
                      <Col md={6}>
                        <input
                          type="text"
                          className="form-control modern-input"
                          placeholder="Bank Name"
                          value={paymentMethods.card.bankName}
                          onChange={(e) => handlePaymentMethodChange('card', 'bankName', e.target.value)}
                        />
                      </Col>
                    </Row>
                  </div>
                )}

                {/* Cheque Details */}
                {paymentMethods.cheque.enabled && (
                  <div className="payment-detail-item mb-3 p-3 rounded" style={{ background: '#f3e5f5', border: '1px solid #9c27b0' }}>
                    <h6 className="mb-2" style={{ color: '#9c27b0' }}>
                      <i className="fas fa-money-check me-2"></i>Cheque Payment Details
                    </h6>
                    <Row className="g-2">
                      <Col md={6}>
                        <input
                          type="text"
                          className="form-control modern-input"
                          placeholder="Cheque Number"
                          value={paymentMethods.cheque.chequeNo}
                          onChange={(e) => handlePaymentMethodChange('cheque', 'chequeNo', e.target.value)}
                        />
                      </Col>
                      <Col md={6}>
                        <input
                          type="text"
                          className="form-control modern-input"
                          placeholder="Bank Name"
                          value={paymentMethods.cheque.bankName}
                          onChange={(e) => handlePaymentMethodChange('cheque', 'bankName', e.target.value)}
                        />
                      </Col>
                    </Row>
                  </div>
                )}

                {/* Bank Transfer Details */}
                {paymentMethods.bankTransfer.enabled && (
                  <div className="payment-detail-item mb-3 p-3 rounded" style={{ background: '#ffebee', border: '1px solid #f44336' }}>
                    <h6 className="text-danger mb-2">
                      <i className="fas fa-university me-2"></i>Bank Transfer Details
                    </h6>
                    <Row className="g-2">
                      <Col md={6}>
                        <input
                          type="text"
                          className="form-control modern-input"
                          placeholder="Transaction ID"
                          value={paymentMethods.bankTransfer.transactionId}
                          onChange={(e) => handlePaymentMethodChange('bankTransfer', 'transactionId', e.target.value)}
                        />
                      </Col>
                      <Col md={6}>
                        <input
                          type="text"
                          className="form-control modern-input"
                          placeholder="Bank Name"
                          value={paymentMethods.bankTransfer.bankName}
                          onChange={(e) => handlePaymentMethodChange('bankTransfer', 'bankName', e.target.value)}
                        />
                      </Col>
                    </Row>
                  </div>
                )}
              </div>
            </Col>
          )}

          {/* Payment Summary */}
          <Col md={12}>
            <div className="payment-summary p-4 rounded" style={{ background: 'linear-gradient(135deg, #e8f5e8 0%, #d4edda 100%)', border: '2px solid #28a745' }}>
              <h6 className="mb-3 text-success">
                <i className="fas fa-chart-line me-2"></i>Payment Summary
              </h6>
              <Row className="g-3">
                <Col md={3}>
                  <div className="text-center p-3 rounded" style={{ background: 'rgba(40, 167, 69, 0.1)' }}>
                    <small className="text-muted d-block">Total Bill</small>
                    <strong className="text-success" style={{ fontSize: '1.2rem' }}>₹{formData.billAmt || '0.00'}</strong>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="text-center p-3 rounded" style={{ background: 'rgba(23, 162, 184, 0.1)' }}>
                    <small className="text-muted d-block">Total Paid</small>
                    <strong className="text-info" style={{ fontSize: '1.2rem' }}>₹{totalPaid.toFixed(2)}</strong>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="text-center p-3 rounded" style={{ background: 'rgba(220, 53, 69, 0.1)' }}>
                    <small className="text-muted d-block">Due Amount</small>
                    <strong className="text-danger" style={{ fontSize: '1.2rem' }}>₹{dueAmount.toFixed(2)}</strong>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="text-center p-3 rounded" style={{ background: 'rgba(255, 193, 7, 0.1)' }}>
                    <small className="text-muted d-block">Payment Status</small>
                    <strong className={dueAmount > 0 ? 'text-warning' : 'text-success'} style={{ fontSize: '1.2rem' }}>
                      {dueAmount > 0 ? 'Partial' : 'Paid'}
                    </strong>
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
    <Card className="modern-card payment-card mb-4 shadow-sm">
      <Card.Header className="modern-card-header" style={{ background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' }}>
        <div className="d-flex align-items-center">
          <i className="fas fa-credit-card me-2"></i>
          <h5 className="mb-0">Multiple Payment Methods</h5>
        </div>
      </Card.Header>
      <Card.Body className="modern-card-body">
      </Card.Body>
    </Card>
  );
};

export default PaymentDetailsCard;