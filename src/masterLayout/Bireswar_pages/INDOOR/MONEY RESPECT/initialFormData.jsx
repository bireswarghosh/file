import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MasterLayout from "../../../MasterLayout";
import Breadcrumb from "../../../Breadcrumb";
import axiosInstance from "../../../../axiosInstance";
 import Barcode from 'react-barcode';


function InitialFormData() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const modeParam = urlParams.get("mode");
    if (id) {
      return modeParam || "view";
    }
    return "create";
  });
  const [loading, setLoading] = useState(false);

  // State for form fields
  const [receiptData, setReceiptData] = useState({
    MoneyreeciptId: "",
    MoneyreeciptNo: "",
    RefferenceId: "",
    ReceiptType: 0,
    ReceiptDate: new Date().toISOString().split("T")[0],
    PaymentType: "Old Data Not Found",
    Amount: "Old Data Not Found",
    Bank: "Old Data Not Found",
    Cheque: "Old Data Not Found",
    ChqDate: "Old Data Not Found",
    ClearDate: "Old Data Not Found",
    Narration: "Old Data Not Found",
    UserId: 37,
    SlipNo: "Old Data Not Found",
    // ClearDate: null,
    TDS: "Old Data Not Found",
    PaidBy: "Old Data Not Found",
    Remarks: "Old Data Not Found",
    ReceiptTime: "",
    PrintDate: "",
    admission: null,
  

  });

  useEffect(() => {
    if (id) {
      fetchReceipt();
    }
  }, [id]);

  const fetchReceipt = async () => {
    try {
      setLoading(true);
      const decodedId = decodeURIComponent(id);
      const response = await axiosInstance.get(`/moneyreceipt/${decodedId}`);
      if (response.data.success) {
        const apiData = response.data.data;
        setReceiptData({
          ...apiData,
          ReceiptDate: apiData.ReceiptDate
            ? apiData.ReceiptDate.substring(0, 10)
            : "",
          ChqDate: apiData.ChqDate ? apiData.ChqDate.substring(0, 10) : "",
          ClearDate: apiData.ClearDate
            ? apiData.ClearDate.substring(0, 10)
            : "",
          PrintDate: apiData.PrintDate
            ? apiData.PrintDate.substring(0, 10)
            : "",
          ReceiptTime: apiData.ReceiptTime || "",
        });
      }
    } catch (error) {
      console.error("Error fetching receipt:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response =
        mode === "create"
          ? await axiosInstance.post("/moneyreceipt", receiptData)
          : await axiosInstance.put(
              `/moneyreceipt/${decodeURIComponent(id)}`,
              receiptData
            );

      if (response.data.success) {
        alert(
          `Receipt ${mode === "create" ? "created" : "updated"} successfully!`
        );
        navigate("/sampleReceipts");
      }
    } catch (error) {
      console.error("Error saving receipt:", error);
      alert("Error saving receipt");
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReceiptData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Generate comprehensive barcode data
  const generateBarcodeData = () => {
    const data = [
      `Receipt:${receiptData.MoneyreeciptNo}`,
      `Date:${receiptData.ReceiptDate}`,
      `Amount:${receiptData.Amount}`,
      `Type:${receiptData.ReceiptType}`,
      `Ref:${receiptData.RefferenceId}`,
      `Patient:${receiptData.admission?.PatientName || 'N/A'}`,
      `Admission:${receiptData.admission?.AdmitionNo || 'N/A'}`
    ].filter(item => !item.includes('undefined') && !item.includes('null'));
    return data.join('|');
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Money Receipt - Detail" />
      <div className="container-fluid py-3 px-lg-3">
        <div
          className="card shadow-sm border"
          style={{ backgroundColor: "#F0F0F0", fontSize: "0.9rem" }}
        >
          {/* Top Info Header */}
          <div
            className="card-header p-2 d-flex justify-content-between align-items-center"
            style={{
              backgroundColor: "#E0E0E0",
              borderBottom: "1px solid #BDBDBD",
            }}
          >
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center gap-1">
                <label className="fw-bold mb-0">Receipt No:</label>
                {/* <input type="text" className="form-control form-control-sm" style={{ width: '130px' }} value={receiptData.MoneyReceiptNo} readOnly /> */}

                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="MoneyreeciptNo"
                  name="MoneyreeciptNo"
                  value={receiptData.MoneyreeciptNo}
                  onChange={handleChange}
                  disabled={mode === "view"}
                />
              </div>
              <div className="d-flex align-items-center gap-1">
                <label className="fw-bold mb-0">Date:</label>
                <input
                  type="date"
                  className="form-control form-control-sm"
                  style={{ width: "150px" }}
                  name="ReceiptDate"
                  value={receiptData.ReceiptDate}
                  onChange={handleChange}
                  disabled={mode === "view"}
                />
              </div>
              <div className="d-flex align-items-center gap-1">
                <label className="fw-bold mb-0">Time:</label>
                <input
                  type="time"
                  className="form-control form-control-sm"
                  style={{ width: "100px" }}
                  name="ReceiptTime"
                  value={receiptData.ReceiptTime}
                  onChange={handleChange}
                  disabled={mode === "view"}
                />
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              



<div
                className="text-center p-1 rounded"
                style={{
                  backgroundColor: "white",
                  border: "1px solid #BDBDBD",
                }}
              >
             {(receiptData.MoneyreeciptNo || receiptData.admission?.AdmitionNo) && (
                    <div className="mb-2 text-center">
                      <Barcode 
                        value={generateBarcodeData()} 
                        format="CODE128"
                        width={0.5}
                        height={40}
                        displayValue={true}
                        fontSize={10}
                        margin={5}
                      />
                    </div>
                  )}
                {/* <p
                  className="fw-bold mb-0 small"
                  style={{ letterSpacing: "1px", fontSize: "0.7rem" }}
                >
                  {receiptData.MoneyreeciptNo}
                </p> */}
              </div>




            </div>
          </div>
          <div className="card-body p-3" style={{ backgroundColor: "#F0F0F0" }}>
            {/* Top Form Section */}
            <div className="row g-3 mb-3">
              <div className="col-lg-8">
                <div
                  className="p-3 border rounded shadow-sm"
                  style={{ backgroundColor: "#E0E0E0" }}
                >
                  <div className="row g-2 align-items-center mb-2">
                    <div className="col-md-3">
                      <label
                        htmlFor="ReceiptType"
                        className="form-label mb-0 fw-bold"
                      >
                        Receipt Type(if value == 0 (Current))
                      </label>
                    </div>
                    <div className="col-md-3">
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        id="ReceiptType"
                        name="ReceiptType"
                        value={receiptData.ReceiptType}
                        onChange={handleChange}
                        disabled={mode === "view"}
                      />
                    </div>
                    <div className="col-md-3">
                      <label
                        htmlFor="SlipNo"
                        className="form-label mb-0 fw-bold"
                      >
                        Slip No.
                      </label>
                    </div>
                    <div className="col-md-3">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="SlipNo"
                        name="SlipNo"
                        value={receiptData.SlipNo}
                        onChange={handleChange}
                        disabled={mode === "view"}
                      />
                    </div>
                  </div>

                  <div className="row g-2 align-items-center mb-2">
                    <div className="col-md-3">
                      <label
                        htmlFor="RefferenceId"
                        className="form-label mb-0 fw-bold"
                      >
                        Reference ID
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="RefferenceId"
                        name="RefferenceId"
                        value={receiptData.RefferenceId}
                        onChange={handleChange}
                        disabled={mode === "view"}
                      />
                    </div>
                  </div>

                  <div className="row g-2 align-items-center">
                    {/* <div className="col-md-3">
                      <label htmlFor="MoneyreeciptNo" className="form-label mb-0 fw-bold">Receipt No</label>
                    </div> */}
                    <div className="col-md-9">
                      <div className="d-flex align-items-center gap-2">
                        {/* <input type="text" className="form-control form-control-sm" id="MoneyreeciptNo" name="MoneyreeciptNo" value={receiptData.MoneyreeciptNo} onChange={handleChange} disabled={mode === 'view'} /> */}

                        <label
                          htmlFor="Amount"
                          className="form-label mb-0 fw-bold text-danger"
                        >
                          Amount:
                        </label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          id="Amount"
                          name="Amount"
                          value={receiptData.Amount}
                          onChange={handleChange}
                          style={{ width: "120px" }}
                          disabled={mode === "view"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div
                  className="p-3 border rounded shadow-sm d-flex flex-column justify-content-between"
                  style={{ backgroundColor: "#E0E0E0", height: "100%" }}
                >
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <label className="fw-bold mb-0">Doctor Charges:</label>
                    <span className="fw-bold text-success">
                      {receiptData.doctorCharges}
                    </span>
                  </div>
                  <div
                    className="flex-grow-1 p-2 border rounded"
                    style={{ backgroundColor: "white" }}
                  >
                    {/* Empty white box from image */}
                  </div>
                </div>
              </div>
            </div>

            {/* Patient Detail Section */}
            <div className="row g-3 mb-3">
              <div className="col-12">
                <fieldset
                  className="p-3 border rounded shadow-sm"
                  style={{ backgroundColor: "#E0E0E0" }}
                >
                  <legend
                    className="h6 fw-bold mb-0 px-2"
                    style={{ width: "auto", backgroundColor: "#E0E0E0" }}
                  >
                    Patient Detail
                  </legend>
                  <div className="row g-2">
                    <div className="col-md-9">
                      <div className="row g-2 align-items-center mb-2">
                        <div className="col-md-2">
                          <label
                            htmlFor="PatientName"
                            className="form-label mb-0"
                          >
                            Patient Name
                          </label>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            id="PatientName"
                            name="PatientName"
                            value={receiptData.admission?.PatientName || ""}
                            readOnly
                          />
                        </div>

                        <div className="col-md-2">
                          <label htmlFor="Age" className="form-label mb-0">
                            Age
                          </label>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            id="Age"
                            name="Age"
                            value={receiptData.admission?.Age || ""}
                            Years
                            readOnly
                          />
                          Years
                        </div>

                        <div className="col-md-2">
                          <label htmlFor="Sex" className="form-label mb-0">
                            Sex
                          </label>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            id="Sex"
                            name="Sex"
                            value={receiptData.admission?.Sex || ""}
                            readOnly
                          />
                        </div>

                        <div className="col-md-2">
                          <label htmlFor="MStatus" className="form-label mb-0">
                            Marital Status
                          </label>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            id="MStatus"
                            name="MStatus"
                            value={receiptData.admission?.MStatus || ""}
                            readOnly
                          />
                        </div>

                        <div className="row g-2 align-items-center mb-2">
                          <div className="col-md-4">
                            <label className="form-label mb-0">Address</label>
                          </div>
                          <div className="col-md-8">
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={receiptData.admission?.Add1 || ""}
                              readOnly
                            />
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={receiptData.admission?.Add2 || ""}
                              readOnly
                            />
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={receiptData.admission?.Add3 || ""}
                              readOnly
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <label className="form-label mb-0">Area/P.S.</label>
                        </div>
                        <div className="col-md-8">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={receiptData.admission?.AreaId || ""}
                            readOnly
                          />
                        </div>

                        <div className="col-md-4">
                          <label className="form-label mb-0">Guardian</label>
                        </div>
                        <div className="col-md-8">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={receiptData.admission?.GurdianName || ""}
                            readOnly
                          />
                        </div>

                        <div className="col-md-4">
                          <label className="form-label mb-0">Religion</label>
                        </div>
                        <div className="col-md-8">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={receiptData.admission?.ReligionId || ""}
                            readOnly
                          />
                        </div>

                        {/* <div className="col-md-2">
                          <label htmlFor="Bank" className="form-label mb-0">
                            Bank
                          </label>
                        </div> */}
                        {/* <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            id="Bank"
                            name="Bank"
                            value={receiptData.Bank}
                            onChange={handleChange}
                            disabled={mode === "view"}
                          />
                        </div> */}
                        {/* <div className="col-md-2">
                          <label
                            htmlFor="PaymentType"
                            className="form-label mb-0"
                          >
                            Payment Type
                          </label>
                        </div> */}
                        {/* <div className="col-md-4">
                          <select
                            className="form-select form-select-sm"
                            id="PaymentType"
                            name="PaymentType"
                            value={receiptData.PaymentType}
                            onChange={handleChange}
                            disabled={mode === "view"}
                          >
                            <option value={1}>Cash</option>
                            <option value={2}>Card</option>
                            <option value={3}>Cheque</option>
                          </select>
                        </div> */}
                      </div>
                      <div className="row g-2 align-items-center mb-2">
                        {/* <div className="col-md-2">
                          <label htmlFor="PaidBy" className="form-label mb-0">
                            Paid By
                          </label>
                        </div> */}
                        {/* <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            id="PaidBy"
                            name="PaidBy"
                            value={receiptData.PaidBy}
                            onChange={handleChange}
                            disabled={mode === "view"}
                          />
                        </div> */}
                        {/* <div className="col-md-2">
                          <label htmlFor="Cheque" className="form-label mb-0">
                            Cheque/Card No
                          </label>
                        </div> */}
                        {/* <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            id="Cheque"
                            name="Cheque"
                            value={receiptData.Cheque}
                            onChange={handleChange}
                            disabled={mode === "view"}
                          />
                        </div> */}
                      </div>
                      <div className="row g-2 align-items-center mb-2">
                        {/* <div className="col-md-2">
                          <label
                            htmlFor="ReceiptDate"
                            className="form-label mb-0"
                          >
                            Receipt Date
                          </label>
                        </div> */}
                        {/* <div className="col-md-4">
                          <input
                            type="date"
                            className="form-control form-control-sm"
                            id="ReceiptDate"
                            name="ReceiptDate"
                            value={receiptData.ReceiptDate}
                            onChange={handleChange}
                            disabled={mode === "view"}
                          />
                        </div> */}
                        {/* <div className="col-md-2">
                          <label htmlFor="TDS" className="form-label mb-0">
                            TDS
                          </label>
                        </div> */}
                        {/* <div className="col-md-4">
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            id="TDS"
                            name="TDS"
                            value={receiptData.TDS}
                            onChange={handleChange}
                            disabled={mode === "view"}
                          />
                        </div> */}
                      </div>
                      <div className="row g-2 align-items-center mb-2">
                        {/* <div className="col-md-2">
                          <label htmlFor="Remarks" className="form-label mb-0">
                            Remarks
                          </label>
                        </div> */}
                        {/* <div className="col-md-10">
                          <textarea
                            className="form-control form-control-sm"
                            id="Remarks"
                            name="Remarks"
                            value={receiptData.Remarks}
                            onChange={handleChange}
                            rows="2"
                            disabled={mode === "view"}
                          ></textarea>
                        </div> */}
                      </div>
                      <div className="row g-2 align-items-center mb-2">
                        {/* <div className="col-md-2">
                          <label htmlFor="ChqDate" className="form-label mb-0">
                            Cheque Date
                          </label>
                        </div> */}
                        {/* <div className="col-md-4">
                          <input
                            type="date"
                            className="form-control form-control-sm"
                            id="ChqDate"
                            name="ChqDate"
                            value={receiptData.ChqDate}
                            onChange={handleChange}
                            disabled={mode === "view"}
                          />
                        </div> */}
                        {/* <div className="col-md-2">
                          <label
                            htmlFor="ClearDate"
                            className="form-label mb-0"
                          >
                            Clear Date
                          </label>
                        </div> */}
                        {/* <div className="col-md-4">
                          <input
                            type="date"
                            className="form-control form-control-sm"
                            id="ClearDate"
                            name="ClearDate"
                            value={receiptData.ClearDate || ""}
                            onChange={handleChange}
                            disabled={mode === "view"}
                          />
                        </div> */}
                      </div>
                      <div className="row g-2 align-items-center mb-2">
                        {/* <div className="col-md-2">
                          <label
                            htmlFor="Narration"
                            className="form-label mb-0"
                          >
                            Narration
                          </label>
                        </div> */}
                        {/* <div className="col-md-10">
                          <textarea
                            className="form-control form-control-sm"
                            id="Narration"
                            name="Narration"
                            value={receiptData.Narration}
                            onChange={handleChange}
                            disabled={mode === "view"}
                            rows="2"
                          ></textarea>
                        </div> */}
                      </div>
                      <div className="row g-2 align-items-center">
                        {/* <div className="col-md-2">
                          <label
                            htmlFor="PrintDate"
                            className="form-label mb-0"
                          >
                            Print Date
                          </label>
                        </div> */}
                        {/* <div className="col-md-4">
                          <input
                            type="date"
                            className="form-control form-control-sm"
                            id="PrintDate"
                            name="PrintDate"
                            value={receiptData.PrintDate}
                            onChange={handleChange}
                            disabled={mode === "view"}
                          />
                        </div> */}


                        {/* <div className="col-md-2">
                          <label htmlFor="UserId" className="form-label mb-0">
                            User ID
                          </label>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            id="UserId"
                            name="UserId"
                            value={receiptData.UserId}
                            onChange={handleChange}
                            disabled={mode === "view"}
                          />
                        </div> */}
                      </div>
                    </div>





                    {/* <div className="col-md-3">
                      <div className="row g-2 align-items-center mb-2">
                        <div className="col-md-4">
                          <label className="form-label mb-0">Phone</label>
                        </div>
                        <div className="col-md-8">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={receiptData.admission?.PhoneNo || ""}
                            readOnly
                          />
                        </div>
                      </div>
                    </div> */}










                  </div>
                </fieldset>
              </div>
            </div>

            {/* Payment Detail Section */}
            <div className="row g-3">
              <div className="col-12">
                <fieldset
                  className="p-3 border rounded shadow-sm"
                  style={{ backgroundColor: "#E0E0E0" }}
                >
                  <legend
                    className="h6 fw-bold mb-0 px-2"
                    style={{ width: "auto", backgroundColor: "#E0E0E0" }}
                  >
                    Payment Detail
                  </legend>
                  <div className="row g-2">
                    <div className="col-md-6">
                      <div className="row g-2 align-items-center mb-2">
                        <div className="col-md-3">
                          <label htmlFor="amount" className="form-label mb-0">
                            Amount
                          </label>
                        </div>
                        <div className="col-md-9 d-flex gap-1">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            id="Amount"
                            name="Amount"
                            value={receiptData.Amount}
                            onChange={handleChange}
                          />
                          <label
                            htmlFor="tds"
                            className="form-label mb-0 fw-bold"
                          >
                            TDS
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            id="TDS"
                            name="TDS"
                            value={receiptData.TDS}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="row g-2 align-items-center mb-2">
                        <div className="col-md-3">
                          <label htmlFor="remarks" className="form-label mb-0">
                            Remarks
                          </label>
                        </div>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            id="Remarks"
                            name="Remarks"
                            value={receiptData.Remarks}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="row g-2 align-items-center mb-2">
                        <div className="col-md-3">
                          <label
                            htmlFor="paymentType"
                            className="form-label mb-0"
                          >
                            Payment Type(if  value == 2 then CARD)
                          </label>
                        </div>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            id="paymentType"
                            name="PaymentType"
                            value={receiptData.PaymentType}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="row g-2 align-items-center mb-2">
                        <div className="col-md-3">
                          <label htmlFor="paidBy" className="form-label mb-0">
                            Paid By
                          </label>
                        </div>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            id="PaidBy"
                            name="PaidBy"
                            value={receiptData.PaidBy}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="row g-2 align-items-center">
                        <div className="col-md-3">
                          <label
                            htmlFor="narration"
                            className="form-label mb-0"
                          >
                            Narration
                          </label>
                        </div>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            id="Narration"
                            name="Narration"
                            value={receiptData.Narration}
                            onChange={handleChange}
                          />
                        </div>
                      </div>





 <div className="row g-2 align-items-center">
                        <div className="col-md-3">
                          <label
                            htmlFor="narration"
                            className="form-label mb-0"
                          >
                            Remarks (my question is  why use  this  field && what value should be here? DB value  not  found)
                          </label>
                        </div>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            id="Narration"
                            name="Narration"
                            value={receiptData.Narration}
                            onChange={handleChange}
                          />
                        </div>
                      </div>


                    </div>
                    <div className="col-md-6">
                      <div
                        className="p-3 border rounded shadow-sm mb-2"
                        style={{ backgroundColor: "#E0E0E0" }}
                      >
                        <legend
                          className="h6 fw-bold mb-2 px-2"
                          style={{ width: "auto", backgroundColor: "#f4e3e3ff" }}
                        >
                          Cheque Detail
                        </legend>
                        <div className="row g-2 align-items-center mb-2">
                          <div className="col-md-3">
                            <label
                              htmlFor="bankName"
                              className="form-label mb-0"
                            >
                              Bank Name
                            </label>
                          </div>
                          <div className="col-md-9">
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              id="Bank"
                              name="Bank"
                              value={receiptData.Bank}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="row g-2 align-items-center mb-2">
                          <div className="col-md-3">
                            <label
                              htmlFor="chequeCard"
                              className="form-label mb-0"
                            >
                              Cheque / CARD
                            </label>
                          </div>
                          <div className="col-md-9">
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              id="Cheque"
                              name="Cheque"
                              value={receiptData.Cheque}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        

<div className="row g-2 align-items-center">
                          <div className="col-md-3">
                            <label
                              htmlFor="chequeDate"
                              className="form-label mb-0"
                            >
                              Chq Rct Dt
                            </label>
                          </div>
                          <div className="col-md-9">
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              id="ChqDate"
                              name="ChqDate"
                              value={receiptData.ChqDate}
                              onChange={handleChange}
                            />
                          </div>
                        </div>




<div className="row g-2 align-items-center">
                          <div className="col-md-3">
                            <label
                              htmlFor="chequeDate"
                              className="form-label mb-0"
                            >
                              Chq Rct Dt
                            </label>
                          </div>
                          <div className="col-md-9">
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              id="ClearDate"
                              name="ClearDate"
                              value={receiptData.ClearDate}
                              onChange={handleChange}
                            />
                          </div>
                        </div>


                      </div>
                      <div className="row g-2 align-items-center">
                        <div className="col-md-3">
                          <label
                            htmlFor="receivedBy"
                            className="form-label mb-0"
                          >
                            Received By(Old Data Not Found)
                          </label>
                        </div>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            // id="receivedBy"
                            // name="receivedBy"
                            // value={receiptData.receivedBy}
                            // onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="row g-2 align-items-center">
                        <div className="col-md-3">
                          <label
                            htmlFor="currentUser"
                            className="form-label mb-0"
                          >
                            Current User(Old Data Not Found)
                          </label>
                        </div>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            // id="currentUser"
                            // name="currentUser"
                            // value="SUSANTA"
                            

                            // onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* <div className="row g-2 align-items-center">
                        <div className="col-md-3">
                          <label htmlFor="remarks" className="form-label mb-0">
                            Remarks
                          </label>
                        </div>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            id="remarks"
                            name="remarks"
                            value={receiptData.remarks}
                            onChange={handleChange}
                          />
                        </div>
                      </div> */}
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>{" "}
          {/* End card-body */}
          {/* Footer Action Buttons */}
          <div className="card-footer p-3 bg-light border-top">
            <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-2">
              {/* <button
                className="btn btn-outline-secondary rounded-pill px-3"
                onClick={() => {
                  setMode("create");
                  setReceiptData({
                    MoneyreeciptId: "",
                    MoneyreeciptNo: "",
                    Amount: 0,
                    ReceiptDate: new Date().toISOString().split("T")[0],
                  });
                }}
                disabled={loading}
              >
                New
              </button> */}
              {/* <button
                className="btn btn-outline-primary rounded-pill px-3"
                onClick={() => setMode("edit")}
                disabled={loading || mode === "create"}
              >
                Edit
              </button> */}
              <button
                className="btn btn-success rounded-pill px-3"
                onClick={handleSubmit}
                disabled={loading || mode === "view"}
              >
                Save
              </button>
              {/* <button
                className="btn btn-danger rounded-pill px-3"
                disabled={loading || mode === "create"}
              >
                Delete
              </button> */}
              {/* <button
                className="btn btn-warning text-dark rounded-pill px-3"
                onClick={() => {
                  setMode("view");
                  fetchReceipt();
                }}
                disabled={loading || mode === "create"}
              >
                Undo
              </button> */}
              {/* <button className="btn btn-dark rounded-pill px-3">Print</button> */}
              <button
                className="btn btn-dark rounded-pill px-3"
                onClick={() => navigate("/sampleReceipts")}
              >
                Exit
              </button>
            </div>
          </div>
        </div>{" "}
        {/* End main card */}
      </div>
    </MasterLayout>
  );
}

export default InitialFormData;

























