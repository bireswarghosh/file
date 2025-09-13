import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Badge, Alert, Spinner, Form, InputGroup } from 'react-bootstrap';
import { FaUserMd, FaEdit, FaTrash, FaSearch, FaPlus } from 'react-icons/fa';
import axiosInstance from '../../../axiosInstance';
import { useNavigate } from 'react-router-dom';
import MasterLayout from '../../MasterLayout';
import Breadcrumb from '../../Breadcrumb';

const DoctorList = () => {
  const navigate = useNavigate();
  
  // State variables
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState('');
  const [specialities, setSpecialities] = useState([]);
  const [specialityMap, setSpecialityMap] = useState({});
  
  // Fetch doctors on component mount
  useEffect(() => {
    fetchDoctors();
    fetchSpecialities();
  }, []);

  // Fetch doctors from API
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axiosInstance.get('/doctormaster', {
        headers: { 'Authorization': `Bearer ${token}` },
        params: { search: search }
      });
      
      if (response.data && response.data.success) {
        setDoctors(response.data.data || []);
      }
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setError('Failed to load doctors. Please try again.');
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
        const specialitiesData = response.data.data || [];
        setSpecialities(specialitiesData);
        
        // Create a map of speciality IDs to names for easy lookup
        const specMap = {};
        specialitiesData.forEach(spec => {
          specMap[spec.SpecialityId] = spec.Speciality;
        });
        setSpecialityMap(specMap);
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
    fetchDoctors();
  };

  // Navigate to edit doctor page
  const handleEdit = (doctorId) => {
    navigate(`/doctorform/${doctorId}`);
  };

  // Handle doctor deletion
  const handleDelete = async (doctorId) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        const response = await axiosInstance.delete(`/doctormaster/${doctorId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.data && response.data.success) {
          setSuccess('Doctor deleted successfully!');
          fetchDoctors(); // Refresh the list
        }
      } catch (err) {
        console.error('Error deleting doctor:', err);
        setError(err.response?.data?.message || 'Failed to delete doctor. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Doctor List" />
      
      <div className="container-fluid py-4">
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
                  <h4 className="mb-0 fw-bold">Doctors</h4>
                  <p className="mb-0 opacity-75">Manage hospital doctors</p>
                </div>
              </div>
              
              <Button 
                variant="light" 
                className="d-flex align-items-center"
                onClick={() => navigate('/doctorform')}
              >
                <FaPlus className="me-2" /> Add Doctor
              </Button>
            </div>
          </Card.Header>
          
          <Card.Body>
            <Form onSubmit={handleSearchSubmit} className="mb-4">
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
            
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Loading doctors...</p>
              </div>
            ) : doctors.length === 0 ? (
              <div className="text-center py-5">
                <FaUserMd size={50} className="text-muted mb-3" />
                <h5>No doctors found</h5>
                <p className="text-muted">Add a new doctor to get started</p>
              </div>
            ) : (
              <div className="table-responsive">
                <Table hover className="align-middle">
                  <thead>
                    <tr>
                      <th>Doctor Name</th>
                      <th>Qualification</th>
                      <th>Speciality</th>
                      <th>Contact</th>
                      <th>Type</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.map(doctor => (
                      <tr key={doctor.DoctorId}>
                        <td>
                          <div className="d-flex align-items-center">
                            {doctor.photoUrl ? (
                              <img 
                                src={`${axiosInstance.defaults.baseURL}${doctor.photoUrl}`} 
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
                          </div>
                        </td>
                        <td>{doctor.Qualification}</td>
                        <td>
                          {doctor.SpecialityId && specialityMap[doctor.SpecialityId] ? 
                            specialityMap[doctor.SpecialityId] : 
                            'Not specified'}
                        </td>
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
                          <div className="d-flex gap-2">
                            <Button 
                              variant="outline-primary" 
                              size="sm"
                              onClick={() => handleEdit(doctor.DoctorId)}
                              title="Edit doctor"
                            >
                              <FaEdit />
                            </Button>
                            <Button 
                              variant="outline-danger" 
                              size="sm"
                              onClick={() => handleDelete(doctor.DoctorId)}
                              title="Delete doctor"
                            >
                              <FaTrash />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
      
      <style jsx>{`
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

export default DoctorList;