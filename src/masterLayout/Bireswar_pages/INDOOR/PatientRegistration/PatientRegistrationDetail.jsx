import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';
import axiosInstance from '../../../../axiosInstance';
import Barcode from 'react-barcode';

const PatientRegistrationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const modeParam = urlParams.get('mode');
    if (id) {
      return modeParam || 'view';
    }
    return 'create';
  });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    AdmitionNo: '',
    AdmitionDate: new Date().toISOString().split('T')[0],
    BillTime: '12:00',
    AdmitionTime: '13:15',
    OPD: 'Y',
    Booking: 'N',
    PatientId: '',
    BillNo: '',
    RegistrationNo: '',
    EMRNo: '',
    Package: '',
    PatientName: '',
    Add1: '',
    Add2: '',
    Add3: '',
    PinCode: '',
    Occupation: '',
    DateOfBirth: '',
    Age: '0',
    AgeD: '0',
    AgeN: '0',
    Sex: 'M',
    MStatus: 'U',
    ReligionId: 'HINDU',
    PanNo: '',
    State: '',
    Nationality: '',
    Weight: '0.000',
    PhoneNo: '',
    IdentNo: '',
    AreaId: '',  // Added for Area district/police station
    District: '',
    URN: '',
    ReligionId: '',
    PanNo: '',
    nameemployer: '',
    Passport: '',
    GurdianName: '',
    Relation: '',
    DietChartId: '',
    RelativeName: '',
    RelativePhoneNo: '',
    DepartmentId: '',
    CompanyId: '',
    AdmissionType: '',
    // Company: '',
    refdate: '',
    DepartmentId: '',
    BedId: '',
    BedRate: '',
    NursingCharge: '0',
    UCDoctor1Id: '',
    UCDoctor2Id: '',
    UCDoctor3Id: '',
    DayCareYN: 'Y',
    Particular: '',
    BMDCharge: '0',
    HealthCardNo: '',
    DayCareBedRate: '0.00',
    Nameemp: '',
    empcode: '',
    PatientsDoctor: '',
    DiseaseId: '',
    PolcNo: '',
    MEXECUTIVE: '',
    RMOId: '',
    CardNo: '',
    RefDoctorId: '',
    CCNNo: '',
    RefDoctorId2: '',
    DiseaseCode: '',
    PackageAmount: '0.00',
    TotalPackage: '0.00',
    DischargeDate: '',
    FinalBillDate: '',
    AdmissionBy: 'Admin',
    CurrentUser: 'Admin',
    oprationdate: '',
    optime: '',
    FFN: '',
    optdiagoinc: '',
    optmediinc: '',
    optotherchargeinc: '',
    optotinc: '',
    Referral: '',
    ReferralId: '',
    PackageId: '',
    InsComp: '',
    Remarks: '',
    SpRemarks: '',
    CashLess: 'Y',
    packagevalid: '2000-01-01',
    packagestart: '2000-01-01',
    BedYN: 'N'
  });

  useEffect(() => {
    if (id) {
      fetchAdmission();
    }
  }, [id]);



  const fetchAdmission = async () => {
    try {
      setLoading(true);
      const decodedId = decodeURIComponent(id);
      const response = await axiosInstance.get(`/admission/${decodedId}`);
      if (response.data.success) {
        const apiData = response.data.data;
        console.log('API Data:', apiData);
        setFormData({
          ...apiData,
          AdmitionDate: apiData.AdmitionDate ? apiData.AdmitionDate.substring(0, 10) : '',
          OPD: apiData.OPD || 'Y',
          oprationdate: apiData.oprationdate ? apiData.oprationdate.substring(0, 10) : '',
          packagevalid: apiData.packagevalid ? apiData.packagevalid.substring(0, 10) : '',
          packagestart: apiData.packagestart ? apiData.packagestart.substring(0, 10) : '',
          refdate: apiData.refdate ? apiData.refdate.substring(0, 10) : ''
        });
      }
    } catch (error) {
      console.error('Error fetching admission:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = mode === 'create' 
        ? await axiosInstance.post('/admission', formData)
        : await axiosInstance.put(`/admission/${decodeURIComponent(id)}`, formData);
      
      if (response.data.success) {
        alert(`Admission ${mode === 'create' ? 'created' : 'updated'} successfully!`);
        if (mode === 'create') {
          navigate('/patient-registration');
        } else {
          setMode('view');
        }
      }
    } catch (error) {
      console.error('Error saving admission:', error);
      alert('Error saving admission');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this admission?')) return;
    
    try {
      setLoading(true);
      const response = await axiosInstance.delete(`/admission/${decodeURIComponent(id)}`);
      if (response.data.success) {
        alert('Admission deleted successfully!');
        navigate('/patient-registration');
      }
    } catch (error) {
      console.error('Error deleting admission:', error);
      alert('Error deleting admission');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Patient Registration - Detail" />
      <div className="container-fluid py-4 px-lg-4">
        <div className="card shadow-xl border-0 rounded-4 bg-light">
          <div className="card-body p-4">
            {/* Admission Detail */}
            <div className="mb-4 border rounded p-3 bg-white">
              <h6 className="fw-bold border-bottom pb-2 text-primary">Admission Detail</h6>
              <div className="row g-3 align-items-end">
                <div className="col-md-2">
                  {formData.AdmitionNo && (
                    <div className="mb-2 text-center">
                      <Barcode 
                        value={formData.AdmitionNo} 
                        format="CODE128"
                        width={2}
                        height={40}
                        displayValue={true}
                        fontSize={12}
                        margin={5}
                      />
                    </div>
                  )}
                  <label className="form-label">Admission No</label>
                  <input type="text" name="AdmitionNo" className="form-control" value={formData.AdmitionNo} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>
                <div className="col-md-2">
                  <label className="form-label">Date</label>

                  <input type="date" name="AdmitionDate" className="form-control" value={formData.AdmitionDate} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>
                <div className="col-md-2">
                  <label className="form-label">Bill Time</label>
                  <input type="text" name="BillTime" className="form-control" value={formData.BillTime} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>
                <div className="col-md-2">
                  <label className="form-label">Admission Time</label>
                  <input type="text" name="AdmitionTime" className="form-control" value={formData.AdmitionTime} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>
                <div className="col-md-2">
                  <label className="form-label">O.P.D. [Y/N]</label>
                  <select name="OPD" className="form-select" value={formData.OPD} onChange={handleInputChange} disabled={mode === 'view'}>
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label className="form-label">Booking [Y/N]</label>
                  <select name="Booking" className="form-select" value={formData.Booking} onChange={handleInputChange} disabled={mode === 'view'}>
                    <option value="N">N</option>
                    <option value="Y">Y</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label className="form-label">Patient Id</label>
                  <input type="text" name="PatientId" className="form-control" value={formData.PatientId} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>
                <div className="col-md-2">
                  <label className="form-label">Package [Y/N]</label>
                  <select name="Package" className="form-select" value={formData.Package} onChange={handleInputChange} disabled={mode === 'view'}>
                    <option value="N">N</option>
                    <option value="Y">Y</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Patient Detail */}
            <div className="mb-4 border rounded p-3 bg-white">
              <h6 className="fw-bold border-bottom pb-2 text-primary">Patient Detail</h6>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Patient's Name</label>
                  <input type="text" name="PatientName" className="form-control" value={formData.PatientName} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Address</label>
                  <input type="text" name="Add1" className="form-control" value={formData.Add1} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>
                <div className="col-md-2">
                  <label className="form-label">Area</label>
                  <input type="text" name="Add2" className="form-control" value={formData.Add2} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>
                <div className="col-md-2">
                  <label className="form-label">Pin Code</label>
                  <input type="text" name="Add3" className="form-control" value={formData.Add3} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Occupation </label>
                  <input type="text" name="Occupation" className="form-control" value={formData.Occupation} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>
                <div className="col-md-2">
                  <label className="form-label">Age</label>
                  <div className="input-group">
                    <input type="text" name="Age" className="form-control" placeholder="Y" value={formData.Age} onChange={handleInputChange} disabled={mode === 'view'} />Y
                    <input type="text" name="AgeD" className="form-control" placeholder="M" value={formData.AgeD} onChange={handleInputChange} disabled={mode === 'view'} />M
                    <input type="text" name="AgeN" className="form-control" placeholder="D" value={formData.AgeN} onChange={handleInputChange} disabled={mode === 'view'} />D
                  </div>
                </div>
                <div className="col-md-2">
                  <label className="form-label">Sex</label>
                  <select name="Sex" className="form-select" value={formData.Sex} onChange={handleInputChange} disabled={mode === 'view'}>
                    <option value="M">M</option>
                    <option value="F">F</option>
                    <option value="O">O</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label className="form-label">Weight</label>
                  <input type="text" name="Weight" className="form-control" value={formData.Weight} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Phone</label>
                  <input type="text" name="PhoneNo" className="form-control" value={formData.PhoneNo} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Id Proof(Aadhaar/Passport)</label>
                  <input type="text" name="IdentNo" className="form-control" value={formData.IdentNo} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>

{/* add  this 2 */}

                  <div className="col-md-3">
                  <label className="form-label">District/ps </label>
                  developer comment -- this is  come  from  this table  SELECT * FROM `area`
                  <input type="text" name="AreaId" className="form-control" value={formData.AreaId} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>






                {/* !  upper bireswar added */}

                <div className="col-md-3">
                  <label className="form-label">URN</label>
                  <input type="text" name="URN" className="form-control" value={formData.URN} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>




   <div className="col-md-3">
                  <label className="form-label">Religion</label>
                  <input type="text" name="ReligionId" className="form-control" value={formData.ReligionId} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>



   <div className="col-md-3">
                  <label className="form-label">PAN No</label>
                  <input type="text" name="PanNo" className="form-control" value={formData.PanNo} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>



  <div className="col-md-3">
                  <label className="form-label">State (this is come from this table SELECT * FROM `area` //Zone  id  whhich  come  from zone table  )</label>
                  <input type="text" name="PanNo" className="form-control" value={formData.PanNo} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>




   <div className="col-md-3">
                  <label className="form-label">Nationality</label>
                  <input type="text" name="Passport" className="form-control" value={formData.Passport} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>


              </div>
            </div>

            {/* Guardian Detail */}
            <div className="mb-4 border rounded p-3 bg-white">
              <h6 className="fw-bold border-bottom pb-2 text-primary">Guardian Detail</h6>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Guardian Name</label>
                  <input type="text" name="GurdianName" className="form-control" value={formData.GurdianName} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Relation</label>
                  <input type="text" name="Relation" className="form-control" value={formData.Relation} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Relative Name</label>
                  <input type="text" name="RelativeName" className="form-control" value={formData.RelativeName} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Phone No</label>
                  <input type="text" name="RelativePhoneNo" className="form-control" value={formData.RelativePhoneNo} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>


     <div className="col-md-4">
                  <label className="form-label">Diet (SELECT * FROM `dietchart`  show  dropdown)</label>
                  <input type="text" name="DietChartId" className="form-control" value={formData.DietChartId} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>




    <div className="col-md-4">
                  <label className="form-label">Adminaction type [it  will be  may be this  field  --   AdmType]</label>
                  <input type="text" name="DietChartId" className="form-control" value={formData.DietChartId} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>


  <div className="col-md-4">
                  <label className="form-label">Company [Y/N]</label>
                  <input type="text" name="Company" 
                  className="form-control" value={formData.Company} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>

  <div className="col-md-4">
                  <label className="form-label">Company Name[hear  this  is come  from  cashless table/CashlessId]</label>
                  <input type="text" name="CompanyId" 
                  className="form-control" value={formData.CompanyId} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>




  <div className="col-md-4">
                  <label className="form-label">Name of Employer</label>
                  <input type="text" name="nameemployer" 
                  className="form-control" value={formData.nameemployer} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>


                <div className="col-md-4">
                  <label className="form-label">Ref Date</label>
                  <input type="date" name="refdate" className="form-control" value={formData.refdate} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>

              </div>
            </div>

            {/* Others Detail */}
            <div className="mb-4 border rounded p-3 bg-white">
              <h6 className="fw-bold border-bottom pb-2 text-primary">Others Detail</h6>
              <div className="row g-3">


 <div className="col-md-2">
                  <label className="form-label">Department[ this is  come  from -- SELECT * FROM `departmentindoor` table  / DepartmentId]</label>
                  <input type="text" name="DepartmentId" className="form-control" value={formData.DepartmentId} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>



{/*  */}



 <div className="col-md-2">
                  <label className="form-label">Under Care Doctor (SELECT * FROM `doctormaster` AND USE  THIS  API/doctormaster/7942)</label>
                  <input type="text" name="UCDoctor1Id" className="form-control" value={formData.UCDoctor1Id} onChange={handleInputChange} disabled={mode === 'view'} />
              
              <input type="text" name="UCDoctor2Id" className="form-control" value={formData.UCDoctor2Id} onChange={handleInputChange} disabled={mode === 'view'} />


              <input type="text" name="UCDoctor3Id" className="form-control" value={formData.UCDoctor3Id} onChange={handleInputChange} disabled={mode === 'view'} />
              
              
                </div>




   <div className="col-md-2">
                  <label className="form-label">Referral [Y/N] :</label>
                  <input type="text" name="Referral" className="form-control" value={formData.Referral} onChange={handleInputChange} disabled={mode === 'view'} />
              
       THIS IS  COME  FROM  https://xrk77z9r-5000.inc1.devtunnels.ms/api/v1/mexecutive 
               <input type="text" name="ReferralId" className="form-control" value={formData.ReferralId} onChange={handleInputChange} disabled={mode === 'view'} />
              
              
                </div>




   <div className="col-md-2">
                  <label className="form-label">Package [Y/N]: </label>
                  <input type="text" name="Package" className="form-control" value={formData.Package} onChange={handleInputChange} disabled={mode === 'view'} />
              
                      THIS  IS  COME  FROM  /packages   COME  FROM  THIS  API 


                  <input type="text" name="PackageId" className="form-control" value={formData.PackageId} onChange={handleInputChange} disabled={mode === 'view'} />
                   
              
              
              
                </div>





  
                  <div className="mb-2">
                    <label className="form-label">Valid Till</label>
                    <input type="date" name="packagevalid" className="form-control" value={formData.packagevalid} onChange={handleInputChange} disabled={mode === 'view'} />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Start Date</label>
                    <input type="date" name="packagestart" className="form-control" value={formData.packagestart} onChange={handleInputChange} disabled={mode === 'view'} />
                  </div>





  



     <div className="col-md-2">
                  <label className="form-label">CaseLess [Y/N] </label>
                  <input type="text" name="Package" className="form-control" value={formData.Package} onChange={handleInputChange} disabled={mode === 'view'} />
              
                      THIS  IS  COME  FROM  /packages   COME  FROM  THIS  API 


                  <input type="text" name="PackageId" className="form-control" value={formData.PackageId} onChange={handleInputChange} disabled={mode === 'view'} />
                   
              
              
              
                </div>




   <div className="col-md-2">
                  <label className="form-label">Name Of Ins. Comp</label>
                  <input type="text" name="InsComp" className="form-control" value={formData.InsComp} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>





   <div className="mb-2">
                    <label className="form-label">Notes</label>
                    <textarea name="SpRemarks" className="form-control" rows="2" value={formData.SpRemarks} onChange={handleInputChange} disabled={mode === 'view'}></textarea>
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Remark</label>
                    <textarea name="Remarks" className="form-control" rows="2" value={formData.Remarks} onChange={handleInputChange} disabled={mode === 'view'}></textarea>
                  </div>






THIS 2  Bed No AND  Bed Rate  is  come  from  this  API
https://xrk77z9r-5000.inc1.devtunnels.ms/api/v1/bedMaster 
      <div className="col-md-2">
                  <label className="form-label">Bed No</label>
                  <input type="text" name="BedId" className="form-control" value={formData.BedId} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>

                <div className="col-md-2">
                  <label className="form-label">Bed Rate</label>
                  <input type="text" name="BedRate" className="form-control" value={formData.BedRate} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>



                <div className="col-md-2">
                  <label className="form-label">Day Care [Y/N]</label>
                  <select name="DayCareYN" className="form-select" value={formData.DayCareYN} onChange={handleInputChange} disabled={mode === 'view'}>
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                  </select>
                </div>






 <div className="col-md-2">
                  <label className="form-label">Particular (NOT FOUND)</label>
                  <select name="DayCareYN" className="form-select" value={formData.DayCareYN} onChange={handleInputChange} disabled={mode === 'view'}>
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                  </select>
                </div>







 <div className="col-md-2">
                  <label className="form-label">Day Care Bed Rate</label>
                  <select name="DayCareYN" className="form-select" value={formData.DayCareYN} onChange={handleInputChange} disabled={mode === 'view'}>
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                  </select>
                </div>







 <div className="col-md-2">
                  <label className="form-label">Employee(NOT FOUND)</label>
                  <select name="DayCareYN" className="form-select" value={formData.DayCareYN} onChange={handleInputChange} disabled={mode === 'view'}>
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                  </select>
                </div>





                 <div className="col-md-2">
                  <label className="form-label">Disease[THIS  COME  FROM  SELECT * FROM `disease` TABLE/ DiseaseId]</label>
                   <input type="text" name="DiseaseId" className="form-control" value={formData.DiseaseId} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>


work  hear 

      <div className="col-md-2">
                  <label className="form-label">RMO</label>
                   <input type="text" name="DiseaseId" className="form-control" value={formData.DiseaseId} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>




      <div className="col-md-2">
                  <label className="form-label">Referring Doctor</label>
                   <input type="text" name="DiseaseId" className="form-control" value={formData.DiseaseId} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>




  <div className="col-md-2">
                  <label className="form-label">Referring Doctor 2</label>
                   <input type="text" name="DiseaseId" className="form-control" value={formData.DiseaseId} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>



 <div className="col-md-2">
                  <label className="form-label">Package Amount</label>
                   <input type="text" name="DiseaseId" className="form-control" value={formData.DiseaseId} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>




 <div className="col-md-2">
                  <label className="form-label">Total Package</label>
                   <input type="text" name="DiseaseId" className="form-control" value={formData.DiseaseId} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>





 <div className="col-md-2">
                  <label className="form-label">Admission  By</label>
                   <input type="text" name="DiseaseId" className="form-control" value={formData.DiseaseId} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>



 <div className="col-md-2">
                  <label className="form-label">Current User</label>
                   <input type="text" name="DiseaseId" className="form-control" value={formData.DiseaseId} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>




 <div className="col-md-2">
                  <label className="form-label">Operation Date</label>
                   <input type="text" name="DiseaseId" className="form-control" value={formData.DiseaseId} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>


                
 <div className="col-md-2">
                  <label className="form-label">Operation Time</label>
                   <input type="text" name="DiseaseId" className="form-control" value={formData.DiseaseId} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>





    <div className="col-md-2">
                  <label className="form-label">Nursing Charge</label>
                  <input type="text" name="PolcNo" className="form-control" value={formData.PolcNo} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>






    <div className="col-md-2">
                  <label className="form-label">RMO Charge</label>
                  <input type="text" name="PolcNo" className="form-control" value={formData.PolcNo} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>





    <div className="col-md-2">
                  <label className="form-label">Emp Code</label>
                  <input type="text" name="PolcNo" className="form-control" value={formData.PolcNo} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>



this is all ok


                <div className="col-md-2">
                  <label className="form-label">Ins. Policy No</label>
                  <input type="text" name="PolcNo" className="form-control" value={formData.PolcNo} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>


                <div className="col-md-2">
                  <label className="form-label">Card No</label>
                  <input type="text" name="CardNo" className="form-control" value={formData.CardNo} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>
                <div className="col-md-2">
                  <label className="form-label">CCN No</label>
                  <input type="text" name="CCNNo" className="form-control" value={formData.CCNNo} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>



                <div className="col-md-2">
                  <label className="form-label">Package Amount</label>
                  <input type="text" name="PackageAmount" className="form-control" value={formData.PackageAmount} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>
                <div className="col-md-2">
                  <label className="form-label">Operation Date</label>
                  <input type="date" name="oprationdate" className="form-control" value={formData.oprationdate} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>

                <div className="col-md-2">
                  <label className="form-label">Operation Time</label>
                  <input type="text" name="optime" className="form-control" value={formData.optime} onChange={handleInputChange} disabled={mode === 'view'} />
                </div>




                
              </div>
            </div>

          
           
          </div>

          {/* Footer Action Buttons */}
          <div className="card-footer p-3 bg-light border-top">
            <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-2">
              <button className="btn btn-outline-secondary rounded-pill px-3" onClick={() => { setMode('create'); setFormData({...formData, AdmitionNo: '', PatientName: '', AdmitionDate: new Date().toISOString().split('T')[0]}); }} disabled={loading}>New</button>
              <button className="btn btn-outline-primary rounded-pill px-3" onClick={() => setMode('edit')} disabled={loading || mode === 'create'}>Edit</button>
              <button className="btn btn-success rounded-pill px-3" onClick={handleSubmit} disabled={loading || mode === 'view'}>Save</button>
              <button className="btn btn-danger rounded-pill px-3" onClick={handleDelete} disabled={loading || mode === 'create'}>Delete</button>
              <button className="btn btn-warning text-dark rounded-pill px-3" onClick={() => { setMode('view'); fetchAdmission(); }} disabled={loading || mode === 'create'}>Undo</button>
              <button className="btn btn-dark rounded-pill px-3">Print</button>
              <button className="btn btn-dark rounded-pill px-3" onClick={() => navigate('/patient-registration')}>Exit</button>
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default PatientRegistrationDetail;