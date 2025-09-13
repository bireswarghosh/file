import React, { useState, useEffect } from 'react';
import MasterLayout from '../../MasterLayout';
import Breadcrumb from '../../Breadcrumb';
import { 
  Table, Button, Card, Badge, Alert, Spinner, Form, 
  InputGroup, Row, Col, Container
} from 'react-bootstrap';
import { 
  FaUserMd, FaEdit, FaTrash, FaSearch
} from 'react-icons/fa';
import axiosInstance from '../../../axiosInstance';

import Modal from 'react-bootstrap/Modal';

const ActiveDoctors = () => {
  // State variables
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState('');
  const [specialities, setSpecialities] = useState([]);
  const [groupBySpeciality, setGroupBySpeciality] = useState(true);
  const [selectedSpecialityFilter, setSelectedSpecialityFilter] = useState('');
  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editDoctor, setEditDoctor] = useState(null);
  const [editForm, setEditForm] = useState({
    Doctor: '',
    Qualification: '',
    Phone: '',
    SpecialityId: '',
    IndoorYN: '',
    RMO: '',
    Email: '',
    Password: ''
  });
  // Open edit modal and set form data
  const handleEditClick = (doctor) => {
    setEditDoctor(doctor);
    setEditForm({
      Doctor: doctor.Doctor || '',
      Qualification: doctor.Qualification || '',
      Phone: doctor.Phone || '',
      SpecialityId: doctor.SpecialityId || '',
      IndoorYN: doctor.IndoorYN || '',
      RMO: doctor.RMO || '',
      Email: doctor.Email || '',
      Password: '' // Do not prefill password
    });
    setShowEditModal(true);
  };

  // Handle edit form change
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit edit form
  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    if (!editDoctor) return;
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      const token = localStorage.getItem('token');
      const payload = { ...editForm };
      // If password is empty, don't send it
      if (!payload.Password) delete payload.Password;
      const response = await axiosInstance.put(`/doctormaster/${editDoctor.DoctorId}`, payload, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.data && response.data.success) {
        setSuccess('Doctor updated successfully!');
        setShowEditModal(false);
        fetchActiveDoctors();
      } else {
        setError('Failed to update doctor.');
      }
    } catch (err) {
      setError('Failed to update doctor.');
    } finally {
      setLoading(false);
    }
  };

  // Close edit modal
  const handleEditModalClose = () => {
    setShowEditModal(false);
    setEditDoctor(null);
  };

  // Fetch doctors on component mount
  useEffect(() => {
    fetchActiveDoctors();
    fetchSpecialities();
  }, []);

  // Fetch active doctors from API
  const fetchActiveDoctors = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axiosInstance.get('/doctormaster/active', {
        headers: { 'Authorization': `Bearer ${token}` },
        params: { 
          search: search
        }
      });
      
      if (response.data && response.data.success) {
        setDoctors(response.data.data || []);
      }
    } catch (err) {
      console.error('Error fetching active doctors:', err);
      setError('Failed to load active doctors. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch specialities for mapping
  const fetchSpecialities = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.get('/speciality', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.data && response.data.success) {
        setSpecialities(response.data.data || []);
      }
    } catch (err) {
      console.error('Error fetching specialities:', err);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchActiveDoctors();
  };

  // Filter doctors by selected speciality
  const filteredDoctors = () => {
    if (!selectedSpecialityFilter) return doctors;
    return doctors.filter(doctor => doctor.SpecialityId == selectedSpecialityFilter);
  };

  // Group doctors by speciality
  const groupedDoctors = () => {
    const doctorsToShow = filteredDoctors();
    if (!groupBySpeciality) return { 'All Active Doctors': doctorsToShow };
    
    const grouped = {};
    doctorsToShow.forEach(doctor => {
      const speciality = specialities.find(s => s.SpecialityId === doctor.SpecialityId);
      const specialityName = speciality ? speciality.Speciality : 'Not specified';
      if (!grouped[specialityName]) {
        grouped[specialityName] = [];
      }
      grouped[specialityName].push(doctor);
    });
    return grouped;
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Active Doctors" />
      
      <Container fluid className="py-4">
        {error && (
          <Alert variant="danger" className="animate__animated animate__fadeIn">
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert variant="success" className="animate__animated animate__fadeIn">
            {success}
          </Alert>
        )}
        
        <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
          <Card.Header className="bg-gradient-primary text-white p-4">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <FaUserMd className="me-3" size={30} />
                <div>
                  <h4 className="mb-0 fw-bold">Active Doctors</h4>
                  <p className="mb-0 opacity-75">View all active hospital doctors</p>
                </div>
              </div>
              
              <div className="d-flex gap-2">
                <Button 
                  variant={groupBySpeciality ? 'light' : 'outline-light'}
                  size="sm"
                  onClick={() => setGroupBySpeciality(!groupBySpeciality)}
                >
                  {groupBySpeciality ? 'Show All' : 'Group by Speciality'}
                </Button>
              </div>
            </div>
          </Card.Header>
          
          <Card.Body>
            <Row className="mb-4">
              <Col md={6}>
                <Form onSubmit={handleSearchSubmit}>
                  <InputGroup>
                    <Form.Control
                      placeholder="Search doctors by name or qualification..."
                      value={search}
                      onChange={handleSearchChange}
                    />
                    <Button variant="primary" type="submit">
                      <FaSearch className="me-2" /> Search
                    </Button>
                  </InputGroup>
                </Form>
              </Col>
              <Col md={6}>
                <Form.Select 
                  value={selectedSpecialityFilter}
                  onChange={(e) => setSelectedSpecialityFilter(e.target.value)}
                  className="form-select"
                >
                  <option value="">All Specialities</option>
                  {specialities.map(speciality => (
                    <option key={speciality.SpecialityId} value={speciality.SpecialityId}>
                      {speciality.Speciality}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Loading active doctors...</p>
              </div>
            ) : filteredDoctors().length === 0 ? (
              <div className="text-center py-5">
                <FaUserMd size={50} className="text-muted mb-3" />
                <h5>No active doctors found</h5>
                <p className="text-muted">No doctors are currently active</p>
              </div>
            ) : (
              <div>
                {Object.entries(groupedDoctors()).map(([specialityName, doctorList]) => (
                  <div key={specialityName} className="mb-4">
                    {groupBySpeciality && (
                      <h5 className="text-primary mb-3 border-bottom pb-2">
                        <FaUserMd className="me-2" />
                        {specialityName} ({doctorList.length})
                      </h5>
                    )}
                    <div className="table-responsive">
                      <Table hover className="align-middle">
                        <thead>
                          <tr>
                            <th>Doctor Name</th>
                            <th>Qualification</th>
                            {!groupBySpeciality && <th>Speciality</th>}
                            <th>Contact</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Email</th>
                            <th>Password</th>
                          </tr>
                        </thead>
                        <tbody>
                          {doctorList.map(doctor => (
                            <tr key={doctor.DoctorId}>
                              <td>
                                <div className="d-flex align-items-center">
                                  {doctor.hasPhoto ? (
                                    <img 
                                      src={`${axiosInstance.defaults.baseURL}/api/v1/doctormaster/${doctor.DoctorId}/photo`} 
                                      alt={doctor.Doctor}
                                      className="rounded-circle me-2"
                                      style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                    />
                                  ) : (
                                    <div 
                                      className="rounded-circle bg-light d-flex align-items-center justify-content-center me-2"
                                      style={{ width: '40px', height: '40px' }}
                                    >
                                      <FaUserMd className="text-secondary" />
                                    </div>
                                  )}
                                  {doctor.Doctor}
                                  <Button
                                    variant="outline-primary"
                                    size="sm"
                                    className="ms-2"
                                    onClick={() => handleEditClick(doctor)}
                                    title="Edit Doctor"
                                  >
                                    <FaEdit />
                                  </Button>
                                </div>
                              </td>
      {/* Edit Doctor Modal */}
      <Modal show={showEditModal} onHide={handleEditModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="Doctor"
                value={editForm.Doctor}
                onChange={handleEditFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Qualification</Form.Label>
              <Form.Control
                name="Qualification"
                value={editForm.Qualification}
                onChange={handleEditFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="Phone"
                value={editForm.Phone}
                onChange={handleEditFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Speciality</Form.Label>
              <Form.Select
                name="SpecialityId"
                value={editForm.SpecialityId}
                onChange={handleEditFormChange}
              >
                <option value="">Select Speciality</option>
                {specialities.map(s => (
                  <option key={s.SpecialityId} value={s.SpecialityId}>{s.Speciality}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                name="IndoorYN"
                value={editForm.IndoorYN}
                onChange={handleEditFormChange}
              >
                <option value="">Select Type</option>
                <option value="Y">Indoor</option>
                <option value="N">Outdoor</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>RMO</Form.Label>
              <Form.Select
                name="RMO"
                value={editForm.RMO}
                onChange={handleEditFormChange}
              >
                <option value="">Select</option>
                <option value="Y">Yes</option>
                <option value="N">No</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="Email"
                type="email"
                value={editForm.Email}
                onChange={handleEditFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="Password"
                type="text"
                value={editForm.Password}
                onChange={handleEditFormChange}
                placeholder="Leave blank to keep unchanged"
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleEditModalClose} className="me-2">Cancel</Button>
              <Button variant="primary" type="submit">Update</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
                              <td>{doctor.Qualification}</td>
                              {!groupBySpeciality && (
                                <td>
                                  {doctor.SpecialityId && specialities.find(s => s.SpecialityId === doctor.SpecialityId)?.Speciality || 'Not specified'}
                                </td>
                              )}
                              <td>{doctor.Phone || '-'}</td>
                              <td>
                                <Badge bg={doctor.IndoorYN === 'Y' ? 'success' : 'secondary'}>
                                  {doctor.IndoorYN === 'Y' ? 'Indoor' : 'Outdoor'}
                                </Badge>
                                {doctor.RMO === 'Y' && (
                                  <Badge bg="info" className="ms-1">RMO</Badge>
                                )}
                              </td>
                              <td>
                                <Badge bg="success">
                                  Active
                                </Badge>
                              </td>
                              <td>{doctor.Email || '-'}</td>
                              <td>{doctor.Password || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
      
      <style>{`
        .bg-gradient-primary {
          background: linear-gradient(135deg, #3a50a0 0%, #788dce 100%);
        }
        
        .animate__animated {
          animation-duration: 0.5s;
        }
        
        .animate__fadeIn {
          animation-name: fadeIn;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </MasterLayout>
  );
};

export default ActiveDoctors;