import { useState, useEffect } from "react";
import MasterLayout from "../../MasterLayout";
import Breadcrumb from "../../Breadcrumb";
import axiosInstance from "../../../axiosInstance";

const ReferalMaster = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedReferal, setSelectedReferal] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [referalsData, setReferalsData] = useState([]);
  const [mexecutivesData, setMexecutivesData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    Referal: "",
    PhoneNo: "",
    MExecutiveId: ""
  });

  useEffect(() => {
    fetchReferals();
    fetchMExecutives();
  }, []);

  const fetchReferals = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/referal');
      setReferalsData(response.data);
    } catch (error) {
      console.error('Error fetching referals:', error);
      alert('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const fetchMExecutives = async () => {
    try {
      const response = await axiosInstance.get('/mexecutive');
      setMexecutivesData(response.data);
    } catch (error) {
      console.error('Error fetching mexecutives:', error);
    }
  };

  const handleAddNew = () => {
    setFormData({ Referal: "", PhoneNo: "", MExecutiveId: "" });
    setSelectedReferal(null);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (referal) => {
    setFormData({
      Referal: referal.Referal || "",
      PhoneNo: referal.PhoneNo || "",
      MExecutiveId: referal.MExecutiveId || ""
    });
    setSelectedReferal(referal);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this Referal?')) {
      try {
        setLoading(true);
        await axiosInstance.delete(`/referal/${id}`);
        await fetchReferals();
        alert('Referal deleted successfully');
      } catch (error) {
        console.error('Error deleting referal:', error);
        alert('Error deleting referal');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const submitData = {
        ...formData,
        MExecutiveId: formData.MExecutiveId ? parseInt(formData.MExecutiveId) : null
      };
      
      if (selectedReferal) {
        await axiosInstance.put(`/referal/${selectedReferal.ReferalId}`, submitData);
        alert('Referal updated successfully');
      } else {
        await axiosInstance.post('/referal', submitData);
        alert('Referal created successfully');
      }
      await fetchReferals();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving referal:', error);
      alert('Error saving referal');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReferal(null);
    setIsEditMode(false);
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Referal Master" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4">
          <div className="card-header border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Referal Master - List {loading && '(Loading...)'}</h5>
            <button
              className="btn btn-primary px-4 py-2"
              onClick={handleAddNew}
            >
              ADD REFERAL
            </button>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-striped table-hover">
                <thead className="table-primary">
                  <tr>
                    <th>Sl.No</th>
                    <th>Referal Name</th>
                    <th>Phone No</th>
                    <th>MExecutive</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {referalsData.map((referal, index) => (
                    <tr key={referal.ReferalId}>
                      <td>{index + 1}</td>
                      <td>{referal.Referal}</td>
                      <td>{referal.PhoneNo}</td>
                      <td>{referal.mexecutive?.MExecutive || 'N/A'}</td>
                      <td className="text-center">
                        <button 
                          className="btn btn-outline-primary btn-sm me-1" 
                          onClick={() => handleEdit(referal)}
                          disabled={loading}
                        >
                          Edit
                        </button>
                        <button 
                          className="btn btn-outline-danger btn-sm" 
                          onClick={() => handleDelete(referal.ReferalId)}
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
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {isEditMode ? "Edit Referal" : "Add New Referal"}
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={handleCloseModal}
                  ></button>
                </div>
                
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label">Referal Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.Referal}
                        onChange={(e) => handleInputChange('Referal', e.target.value)}
                        placeholder="Enter referal name"
                      />
                    </div>
                    
                    <div className="col-12">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.PhoneNo}
                        onChange={(e) => handleInputChange('PhoneNo', e.target.value)}
                        placeholder="Enter phone number"
                      />
                    </div>
                    
                    <div className="col-12">
                      <label className="form-label">Marketing Executive</label>
                      <select
                        className="form-select"
                        value={formData.MExecutiveId}
                        onChange={(e) => handleInputChange('MExecutiveId', e.target.value)}
                      >
                        <option value="">Select Marketing Executive</option>
                        {mexecutivesData.map((exec) => (
                          <option key={exec.MExecutiveId} value={exec.MExecutiveId}>
                            {exec.MExecutive}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
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
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : (isEditMode ? 'Update' : 'Save')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MasterLayout>
  );
};

export default ReferalMaster;