import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import axiosInstance from '../../../../axiosInstance';

const QuickSearch = ({ onPatientSelect }) => {
  const [searchPhone, setSearchPhone] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchPhone || searchPhone.length < 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.get(`/api/v1/patientregistration/search-by-phone?phone=${searchPhone}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data?.success && response.data.data.length > 0) {
        setSearchResults(response.data.data);
      } else {
        setError('No patient found with this phone number');
        setSearchResults([]);
      }
    } catch (error) {
      setError('Error searching for patient');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const selectPatient = (patient) => {
    onPatientSelect(patient);
    setSearchResults([]);
    setSearchPhone('');
  };

  return (
    <Card className="mb-3">
      <Card.Header className="bg-primary text-white">
        <h6 className="mb-0">Quick Patient Search</h6>
      </Card.Header>
      <Card.Body>
        <div className="d-flex gap-2 mb-3">
          <Form.Control
            type="text"
            placeholder="Enter 10-digit phone number"
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
            maxLength="10"
          />
          <Button 
            variant="primary" 
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </div>
        
        {error && <Alert variant="warning">{error}</Alert>}
        
        {searchResults.length > 0 && (
          <div className="search-results">
            <h6>Found {searchResults.length} patient(s):</h6>
            {searchResults.map((patient, index) => (
              <Card key={index} className="mb-2">
                <Card.Body className="py-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{patient.PatientName}</strong> - {patient.PhoneNo}
                      <br />
                      <small className="text-muted">
                        Age: {patient.Age}, Gender: {patient.Sex}, ID: {patient.RegistrationId}
                      </small>
                    </div>
                    <Button 
                      size="sm" 
                      variant="success"
                      onClick={() => selectPatient(patient)}
                    >
                      Select
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default QuickSearch;