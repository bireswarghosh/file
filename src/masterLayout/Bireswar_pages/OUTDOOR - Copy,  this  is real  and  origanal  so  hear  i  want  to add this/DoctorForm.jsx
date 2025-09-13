import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { FaUserMd, FaSave } from 'react-icons/fa';
import axiosInstance from '../../../axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';

const DoctorForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  // State for form data
  const [formData, setFormData] = useState({
    Doctor: '',
    Qualification: '',
    SpecialityId: '',
    Phone: '',
    IndoorYN: 'N',
    RMO: 'N',
    Photo: null
  });

  // State for specialities dropdown
  const [specialities, setSpecialities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch specialities on component mount
  useEffect(() => {
    fetchSpecialities();
    
    // If in edit mode, fetch doctor data
    if (isEditMode) {
      fetchDoctorData();
    }
  }, [isEditMode]);

  // Fetch specialities from API
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
      setError('Failed to load specialities. Please try again.');
    }
  };

  // Fetch doctor data for editing
  const fetchDoctorData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axiosInstance.get(`/doctormaster/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.data && response.data.success) {
        const doctorData = response.data.data;
        setFormData({
          Doctor: doctorData.Doctor || '',
          Qualification: doctorData.Qualification || '',
          SpecialityId: doctorData.SpecialityId || '',
          Phone: doctorData.Phone || '',
          IndoorYN: doctorData.IndoorYN || 'N',
          RMO: doctorData.RMO || 'N',
          Photo: null
        });
        
        // Set image preview if doctor has a photo
        if (doctorData.photoUrl) {
          setImagePreview(`${axiosInstance.defaults.baseURL}${doctorData.photoUrl}`);
        }
      }
    } catch (err) {
      console.error('Error fetching doctor data:', err);
      setError('Failed to load doctor data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      // Handle file input
      const file = files[0];
      setFormData(prev => ({ ...prev, [name]: file }));
      
      // Create preview URL for the selected image
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else if (type === 'checkbox') {
      // Handle checkbox input (for IndoorYN and RMO)
      setFormData(prev => ({ 
        ...prev, 
        [name]: checked ? 'Y' : 'N' 
      }));
    } else {
      // Handle other inputs
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Create FormData object for file upload
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          formDataToSend.append(key, value);
        }
      });
      
      let response;
      
      if (isEditMode) {
        // Update existing doctor
        response = await axiosInstance.put(`/doctormaster/${id}`, formDataToSend, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        // Create new doctor
        response = await axiosInstance.post('/doctormaster', formDataToSend, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      
      if (response.data && response.data.success) {
        setSuccess(isEditMode ? 'Doctor updated successfully!' : 'Doctor created successfully!');
        
        // Redirect to doctor list after a short delay
        setTimeout(() => {
          navigate('/doctorlist');
        }, 1500);
      }
    } catch (err) {
      console.error('Error saving doctor:', err);
      setError(err.response?.data?.message || 'Failed to save doctor. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
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
          <div className="d-flex align-items-center">
            <FaUserMd className="me-3" size={30} />
            <div>
              <h4 className="mb-0 fw-bold">{isEditMode ? 'Edit Doctor' : 'Add New Doctor'}</h4>
              <p className="mb-0 opacity-75">Enter doctor details below</p>
            </div>
          </div>
        </Card.Header>
        
        <Card.Body className="p-4">
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Loading doctor data...</p>
            </div>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Row className="g-4">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Doctor Name <span className="text-danger">*</span></Form.Label>
                    <Form.Control 
                      type="text" 
                      name="Doctor" 
                      value={formData.Doctor} 
                      onChange={handleChange}
                      required
                      placeholder="Enter doctor's full name"
                    />
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Qualification</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="Qualification" 
                      value={formData.Qualification} 
                      onChange={handleChange}
                      placeholder="e.g., MBBS, MD, MS"
                    />
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Speciality</Form.Label>
                    <Form.Select 
                      name="SpecialityId" 
                      value={formData.SpecialityId} 
                      onChange={handleChange}
                    >
                      <option value="">-- Select Speciality --</option>
                      {specialities.map(speciality => (
                        <option key={speciality.SpecialityId} value={speciality.SpecialityId}>
                          {speciality.Speciality}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="Phone" 
                      value={formData.Phone} 
                      onChange={handleChange}
                      placeholder="Enter contact number"
                    />
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <div className="d-flex flex-column h-100">
                    <div className="mb-3">
                      <Form.Check 
                        type="checkbox"
                        id="indoorDoctor"
                        label="Indoor Doctor"
                        name="IndoorYN"
                        checked={formData.IndoorYN === 'Y'}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div>
                      <Form.Check 
                        type="checkbox"
                        id="rmoDoctor"
                        label="RMO Doctor"
                        name="RMO"
                        checked={formData.RMO === 'Y'}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </Col>
                
                <Col md={6}>
                  <div className="h-100 d-flex flex-column">
                    <Form.Label>Doctor's Photo</Form.Label>
                    <div className="flex-grow-1 border rounded-3 p-3 d-flex flex-column align-items-center justify-content-center position-relative">
                      {imagePreview ? (
                        <div className="text-center">
                          <img 
                            src={imagePreview} 
                            alt="Doctor preview" 
                            className="img-fluid mb-2" 
                            style={{ maxHeight: '200px', maxWidth: '100%' }}
                          />
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => {
                              setImagePreview(null);
                              setFormData(prev => ({ ...prev, Photo: null }));
                            }}
                          >
                            Remove Photo
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center text-muted">
                          <FaUserMd size={60} className="mb-3 opacity-50" />
                          <p>No photo selected</p>
                          <Form.Control 
                            type="file" 
                            name="Photo" 
                            onChange={handleChange}
                            accept="image/*"
                            className="d-none"
                            id="photoUpload"
                          />
                          <label htmlFor="photoUpload" className="btn btn-outline-primary">
                            Select Photo
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </Col>
                
                <Col md={12} className="mt-4">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="d-flex align-items-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner 
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave className="me-2" /> {isEditMode ? 'Update Doctor' : 'Save Doctor'}
                      </>
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Card.Body>
      </Card>
      
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
    </div>
  );
};

export default DoctorForm;