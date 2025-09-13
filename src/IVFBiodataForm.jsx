import React, { useState } from 'react';
import axios from 'axios';

const IVFBiodataForm = () => {
  const [formData, setFormData] = useState({
    IVFNo: '',
    Type: 'PATIENT',
    Name: '',
    Age: '',
    Add1: '',
    Add2: '',
    Add3: '',
    Complexion: '',
    EyeColour: '',
    BloodGroup: '',
    Height: '',
    Weight: '',
    Document: '',
    Occupation: '',
    PhoneNo: '',
    WName: '',
    WAge: '',
    WAdd1: '',
    WAdd2: '',
    WAdd3: '',
    WComplexion: '',
    WEyeColour: '',
    WBloodGroup: '',
    WHeight: '',
    WWeight: '',
    WDocument: '',
    WOccupation: '',
    WPhoneNo: '',
    HusbandName: '',
    AgentName: ''
  });

  const [photos, setPhotos] = useState({
    husbandPhoto: null,
    wifePhoto: null
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    setPhotos({ ...photos, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      submitData.append(key, formData[key]);
    });
    
    if (photos.husbandPhoto) submitData.append('husbandPhoto', photos.husbandPhoto);
    if (photos.wifePhoto) submitData.append('wifePhoto', photos.wifePhoto);

    try {
      const response = await axios.post('http://localhost:5000/api/v1/ivf/ivf-biodata', submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('IVF biodata saved successfully!');
      console.log(response.data);
    } catch (error) {
      alert('Error saving data: ' + error.response?.data?.message);
    }
  };

  const isPatientType = formData.Type === 'PATIENT';

  return (
    <div className="container-fluid p-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h5 className="card-title mb-0">IVF Biodata Registration</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-4">
              <div className="col-12">
                <div className="bg-primary text-white p-3 rounded">
                  <div className="d-flex align-items-center gap-3">
                    <label className="fw-bold mb-0">Category:</label>
                    <select 
                      name="Type" 
                      value={formData.Type} 
                      onChange={handleInputChange}
                      className="form-select w-auto"
                    >
                      <option value="PATIENT">PATIENT</option>
                      <option value="SURROGACY">SURROGACY</option>
                      <option value="EGG DONOR">EGG DONOR</option>
                      <option value="SPERM DONOR">SPERM DONOR</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-6">
                <label className="form-label fw-bold">Registration No</label>
                <input 
                  type="text" 
                  name="IVFNo" 
                  value={formData.IVFNo} 
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Date</label>
                <input 
                  type="date" 
                  className="form-control"
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            {isPatientType ? (
              <div className="row">
                <div className="col-md-6">
                  <div className="card bg-light">
                    <div className="card-header bg-primary text-white text-center">
                      <h5 className="mb-0">HUSBAND</h5>
                    </div>
                    <div className="card-body">
                      <div className="text-center mb-3">
                        <div className="border border-2 border-dashed p-4 rounded" style={{width: '150px', height: '150px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                          {photos.husbandPhoto ? (
                            <img src={URL.createObjectURL(photos.husbandPhoto)} alt="Husband" className="img-fluid rounded" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                          ) : (
                            <span className="text-muted">Select Picture</span>
                          )}
                        </div>
                      </div>
                      <input 
                        type="file" 
                        name="husbandPhoto" 
                        onChange={handlePhotoChange}
                        accept="image/*"
                        className="form-control mb-3"
                      />
                      <div className="row g-2">
                        <div className="col-12"><input type="text" name="Name" placeholder="Name" value={formData.Name} onChange={handleInputChange} className="form-control" /></div>
                        <div className="col-12"><input type="number" name="Age" placeholder="Age" value={formData.Age} onChange={handleInputChange} className="form-control" /></div>
                        <div className="col-12"><input type="text" name="Add1" placeholder="Address Line 1" value={formData.Add1} onChange={handleInputChange} className="form-control" /></div>
                        <div className="col-12"><input type="text" name="Add2" placeholder="Address Line 2" value={formData.Add2} onChange={handleInputChange} className="form-control" /></div>
                        <div className="col-12"><input type="text" name="Add3" placeholder="Address Line 3" value={formData.Add3} onChange={handleInputChange} className="form-control" /></div>
                        <div className="col-12"><input type="text" name="Complexion" placeholder="Complexion" value={formData.Complexion} onChange={handleInputChange} className="form-control" /></div>
                        <div className="col-12"><input type="text" name="EyeColour" placeholder="Eye Colour" value={formData.EyeColour} onChange={handleInputChange} className="form-control" /></div>
                        <div className="col-12"><input type="text" name="BloodGroup" placeholder="Blood Group" value={formData.BloodGroup} onChange={handleInputChange} className="form-control" /></div>
                        <div className="col-12"><input type="text" name="Height" placeholder="Height" value={formData.Height} onChange={handleInputChange} className="form-control" /></div>
                        <div className="col-12"><input type="text" name="Weight" placeholder="Weight" value={formData.Weight} onChange={handleInputChange} className="form-control" /></div>
                        <div className="col-12"><textarea name="Document" placeholder="Document" value={formData.Document} onChange={handleInputChange} className="form-control" rows="3"></textarea></div>
                        <div className="col-12"><input type="text" name="Occupation" placeholder="Occupation" value={formData.Occupation} onChange={handleInputChange} className="form-control" /></div>
                        <div className="col-12"><input type="text" name="PhoneNo" placeholder="Phone No" value={formData.PhoneNo} onChange={handleInputChange} className="form-control" /></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card bg-light">
                    <div className="card-header bg-primary text-white text-center">
                      <h5 className="mb-0">WIFE</h5>
                    </div>
                    <div className="card-body">
                      <div className="text-center mb-3">
                        <div className="border border-2 border-dashed p-4 rounded" style={{width: '150px', height: '150px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                          {photos.wifePhoto ? (
                            <img src={URL.createObjectURL(photos.wifePhoto)} alt="Wife" className="img-fluid rounded" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                          ) : (
                            <span className="text-muted">Select Picture</span>
                          )}
                        </div>
                      </div>
                      <input 
                        type="file" 
                        name="wifePhoto" 
                        onChange={handlePhotoChange}
                        accept="image/*"
                        className="form-control mb-3"
                      />
                      <div className="row g-2">
                        <div className="col-12"><input type="text" name="WName" placeholder="Name" value={formData.WName} onChange={handleInputChange} className="form-control" /></div>
                        <div className="col-12"><input type="number" name="WAge" placeholder="Age" value={formData.WAge} onChange={handleInputChange} className="form-control" /></div>
                        <div className="col-12"><input type="text" name="WAdd1" placeholder="Address Line 1" value={formData.WAdd1} onChange={handleInputChange} className="form-control" /></div>
                        <div className="col-12"><input type="text" name="WAdd2" placeholder="Address Line 2" value={formData.WAdd2} onChange={handleInputChange} className="form-control" /></div>
                        <div className="col-12"><input type="text" name="WAdd3" placeholder="Address Line 3" value={formData.WAdd3} onChange={handleInputChange} className="form-control" /></div>
                        <div className="col-12"><input type="text" name="WComplexion" placeholder="Complexion" value={formData.WComplexion} onChange={handleInputChange} className="form-control" /></div>
                        <div className="col-12"><input type="text" name="WEyeColour" placeholder="Eye Colour" value={formData.WEyeColour} onChange={handleInputChange} className="form-control" /></div>
                        <div className="col-12"><input type="text" name="WBloodGroup" placeholder="Blood Group" value={formData.WBloodGroup} onChange={handleInputChange} className="form-control" /></div>
                        <div className="col-12"><input type="text" name="WHeight" placeholder="Height" value={formData.WHeight} onChange={handleInputChange} className="form-control" /></div>
                        <div className="col-12"><input type="text" name="WWeight" placeholder="Weight" value={formData.WWeight} onChange={handleInputChange} className="form-control" /></div>
                        <div className="col-12"><textarea name="WDocument" placeholder="Document" value={formData.WDocument} onChange={handleInputChange} className="form-control" rows="3"></textarea></div>
                        <div className="col-12"><input type="text" name="WOccupation" placeholder="Occupation" value={formData.WOccupation} onChange={handleInputChange} className="form-control" /></div>
                        <div className="col-12"><input type="text" name="WPhoneNo" placeholder="Phone No" value={formData.WPhoneNo} onChange={handleInputChange} className="form-control" /></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-6">
                  <div className="card bg-light">
                    <div className="card-body">
                      <div className="text-center mb-3">
                        <div className="border border-2 border-dashed p-4 rounded" style={{width: '150px', height: '150px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                          {photos.husbandPhoto ? (
                            <img src={URL.createObjectURL(photos.husbandPhoto)} alt="Photo" className="img-fluid rounded" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                          ) : (
                            <span className="text-muted">Select Picture</span>
                          )}
                        </div>
                      </div>
                      <input 
                        type="file" 
                        name="husbandPhoto" 
                        onChange={handlePhotoChange}
                        accept="image/*"
                        className="form-control mb-3"
                      />
                      
                      <div className="row g-2">
                        <div className="col-12"><input type="text" name="Name" placeholder="Name" value={formData.Name} onChange={handleInputChange} className="form-control" /></div>
                        <div className="col-12"><input type="number" name="Age" placeholder="Age" value={formData.Age} onChange={handleInputChange} className="form-control" /></div>
                        <div className="col-12"><input type="text" name="HusbandName" placeholder="Husband Name" value={formData.HusbandName} onChange={handleInputChange} className="form-control" /></div>
                        <div className="col-12"><input type="text" name="Add1" placeholder="Address" value={formData.Add1} onChange={handleInputChange} className="form-control" /></div>
                        <div className="col-12"><input type="text" name="PhoneNo" placeholder="Phone No" value={formData.PhoneNo} onChange={handleInputChange} className="form-control" /></div>
                        <div className="col-12"><input type="text" name="BloodGroup" placeholder="Blood Group" value={formData.BloodGroup} onChange={handleInputChange} className="form-control" /></div>
                        <div className="col-12"><input type="text" name="EyeColour" placeholder="Eye Colour" value={formData.EyeColour} onChange={handleInputChange} className="form-control" /></div>
                        <div className="col-12"><input type="text" name="Height" placeholder="Height" value={formData.Height} onChange={handleInputChange} className="form-control" /></div>
                        <div className="col-12"><input type="text" name="Weight" placeholder="Weight" value={formData.Weight} onChange={handleInputChange} className="form-control" /></div>
                        <div className="col-12"><textarea name="Document" placeholder="Document" value={formData.Document} onChange={handleInputChange} className="form-control" rows="3"></textarea></div>
                        <div className="col-12"><input type="text" name="AgentName" placeholder="Agent Name" value={formData.AgentName} onChange={handleInputChange} className="form-control" /></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="card bg-light">
                    <div className="card-header bg-info text-white">
                      <div className="row">
                        <div className="col-6">Blood Test Name</div>
                        <div className="col-6">Result</div>
                      </div>
                    </div>
                    <div className="card-body" style={{height: '400px', backgroundColor: '#f8f9fa'}}>
                      <div className="text-muted text-center mt-5">Blood test results will appear here</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="row mt-4">
              <div className="col-12 text-center">
                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg px-5"
                >
                  Save IVF Biodata
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IVFBiodataForm;