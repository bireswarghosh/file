import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';
import axiosInstance from '../../../../axiosInstance';

const AdmissionDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { mode } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    AdmitionId: '',
    AdmitionNo: '',
    AdmitionDate: new Date().toISOString().split('T')[0],
    AdmitionTime: new Date().toTimeString().slice(0, 5),
    BillTime: new Date().toTimeString().slice(0, 5),
    OPD: '',
    OPDId: '',
    Booking: 'N',
    BookingId: '',
    PatientName: '',
    Add1: '',
    Add2: '',
    Add3: '',
    Age: '',
    AgeType: 'Y',
    Sex: '',
    MStatus: '',
    PhoneNo: '',
    AreaId: '',
    ReligionId: '',
    GurdianName: '',
    Relation: '',
    RelativeName: '',
    RelativePhoneNo: '',
    Company: 'N',
    CompanyId: '',
    DepartmentId: '',
    BedId: '',
    UCDoctor1Id: '',
    UCDoctor2Id: '',
    UCDoctor3Id: '',
    DiseaseId: '',
    RMOId: '',
    Referral: 'N',
    ReferralId: '',
    RefDoctorId: '',
    Package: 'N',
    PackageId: '',
    PackageAmount: '',
    CashLess: 'N',
    CashLessId: '',
    UserId: '',
    Status: 'A',
    Discharge: 'N',
    AdmitionNo1: '',
    Rename: '',
    AdmType: '',
    InsComp: '',
    DayCareYN: 'N',
    BedRate: '',
    DayCareId: '',
    PatientId: '',
    Remarks: '',
    SpRemarks: '',
    IdentNo: '',
    PolcNo: '',
    CCNNo: '',
    CardNo: '',
    PPN: '',
    BillDone: 'N',
    Occupation: '',
    Passport: '',
    DietChartId: '',
    tpaper: '',
    PanNo: '',
    PackageCHK: '',
    nameemployer: '',
    refdate: '',
    Nameemp: '',
    empcode: '',
    RefDoctorId2: '',
    packagevalid: '',
    optdiagoinc: '',
    optmediinc: '',
    optotherchargeinc: '',
    Weight: '',
    oprationdate: '',
    optime: '',
    AgeD: '',
    AgeTypeD: 'M',
    AgeN: '',
    AgeTypeN: 'D',
    URN: '',
    packagestart: '',
    AcGenLedCompany: '',
    optotinc: '',
    MEXECUTIVE: '',
    PackageId2: '',
    PackageId3: '',
    PackageId4: '',
    PackageAmount2: '',
    PackageAmount3: '',
    PackageAmount4: ''
  });

  useEffect(() => {
    if (id && mode !== 'new') {
      loadAdmissionData();
    }
  }, [id, mode]);

  const loadAdmissionData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.get(`/admission/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data?.success) {
        setFormData(response.data.data);
      }
    } catch (error) {
      console.error('Error loading admission data:', error);
      alert('Error loading admission data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      let response;
      
      if (mode === 'edit' && id) {
        response = await axiosInstance.put(`/admission/${id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        response = await axiosInstance.post('/admission', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      if (response.data?.success) {
        alert(`${mode === 'edit' ? 'Updated' : 'Created'} successfully!`);
        navigate('/admission-list');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.response?.data?.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this admission?')) {
      try {
        const token = localStorage.getItem('token');
        await axiosInstance.delete(`/admission/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Deleted successfully!');
        navigate('/admission-list');
      } catch (error) {
        alert('Error deleting admission');
      }
    }
  };

  const handleNew = () => {
    setFormData({
      AdmitionId: '',
      AdmitionNo: '',
      AdmitionDate: new Date().toISOString().split('T')[0],
      AdmitionTime: new Date().toTimeString().slice(0, 5),
      BillTime: new Date().toTimeString().slice(0, 5),
      OPD: '',
      OPDId: '',
      Booking: 'N',
      BookingId: '',
      PatientName: '',
      Add1: '',
      Add2: '',
      Add3: '',
      Age: '',
      AgeType: 'Y',
      Sex: '',
      MStatus: '',
      PhoneNo: '',
      AreaId: '',
      ReligionId: '',
      GurdianName: '',
      Relation: '',
      RelativeName: '',
      RelativePhoneNo: '',
      Company: 'N',
      CompanyId: '',
      DepartmentId: '',
      BedId: '',
      UCDoctor1Id: '',
      UCDoctor2Id: '',
      UCDoctor3Id: '',
      DiseaseId: '',
      RMOId: '',
      Referral: 'N',
      ReferralId: '',
      RefDoctorId: '',
      Package: 'N',
      PackageId: '',
      PackageAmount: '',
      CashLess: 'N',
      CashLessId: '',
      UserId: '',
      Status: 'A',
      Discharge: 'N',
      AdmitionNo1: '',
      Rename: '',
      AdmType: '',
      InsComp: '',
      DayCareYN: 'N',
      BedRate: '',
      DayCareId: '',
      PatientId: '',
      Remarks: '',
      SpRemarks: '',
      IdentNo: '',
      PolcNo: '',
      CCNNo: '',
      CardNo: '',
      PPN: '',
      BillDone: 'N',
      Occupation: '',
      Passport: '',
      DietChartId: '',
      tpaper: '',
      PanNo: '',
      PackageCHK: '',
      nameemployer: '',
      refdate: '',
      Nameemp: '',
      empcode: '',
      RefDoctorId2: '',
      packagevalid: '',
      optdiagoinc: '',
      optmediinc: '',
      optotherchargeinc: '',
      Weight: '',
      oprationdate: '',
      optime: '',
      AgeD: '',
      AgeTypeD: 'M',
      AgeN: '',
      AgeTypeN: 'D',
      URN: '',
      packagestart: '',
      AcGenLedCompany: '',
      optotinc: '',
      MEXECUTIVE: '',
      PackageId2: '',
      PackageId3: '',
      PackageId4: '',
      PackageAmount2: '',
      PackageAmount3: '',
      PackageAmount4: ''
    });
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Patient Admission - Detail" />
      <div className="container-fluid py-4">
        <div className="card shadow-lg border-0 rounded-4 bg-white">
          <div className="card-header pb-0 border-bottom-0">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1">
                  {mode === 'view' ? 'View Admission' : mode === 'edit' ? 'Edit Admission' : 'New Admission'}
                </h5>
                <p className="text-muted mb-0">
                  {mode === 'view' ? 'Admission information (Read Only)' : mode === 'edit' ? 'Update admission information' : 'Create new admission'}
                </p>
              </div>
            </div>
          </div>

          <div className="card-body p-4">
            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading admission data...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Basic Information */}
                <div className="mb-4 border rounded p-3 bg-light">
                  <h6 className="fw-bold border-bottom pb-2 text-primary">Basic Information</h6>
                  <div className="row g-3">
                    <div className="col-md-3">
                      <label>Admission ID</label>
                      <input name="AdmitionId" className="form-control" value={formData.AdmitionId} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                    <div className="col-md-3">
                      <label>Admission No</label>
                      <input name="AdmitionNo" className="form-control" value={formData.AdmitionNo} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                    <div className="col-md-3">
                      <label>Admission Date</label>
                      <input type="date" name="AdmitionDate" className="form-control" value={formData.AdmitionDate} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                    <div className="col-md-3">
                      <label>Admission Time</label>
                      <input type="time" name="AdmitionTime" className="form-control" value={formData.AdmitionTime} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                    <div className="col-md-3">
                      <label>Bill Time</label>
                      <input type="time" name="BillTime" className="form-control" value={formData.BillTime} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                    <div className="col-md-3">
                      <label>OPD</label>
                      <select name="OPD" className="form-control" value={formData.OPD} onChange={handleChange} disabled={mode === 'view'}>
                        <option value="">Select</option>
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label>OPD ID</label>
                      <input name="OPDId" className="form-control" value={formData.OPDId} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                    <div className="col-md-3">
                      <label>Booking</label>
                      <select name="Booking" className="form-control" value={formData.Booking} onChange={handleChange} disabled={mode === 'view'}>
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Patient Information */}
                <div className="mb-4 border rounded p-3 bg-light">
                  <h6 className="fw-bold border-bottom pb-2 text-primary">Patient Information</h6>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label>Patient Name</label>
                      <input name="PatientName" className="form-control" value={formData.PatientName} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                    <div className="col-md-2">
                      <label>Age</label>
                      <input type="number" name="Age" className="form-control" value={formData.Age} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                    <div className="col-md-2">
                      <label>Age Type</label>
                      <select name="AgeType" className="form-control" value={formData.AgeType} onChange={handleChange} disabled={mode === 'view'}>
                        <option value="Y">Years</option>
                        <option value="M">Months</option>
                        <option value="D">Days</option>
                      </select>
                    </div>
                    <div className="col-md-2">
                      <label>Sex</label>
                      <select name="Sex" className="form-control" value={formData.Sex} onChange={handleChange} disabled={mode === 'view'}>
                        <option value="">Select</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
                      </select>
                    </div>
                    <div className="col-md-2">
                      <label>Marital Status</label>
                      <select name="MStatus" className="form-control" value={formData.MStatus} onChange={handleChange} disabled={mode === 'view'}>
                        <option value="">Select</option>
                        <option value="M">Married</option>
                        <option value="U">Unmarried</option>
                        <option value="D">Divorced</option>
                        <option value="W">Widowed</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label>Phone No</label>
                      <input name="PhoneNo" className="form-control" value={formData.PhoneNo} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                    <div className="col-md-4">
                      <label>Guardian Name</label>
                      <input name="GurdianName" className="form-control" value={formData.GurdianName} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                    <div className="col-md-2">
                      <label>Weight</label>
                      <input name="Weight" className="form-control" value={formData.Weight} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="mb-4 border rounded p-3 bg-light">
                  <h6 className="fw-bold border-bottom pb-2 text-primary">Address Information</h6>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label>Address 1</label>
                      <input name="Add1" className="form-control" value={formData.Add1} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                    <div className="col-md-4">
                      <label>Address 2</label>
                      <input name="Add2" className="form-control" value={formData.Add2} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                    <div className="col-md-4">
                      <label>Address 3</label>
                      <input name="Add3" className="form-control" value={formData.Add3} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                    <div className="col-md-3">
                      <label>Area ID</label>
                      <input type="number" name="AreaId" className="form-control" value={formData.AreaId} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                    <div className="col-md-3">
                      <label>Religion ID</label>
                      <input type="number" name="ReligionId" className="form-control" value={formData.ReligionId} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                  </div>
                </div>

                {/* Medical Information */}
                <div className="mb-4 border rounded p-3 bg-light">
                  <h6 className="fw-bold border-bottom pb-2 text-primary">Medical Information</h6>
                  <div className="row g-3">
                    <div className="col-md-3">
                      <label>Department ID</label>
                      <input type="number" name="DepartmentId" className="form-control" value={formData.DepartmentId} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                    <div className="col-md-3">
                      <label>Bed ID</label>
                      <input type="number" name="BedId" className="form-control" value={formData.BedId} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                    <div className="col-md-3">
                      <label>Doctor 1 ID</label>
                      <input type="number" name="UCDoctor1Id" className="form-control" value={formData.UCDoctor1Id} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                    <div className="col-md-3">
                      <label>Doctor 2 ID</label>
                      <input type="number" name="UCDoctor2Id" className="form-control" value={formData.UCDoctor2Id} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                    <div className="col-md-3">
                      <label>Doctor 3 ID</label>
                      <input type="number" name="UCDoctor3Id" className="form-control" value={formData.UCDoctor3Id} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                    <div className="col-md-3">
                      <label>Disease ID</label>
                      <input type="number" name="DiseaseId" className="form-control" value={formData.DiseaseId} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                    <div className="col-md-3">
                      <label>RMO ID</label>
                      <input type="number" name="RMOId" className="form-control" value={formData.RMOId} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                    <div className="col-md-3">
                      <label>Bed Rate</label>
                      <input type="number" name="BedRate" className="form-control" value={formData.BedRate} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                  </div>
                </div>

                {/* Package Information */}
                <div className="mb-4 border rounded p-3 bg-light">
                  <h6 className="fw-bold border-bottom pb-2 text-primary">Package Information</h6>
                  <div className="row g-3">
                    <div className="col-md-2">
                      <label>Package</label>
                      <select name="Package" className="form-control" value={formData.Package} onChange={handleChange} disabled={mode === 'view'}>
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                      </select>
                    </div>
                    <div className="col-md-2">
                      <label>Package ID</label>
                      <input type="number" name="PackageId" className="form-control" value={formData.PackageId} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                    <div className="col-md-2">
                      <label>Package Amount</label>
                      <input type="number" name="PackageAmount" className="form-control" value={formData.PackageAmount} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                    <div className="col-md-2">
                      <label>Package ID 2</label>
                      <input type="number" name="PackageId2" className="form-control" value={formData.PackageId2} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                    <div className="col-md-2">
                      <label>Package Amount 2</label>
                      <input type="number" name="PackageAmount2" className="form-control" value={formData.PackageAmount2} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                    <div className="col-md-2">
                      <label>Package ID 3</label>
                      <input type="number" name="PackageId3" className="form-control" value={formData.PackageId3} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="mb-4 border rounded p-3 bg-light">
                  <h6 className="fw-bold border-bottom pb-2 text-primary">Additional Information</h6>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label>Remarks</label>
                      <textarea name="Remarks" className="form-control" rows="3" value={formData.Remarks} onChange={handleChange} disabled={mode === 'view'}></textarea>
                    </div>
                    <div className="col-md-6">
                      <label>Special Remarks</label>
                      <textarea name="SpRemarks" className="form-control" rows="3" value={formData.SpRemarks} onChange={handleChange} disabled={mode === 'view'}></textarea>
                    </div>
                    <div className="col-md-3">
                      <label>Patient ID</label>
                      <input name="PatientId" className="form-control" value={formData.PatientId} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                    <div className="col-md-3">
                      <label>Occupation</label>
                      <input name="Occupation" className="form-control" value={formData.Occupation} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                    <div className="col-md-3">
                      <label>PAN No</label>
                      <input name="PanNo" className="form-control" value={formData.PanNo} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                    <div className="col-md-3">
                      <label>URN</label>
                      <input name="URN" className="form-control" value={formData.URN} onChange={handleChange} disabled={mode === 'view'} />
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Footer Action Buttons */}
          <div className="card-footer p-3 bg-light border-top">
            <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-2">
              <button type="button" className="btn btn-outline-secondary rounded-pill px-3" onClick={handleNew}>New</button>
              <button type="button" className="btn btn-outline-primary rounded-pill px-3" onClick={() => navigate(`/admission-detail/${id}`, { state: { mode: 'edit' } })}>Edit</button>
              {mode !== 'view' && (
                <button type="submit" className="btn btn-success rounded-pill px-3" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>
              )}
              {id && (
                <button type="button" className="btn btn-danger rounded-pill px-3" onClick={handleDelete}>Delete</button>
              )}
              <button type="button" className="btn btn-dark rounded-pill px-3" onClick={() => navigate('/admission-list')}>Exit</button>
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default AdmissionDetail;