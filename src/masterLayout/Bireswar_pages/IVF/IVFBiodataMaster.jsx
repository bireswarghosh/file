import React, { useState, useEffect } from 'react';
import MasterLayout from '../../MasterLayout';
import Breadcrumb from '../../Breadcrumb';
import axiosInstance from '../../../axiosInstance';

const IVFBiodataMaster = () => {
  const [ivfData, setIvfData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [formData, setFormData] = useState({
    IVFNo: '',
    Type: 'PATIENT',
    Name: '',
    Age: '',
    Add1: '',
    Complexion: '',
    EyeColour: '',
    BloodGroup: '',
    Height: '',
    Weight: '',
    Occupation: '',
    PhoneNo: '',
    WName: '',
    WAge: '',
    WAdd1: '',
    WComplexion: '',
    WEyeColour: '',
    WBloodGroup: '',
    WHeight: '',
    WWeight: '',
    WOccupation: '',
    WPhoneNo: '',
    HusbandName: '',
    AgentName: ''
  });

  const [photos, setPhotos] = useState({
    husbandPhoto: null,
    wifePhoto: null
  });

  useEffect(() => {
    fetchIVFData();
  }, []);

  const fetchIVFData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/ivf/ivf-biodata');
      setIvfData(response.data.data || []);
    } catch (error) {
      console.error('Error fetching IVF data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      submitData.append(key, formData[key]);
    });
    
    if (photos.husbandPhoto) submitData.append('husbandPhoto', photos.husbandPhoto);
    if (photos.wifePhoto) submitData.append('wifePhoto', photos.wifePhoto);

    try {
      if (editingData) {
        await axiosInstance.put(`/ivf/ivf-biodata/${editingData.IVFId}`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axiosInstance.post('/ivf/ivf-biodata', submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      
      fetchIVFData();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving IVF data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (data) => {
    setEditingData(data);
    setFormData({
      IVFNo: data.IVFNo || '',
      Type: data.Type || 'PATIENT',
      Name: data.Name || '',
      Age: data.Age || '',
      Add1: data.Add1 || '',
      Complexion: data.Complexion || '',
      EyeColour: data.EyeColour || '',
      BloodGroup: data.BloodGroup || '',
      Height: data.Height || '',
      Weight: data.Weight || '',
      Occupation: data.Occupation || '',
      PhoneNo: data.PhoneNo || '',
      WName: data.WName || '',
      WAge: data.WAge || '',
      WAdd1: data.WAdd1 || '',
      WComplexion: data.WComplexion || '',
      WEyeColour: data.WEyeColour || '',
      WBloodGroup: data.WBloodGroup || '',
      WHeight: data.WHeight || '',
      WWeight: data.WWeight || '',
      WOccupation: data.WOccupation || '',
      WPhoneNo: data.WPhoneNo || '',
      HusbandName: data.HusbandName || '',
      AgentName: data.AgentName || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this IVF biodata?')) {
      setLoading(true);
      try {
        await axiosInstance.delete(`/ivf/ivf-biodata/${id}`);
        fetchIVFData();
      } catch (error) {
        console.error('Error deleting IVF data:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingData(null);
    setFormData({
      IVFNo: '',
      Type: 'PATIENT',
      Name: '',
      Age: '',
      Add1: '',
      Complexion: '',
      EyeColour: '',
      BloodGroup: '',
      Height: '',
      Weight: '',
      Occupation: '',
      PhoneNo: '',
      WName: '',
      WAge: '',
      WAdd1: '',
      WComplexion: '',
      WEyeColour: '',
      WBloodGroup: '',
      WHeight: '',
      WWeight: '',
      WOccupation: '',
      WPhoneNo: '',
      HusbandName: '',
      AgentName: ''
    });
    setPhotos({ husbandPhoto: null, wifePhoto: null });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    setPhotos({ ...photos, [e.target.name]: e.target.files[0] });
  };

  const isPatientType = formData.Type === 'PATIENT';

  return (
    <MasterLayout>
      <div className="container-fluid">
        <Breadcrumb title="IVF Biodata Master" />
        
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">IVF Biodata List</h5>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowModal(true)}
                  disabled={loading}
                >
                  Add New IVF Biodata
                </button>
              </div>
              
              <div className="card-body">
                {loading ? (
                  <div className="text-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>IVF ID</th>
                          <th>IVF No</th>
                          <th>Type</th>
                          <th>Name</th>
                          <th>Age</th>
                          <th>Phone</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ivfData.map((data) => (
                          <tr key={data.IVFId}>
                            <td>{data.IVFId}</td>
                            <td>{data.IVFNo}</td>
                            <td>
                              <span className={`badge ${data.Type === 'PATIENT' ? 'bg-primary' : 'bg-info'}`}>
                                {data.Type}
                              </span>
                            </td>
                            <td>{data.Name}</td>
                            <td>{data.Age}</td>
                            <td>{data.PhoneNo}</td>
                            <td>{new Date(data.IVFDate).toLocaleDateString()}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-outline-primary me-2"
                                onClick={() => handleEdit(data)}
                                disabled={loading}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(data.IVFId)}
                                disabled={loading}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editingData ? 'Edit IVF Biodata' : 'Add New IVF Biodata'}
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={handleCloseModal}
                  ></button>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
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
                          required
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
                                <div className="col-12"><input type="text" name="Add1" placeholder="Address" value={formData.Add1} onChange={handleInputChange} className="form-control" /></div>
                                <div className="col-12"><input type="text" name="Complexion" placeholder="Complexion" value={formData.Complexion} onChange={handleInputChange} className="form-control" /></div>
                                <div className="col-12"><input type="text" name="EyeColour" placeholder="Eye Colour" value={formData.EyeColour} onChange={handleInputChange} className="form-control" /></div>
                                <div className="col-12"><input type="text" name="BloodGroup" placeholder="Blood Group" value={formData.BloodGroup} onChange={handleInputChange} className="form-control" /></div>
                                <div className="col-12"><input type="text" name="Height" placeholder="Height" value={formData.Height} onChange={handleInputChange} className="form-control" /></div>
                                <div className="col-12"><input type="text" name="Weight" placeholder="Weight" value={formData.Weight} onChange={handleInputChange} className="form-control" /></div>
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
                                <div className="col-12"><input type="text" name="WAdd1" placeholder="Address" value={formData.WAdd1} onChange={handleInputChange} className="form-control" /></div>
                                <div className="col-12"><input type="text" name="WComplexion" placeholder="Complexion" value={formData.WComplexion} onChange={handleInputChange} className="form-control" /></div>
                                <div className="col-12"><input type="text" name="WEyeColour" placeholder="Eye Colour" value={formData.WEyeColour} onChange={handleInputChange} className="form-control" /></div>
                                <div className="col-12"><input type="text" name="WBloodGroup" placeholder="Blood Group" value={formData.WBloodGroup} onChange={handleInputChange} className="form-control" /></div>
                                <div className="col-12"><input type="text" name="WHeight" placeholder="Height" value={formData.WHeight} onChange={handleInputChange} className="form-control" /></div>
                                <div className="col-12"><input type="text" name="WWeight" placeholder="Weight" value={formData.WWeight} onChange={handleInputChange} className="form-control" /></div>
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
                  </div>
                  
                  <div className="modal-footer">
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={handleCloseModal}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : (editingData ? 'Update' : 'Save')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        
        {showModal && <div className="modal-backdrop fade show"></div>}
      </div>
    </MasterLayout>
  );
};

export default IVFBiodataMaster;