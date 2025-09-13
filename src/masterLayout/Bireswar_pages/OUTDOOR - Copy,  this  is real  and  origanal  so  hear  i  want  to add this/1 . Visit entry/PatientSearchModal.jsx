import React from 'react';
import { Modal, Button, Table, Badge } from 'react-bootstrap';
import './PatientSearchModal.css';

const PatientSearchModal = ({ show, onHide, patients, onSelectPatient }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered className="patient-search-modal">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>
          <i className="fas fa-users me-2"></i>
          Multiple Patients Found
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <Badge bg="info" className="me-2">
            <i className="fas fa-info-circle me-1"></i>
            {patients.length} patients found with this phone number
          </Badge>
        </div>
        
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Guardian</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={index}>
                <td>
                  <strong>{patient.PatientName}</strong>
                  <br />
                  <small className="text-muted">
                    <i className="fas fa-phone me-1"></i>
                    {patient.PhoneNo}
                  </small>
                </td>
                <td>
                  {patient.Age} Years
                  <br />
                  <small className="text-muted">
                    DOB: {patient.dob ? new Date(patient.dob).toLocaleDateString('en-GB') : 'N/A'}
                  </small>
                </td>
                <td>
                  <Badge bg={patient.Sex === 'M' ? 'primary' : 'pink'}>
                    {patient.Sex === 'M' ? 'Male' : 'Female'}
                  </Badge>
                </td>
                <td>
                  {patient.GurdianName}
                  <br />
                  <small className="text-muted">{patient.Relation}</small>
                </td>
                <td>
                  <small>{patient.Add1 || 'No address'}</small>
                </td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => onSelectPatient(patient)}
                  >
                    <i className="fas fa-check me-1"></i>
                    Select
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          <i className="fas fa-times me-1"></i>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PatientSearchModal;