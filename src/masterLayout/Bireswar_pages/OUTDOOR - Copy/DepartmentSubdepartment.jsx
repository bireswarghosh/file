import React, { useState, useEffect } from 'react';
import MasterLayout from '../../MasterLayout';
import Breadcrumb from '../../Breadcrumb';
import { Card, Row, Col, ListGroup, Badge, Spinner, Button, Modal, Form, Alert, Collapse } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaLayerGroup, FaHospital, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import axiosInstance from '../../../axiosInstance';
// Debug: Check if icons are imported correctly
console.log('Icons imported:', { FaEdit, FaTrash, FaPlus });


const DepartmentSubdepartment = () => {
  // Data states (unchanged)
  const [departments, setDepartments] = useState([]);
  const [subdepartments, setSubdepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDepartment, setOpenDepartment] = useState(null); // Track open department for dropdown
  
  // Modal states (unchanged)
  const [showDeptModal, setShowDeptModal] = useState(false);
  const [showSubdeptModal, setShowSubdeptModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [deptFormData, setDeptFormData] = useState({ Department: '', DepShName: '', BP: 0 });
  const [subdeptFormData, setSubdeptFormData] = useState({ SubDepartment: '', DepartmentId: '', SpRemTag: 0 });
  const [formError, setFormError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  // Fetch data (unchanged)
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      
      const deptResponse = await axiosInstance.get('/department', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (deptResponse.data && deptResponse.data.success) {
        const newDepartments = deptResponse.data.data || [];
        setDepartments(newDepartments);
      }
      
      const subdeptResponse = await axiosInstance.get('/subdepartment', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (subdeptResponse.data && subdeptResponse.data.success) {
        setSubdepartments(subdeptResponse.data.data || []);
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load departments and subdepartments");
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  // Department handlers
  const handleDepartmentClick = (department) => {
    setOpenDepartment(openDepartment === department.DepartmentId ? null : department.DepartmentId);
  };
  
  const openDeptModal = (mode, dept = null) => {
    setModalMode(mode);
    if (mode === 'update' && dept) {
      setDeptFormData({
        DepartmentId: dept.DepartmentId,
        Department: dept.Department,
        DepShName: dept.DepShName || '',
        BP: dept.BP || 0
      });
    } else {
      setDeptFormData({ Department: '', DepShName: '', BP: 0 });
    }
    setFormError('');
    setShowDeptModal(true);
  };
  
  const handleDeptChange = (e) => {
    const { name, value } = e.target;
    setDeptFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleDeptSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    try {
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };
      
      if (modalMode === 'create') {
        // Send to server first
        const response = await axiosInstance.post('/department', deptFormData, { headers });
        
        if (response.data && response.data.success) {
          // Add the new department from server response
          const newDepartment = response.data.data;
          setDepartments(prevDepts => [...prevDepts, newDepartment]);
          setOpenDepartment(newDepartment.DepartmentId); // Open the new department
          setActionSuccess('Department created successfully!');
           fetchData();
        } else {
          throw new Error('Failed to create department');
        }
      } else {
        const updateData = {
          DepartmentId: deptFormData.DepartmentId,
          Department: deptFormData.Department,
          DepShName: deptFormData.DepShName || '',
          BP: deptFormData.BP || 0
        };
        
        // Send to server first
        const response = await axiosInstance.put(`/department/${deptFormData.DepartmentId}`, updateData, { headers });
        
        if (response.data && response.data.success) {
          // Update local state after successful server update
          setDepartments(prevDepts => 
            prevDepts.map(dept => 
              dept.DepartmentId === deptFormData.DepartmentId ? {...dept, ...updateData} : dept
            )
          );
          setActionSuccess('Department updated successfully!');
        } else {
          throw new Error('Failed to update department');
        }
      }
      
      setShowDeptModal(false);
      setTimeout(() => setActionSuccess(''), 3000);
    } catch (error) {
      console.error("Error saving department:", error);
      setFormError(error.response?.data?.message || error.message || 'Failed to save department');
    }
  };
  
  const handleDeleteDept = async (deptId) => {
    if (window.confirm('Are you sure you want to delete this department? This will also delete all associated subdepartments.')) {
      try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.delete(`/department/${deptId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.data && response.data.success) {
          setDepartments(prevDepts => prevDepts.filter(dept => dept.DepartmentId !== deptId));
          setSubdepartments(prevSubdepts => 
            prevSubdepts.filter(subdept => subdept.DepartmentId !== deptId)
          );
          setOpenDepartment(null);
          setActionSuccess('Department deleted successfully!');
        } else {
          throw new Error('Failed to delete department');
        }
        
        setTimeout(() => setActionSuccess(''), 3000);
      } catch (error) {
        console.error("Error deleting department:", error);
        setError(error.response?.data?.message || error.message || 'Failed to delete department');
      }
    }
  };
  
  // Subdepartment handlers (unchanged)
  const openSubdeptModal = (mode, subdept = null) => {
    setModalMode(mode);
    if (mode === 'update' && subdept) {
      setSubdeptFormData({
        SubDepartmentId: subdept.SubDepartmentId,
        SubDepartment: subdept.SubDepartment,
        DepartmentId: subdept.DepartmentId,
        SpRemTag: subdept.SpRemTag || 0
      });
    } else {
      setSubdeptFormData({ 
        SubDepartment: '', 
        DepartmentId: openDepartment || '',
        SpRemTag: 0 
      });
    }
    setFormError('');
    setShowSubdeptModal(true);
  };
  
  const handleSubdeptChange = (e) => {
    const { name, value } = e.target;
    setSubdeptFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubdeptSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    try {
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };
      
      if (modalMode === 'create') {
        // Send to server first
        const response = await axiosInstance.post('/subdepartment', subdeptFormData, { headers });
        
        if (response.data && response.data.success) {
          // Add the new subdepartment from server response
          const newSubdept = response.data.data;
          setSubdepartments(prevSubdepts => [...prevSubdepts, newSubdept]);
          setActionSuccess('Subdepartment created successfully!');
          fetchData(); // Fetch fresh data to ensure everything is in sync
        } else {
          throw new Error('Failed to create subdepartment');
        }
      } else {
        const updateData = {
          SubDepartmentId: subdeptFormData.SubDepartmentId,
          SubDepartment: subdeptFormData.SubDepartment,
          DepartmentId: subdeptFormData.DepartmentId,
          SpRemTag: subdeptFormData.SpRemTag || 0
        };
        
        // Send to server first
        const response = await axiosInstance.put(`/subdepartment/${subdeptFormData.SubDepartmentId}`, updateData, { headers });
        
        if (response.data && response.data.success) {
          // Update local state after successful server update
          setSubdepartments(prevSubdepts => 
            prevSubdepts.map(subdept => 
              subdept.SubDepartmentId === subdeptFormData.SubDepartmentId ? {...subdept, ...updateData} : subdept
            )
          );
          setActionSuccess('Subdepartment updated successfully!');
        } else {
          throw new Error('Failed to update subdepartment');
        }
      }
      
      setShowSubdeptModal(false);
      setTimeout(() => setActionSuccess(''), 3000);
    } catch (error) {
      console.error("Error saving subdepartment:", error);
      setFormError(error.response?.data?.message || error.message || 'Failed to save subdepartment');
    }
  };
  
  const handleDeleteSubdept = async (subdeptId) => {
    if (window.confirm('Are you sure you want to delete this subdepartment?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.delete(`/subdepartment/${subdeptId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.data && response.data.success) {
          setSubdepartments(prevSubdepts => 
            prevSubdepts.filter(subdept => subdept.SubDepartmentId !== subdeptId)
          );
          setActionSuccess('Subdepartment deleted successfully!');
        } else {
          throw new Error('Failed to delete subdepartment');
        }
        
        setTimeout(() => setActionSuccess(''), 3000);
      } catch (error) {
        console.error("Error deleting subdepartment:", error);
        setError(error.response?.data?.message || error.message || 'Failed to delete subdepartment');
      }
    }
  };

  // Filter subdepartments
  const getSubdepartments = (deptId) => 
    subdepartments.filter(subdept => subdept.DepartmentId === deptId);

  // Loading state
  if (loading) {
    return (
      <MasterLayout>
        <Breadcrumb title="Departments & Subdepartments" />
        <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
          <Spinner 
            animation="border" 
            variant="primary" 
            className="custom-spinner"
            style={{ width: '4rem', height: '4rem' }}
          />
        </div>
      </MasterLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <MasterLayout>
        <Breadcrumb title="Departments & Subdepartments" />
        <Alert variant="danger" className="custom-alert shadow-sm">
          <div className="d-flex align-items-center">
            <FaTrash className="me-2" />
            <div>{error}</div>
          </div>
        </Alert>
      </MasterLayout>
    );
  }

  return (
    <MasterLayout>
      <Breadcrumb title="Departments & Subdepartments" />
      
      {/* Success Alert */}
      {actionSuccess && (
        <Alert variant="success" className="custom-alert shadow-sm mt-3 animate__animated animate__fadeIn">
          <div className="d-flex align-items-center">
            <div className="me-2">✓</div>
            <div>{actionSuccess}</div>
          </div>
        </Alert>
      )}
      
      {/* Add Department Button */}
      <div className="d-flex justify-content-end mt-3 mb-4">
        <Button 
          variant="primary" 
          className="custom-btn custom-btn-primary d-flex align-items-center animate__animated animate__pulse animate__infinite"
          onClick={() => openDeptModal('create')}
          aria-label="Add new department"
        >
          <FaPlus className="me-2" /> Add Department
        </Button>
      </div>
      
      {/* Departments List */}
      <Row className="mt-3">
        <Col xs={12}>
          <Card className="custom-card shadow-lg border-0 rounded-4">
            <Card.Header className="bg-gradient-custom text-white d-flex justify-content-between align-items-center py-3">
              <div className="d-flex align-items-center">
                <FaHospital className="me-2 icon-spin" />
                <h5 className="mb-0 fw-bold">Departments</h5>
              </div>
              <Badge bg="light" text="dark" pill className="custom-badge">
                {departments.length}
              </Badge>
            </Card.Header>
            <Card.Body className="p-0">
              <ListGroup variant="flush">
                {departments.map(dept => (
                  <div key={dept.DepartmentId}>
                    <ListGroup.Item 
                      action
                      onClick={() => handleDepartmentClick(dept)}
                      className="custom-list-item d-flex justify-content-between align-items-center py-3"
                      aria-expanded={openDepartment === dept.DepartmentId}
                      aria-controls={`subdept-collapse-${dept.DepartmentId}`}
                    >
                      <div className="d-flex align-items-center">
                        <div>
                          <div className="fw-bold text-dark">{dept.Department}</div>
                          {dept.DepShName && <small className="text-muted">{dept.DepShName}</small>}
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <Badge bg="info" pill className="me-2 custom-badge">
                          {getSubdepartments(dept.DepartmentId).length}
                        </Badge>
                        <div className="btn-group me-2">
                          <Button 
                            variant="outline-primary" 
                            size="sm" 
                            className="custom-btn custom-btn-outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Edit button clicked for dept:', dept.DepartmentId);
                              openDeptModal('update', dept);
                            }}
                            aria-label="Edit department"
                            title="Edit Department"
                          >
                            {FaEdit ? <FaEdit className="icon-edit" /> : '✏️'}
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm" 
                            className="custom-btn custom-btn-outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Delete button clicked for dept:', dept.DepartmentId);
                              handleDeleteDept(dept.DepartmentId);
                            }}
                            aria-label="Delete department"
                            title="Delete Department"
                          >
                            {FaTrash ? <FaTrash className="icon-trash" /> : '🗑️'}
                          </Button>
                        </div>
                        {openDepartment === dept.DepartmentId ? (
                          <FaChevronUp className="icon-spin" />
                        ) : (
                          <FaChevronDown className="icon-spin" />
                        )}
                      </div>
                    </ListGroup.Item>
                    <Collapse in={openDepartment === dept.DepartmentId}>
                      <div id={`subdept-collapse-${dept.DepartmentId}`} className="subdept-collapse">
                        <Card className="border-0 rounded-0">
                          <Card.Body className="pt-0">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <h6 className="mb-0 fw-bold text-dark">Subdepartments</h6>
                              <Button 
                                variant="primary" 
                                size="sm" 
                                className="custom-btn custom-btn-primary d-flex align-items-center"
                                onClick={() => openSubdeptModal('create')}
                                aria-label="Add subdepartment"
                              >
                                <FaPlus className="me-1" /> Add
                              </Button>
                            </div>
                            {getSubdepartments(dept.DepartmentId).length > 0 ? (
                              <Row xs={1} sm={2} md={3} className="g-3">
                                {getSubdepartments(dept.DepartmentId).map(subdept => (
                                  <Col key={subdept.SubDepartmentId}>
                                    <Card className="custom-subcard border-0 shadow-sm hover-card">
                                      <Card.Body>
                                        <div className="d-flex justify-content-between align-items-center">
                                          <Card.Title className="fw-bold text-dark mb-0">{subdept.SubDepartment}</Card.Title>
                                          <div className="btn-group">
                                            <Button 
                                              variant="outline-primary" 
                                              size="sm" 
                                              className="custom-btn custom-btn-outline"
                                              onClick={() => {
                                                console.log('Edit subdept button clicked:', subdept.SubDepartmentId);
                                                openSubdeptModal('update', subdept);
                                              }}
                                              aria-label="Edit subdepartment"
                                              title="Edit Subdepartment"
                                            >
                                              {FaEdit ? <FaEdit className="icon-edit" /> : '✏️'}
                                            </Button>
                                            <Button 
                                              variant="outline-danger" 
                                              size="sm" 
                                              className="custom-btn custom-btn-outline"
                                              onClick={() => {
                                                console.log('Delete subdept button clicked:', subdept.SubDepartmentId);
                                                handleDeleteSubdept(subdept.SubDepartmentId);
                                              }}
                                              aria-label="Delete subdepartment"
                                              title="Delete Subdepartment"
                                            >
                                              {FaTrash ? <FaTrash className="icon-trash" /> : '🗑️'}
                                            </Button>
                                          </div>
                                        </div>
                                        {subdept.SpRemTag > 0 && (
                                          <Badge bg="warning" text="dark" className="mt-2 custom-badge">
                                            Special Tag: {subdept.SpRemTag}
                                          </Badge>
                                        )}
                                      </Card.Body>
                                    </Card>
                                  </Col>
                                ))}
                              </Row>
                            ) : (
                              <div className="text-center py-3 text-muted">
                                No subdepartments found
                              </div>
                            )}
                          </Card.Body>
                        </Card>
                      </div>
                    </Collapse>
                  </div>
                ))}
                {departments.length === 0 && !loading && (
                  <ListGroup.Item className="text-center py-4 text-muted">
                    No departments found
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Department Modal */}
      <Modal 
        show={showDeptModal} 
        onHide={() => setShowDeptModal(false)} 
        centered 
        className="custom-modal animate__animated animate__zoomIn"
      >
        <Modal.Header closeButton className="bg-gradient-custom text-white">
          <Modal.Title className="fw-bold">
            {modalMode === 'create' ? 'Add New Department' : 'Edit Department'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleDeptSubmit}>
          <Modal.Body className="custom-modal-body">
            {formError && <Alert variant="danger" className="custom-alert">{formError}</Alert>}
            
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Department Name <span className="text-danger">*</span></Form.Label>
              <Form.Control 
                type="text" 
                name="Department" 
                value={deptFormData.Department} 
                onChange={handleDeptChange}
                required
                className="custom-input"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Short Name</Form.Label>
              <Form.Control 
                type="text" 
                name="DepShName" 
                value={deptFormData.DepShName} 
                onChange={handleDeptChange}
                className="custom-input"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">BP Value</Form.Label>
              <Form.Control 
                type="number" 
                name="BP" 
                value={deptFormData.BP} 
                onChange={handleDeptChange}
                className="custom-input"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="custom-modal-footer">
            <Button 
              variant="secondary" 
              onClick={() => setShowDeptModal(false)}
              className="custom-btn custom-btn-secondary"
              aria-label="Cancel"
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              type="submit"
              className="custom-btn custom-btn-primary"
              aria-label={modalMode === 'create' ? 'Create Department' : 'Update Department'}
            >
              {modalMode === 'create' ? 'Create Department' : 'Update Department'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      
      {/* Subdepartment Modal */}
      <Modal 
        show={showSubdeptModal} 
        onHide={() => setShowSubdeptModal(false)} 
        centered 
        className="custom-modal animate__animated animate__zoomIn"
      >
        <Modal.Header closeButton className="bg-gradient-custom text-white">
          <Modal.Title className="fw-bold">
            {modalMode === 'create' ? 'Add New Subdepartment' : 'Edit Subdepartment'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubdeptSubmit}>
          <Modal.Body className="custom-modal-body">
            {formError && <Alert variant="danger" className="custom-alert">{formError}</Alert>}
            
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Subdepartment Name <span className="text-danger">*</span></Form.Label>
              <Form.Control 
                type="text" 
                name="SubDepartment" 
                value={subdeptFormData.SubDepartment} 
                onChange={handleSubdeptChange}
                required
                className="custom-input"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Department <span className="text-danger">*</span></Form.Label>
              <Form.Select 
                name="DepartmentId" 
                value={subdeptFormData.DepartmentId} 
                onChange={handleSubdeptChange}
                required
                className="custom-input"
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept.DepartmentId} value={dept.DepartmentId}>
                    {dept.Department}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Special Tag</Form.Label>
              <Form.Control 
                type="number" 
                name="SpRemTag" 
                value={subdeptFormData.SpRemTag} 
                onChange={handleSubdeptChange}
                className="custom-input"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="custom-modal-footer">
            <Button 
              variant="secondary" 
              onClick={() => setShowSubdeptModal(false)}
              className="custom-btn custom-btn-secondary"
              aria-label="Cancel"
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              type="submit"
              className="custom-btn custom-btn-primary"
              aria-label={modalMode === 'create' ? 'Create Subdepartment' : 'Update Subdepartment'}
            >
              {modalMode === 'create' ? 'Create Subdepartment' : 'Update Subdepartment'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      
      {/* Custom Styles */}
      <style jsx>{`
        /* Global styles for modern look */
        .custom-card {
          background: #ffffff;
          border-radius: 15px !important;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .custom-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
        }

        /* Gradient headers */
        .bg-gradient-custom {
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
          color: #fff !important;
          border-radius: 10px 10px 0 0 !important;
        }

        /* Custom buttons */
        .custom-btn {
          border-radius: 8px !important;
          transition: all 0.3s ease;
          font-weight: 500;
        }
        .custom-btn-primary {
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%) !important;
          border: none !important;
        }
        .custom-btn-primary:hover {
          background: linear-gradient(135deg, #2575fc 0%, #6a11cb 100%) !important;
          transform: translateY(-2px);
        }
        .custom-btn-secondary {
          background: #e2e8f0 !important;
          border: none !important;
          color: #333 !important;
        }
        .custom-btn-secondary:hover {
          background: #cbd5e1 !important;
          transform: translateY(-2px);
        }
        .custom-btn-outline {
          border-radius: 50% !important;
          width: 32px;
          height: 32px;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 0 !important;
          border: 1px solid currentColor !important;
          background: transparent !important;
        }
        .custom-btn-outline:hover {
          transform: scale(1.1);
        }

        /* List items */
        .custom-list-item {
          transition: all 0.3s ease;
          border-left: 4px solid transparent;
          cursor: pointer;
        }
        .custom-list-item:hover {
          background: rgba(0, 0, 0, 0.05);
          border-left: 4px solid #6a11cb;
        }
        .custom-list-item[aria-expanded="true"] {
          background: rgba(106, 17, 203, 0.1);
          border-left: 4px solid #6a11cb;
        }

        /* Subdepartment cards */
        .custom-subcard {
          background: #f8fafc;
          border-radius: 12px !important;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .custom-subcard:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        /* Subdepartment collapse */
        .subdept-collapse {
          background: #f8fafc;
          padding: 1rem;
          animation: fadeIn 0.3s ease-in;
        }

        /* Badges */
        .custom-badge {
          font-size: 0.9rem;
          padding: 0.5em 1em;
          border-radius: 12px;
          font-weight: 500;
        }

        /* Modal - Dark mode compatible */
        .custom-modal .modal-content {
          border-radius: 15px !important;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
          background: var(--bs-body-bg, #fff) !important;
          color: var(--bs-body-color, #000) !important;
        }
        .custom-modal .modal-header {
          border-bottom: none;
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%) !important;
          color: #fff !important;
        }
        .custom-modal .modal-footer {
          border-top: none;
          background: var(--bs-body-bg, #f8f9fa) !important;
        }
        .custom-modal .modal-body {
          background: var(--bs-body-bg, #fff) !important;
          color: var(--bs-body-color, #000) !important;
        }

        /* Form inputs - Dark mode compatible */
        .custom-input {
          border-radius: 8px !important;
          border: 1px solid var(--bs-border-color, #e2e8f0) !important;
          transition: all 0.3s ease;
          background: var(--bs-body-bg, #fff) !important;
          color: var(--bs-body-color, #000) !important;
        }
        .custom-input:focus {
          border-color: #6a11cb !important;
          box-shadow: 0 0 0 0.2rem rgba(106, 17, 203, 0.25) !important;
          background: var(--bs-body-bg, #fff) !important;
          color: var(--bs-body-color, #000) !important;
        }
        
        /* Form labels - Dark mode compatible */
        .custom-modal .form-label {
          color: var(--bs-body-color, #000) !important;
        }

        /* Alerts */
        .custom-alert {
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          font-weight: 500;
        }

        /* Spinner */
        .custom-spinner {
          border-width: 0.4rem;
          animation: spin 1s linear infinite;
        }

        /* Icon spin animation */
        .icon-spin {
          transition: transform 0.3s ease;
        }
        .icon-spin:hover {
          transform: rotate(360deg);
        }

        /* Icon styles for edit and trash */
        .icon-edit, .icon-trash {
          font-size: 14px;
          display: inline-block;
          width: 14px;
          height: 14px;
        }
        
        /* Ensure icons are visible */
        .custom-btn-outline .icon-edit {
          color: #0d6efd;
        }
        .custom-btn-outline .icon-trash {
          color: #dc3545;
        }
        
        /* Button hover effects */
        .custom-btn-outline:hover .icon-edit {
          color: #fff;
        }
        .custom-btn-outline:hover .icon-trash {
          color: #fff;
        }

        /* Keyframes for animations */
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .custom-card {
            margin-bottom: 1.5rem;
          }
          .custom-btn {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }
          .custom-modal .modal-content {
            border-radius: 10px !important;
          }
          .custom-subcard {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </MasterLayout>
  );
};

export default DepartmentSubdepartment;
