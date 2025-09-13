

import React from 'react'
import MasterLayout from '../../../MasterLayout'
import Breadcrumb from '../../../Breadcrumb'

const Opd_query = () => {
  return (
    <MasterLayout>
      <Breadcrumb title="OPD Query" />









<div className="container-fluid"> {/* Or your main page container */}

    {/* Top Bar - OPD Query */}
    <div className="card">
        <div className="card-header">
            <h5 className="card-title mb-0">OPD Query</h5>
        </div>
        <div className="card-body">
            <form className="row gy-3">
                <div className="col-md-auto">
                    <input type="radio" name="queryType" id="doctorWise" value="doctor" defaultChecked />
                    <label htmlFor="doctorWise">Doctor Wise</label>
                </div>
                <div className="col-md-auto">
                    <input type="radio" name="queryType" id="departmentWise" value="department" />
                    <label htmlFor="departmentWise">Department Wise</label>
                </div>
                <div className="col-md-3">
                    <input type="text" className="form-control" placeholder="Doctor Name / Department" />
                    {/* This could be dynamic based on radio button selection */}
                </div>
                <div className="col-md-2">
                    <select className="form-select">
                        <option selected>Department</option>
                        {/* Add department options here */}
                    </select>
                </div>
                <div className="col-md-1">
                    <select className="form-select">
                        <option selected>Day</option>
                        {/* Add day options here */}
                    </select>
                </div>
                <div className="col-md-1">
                    <select className="form-select">
                        <option selected>All</option>
                        {/* Add options here */}
                    </select>
                </div>

                {/* Results Display Area - This would typically be a table */}
                <div className="col-lg-12 mt-3">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Doctor Name</th>
                                <th>Qualification</th>
                                <th>Speciality</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Rows with data would go here, likely populated dynamically */}
                            <tr>
                                <td>{/* Sample Data */}</td>
                                <td>{/* Sample Data */}</td>
                                <td>{/* Sample Data */}</td>
                                <td>{/* Sample Data */}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </form>
        </div>
    </div>

    {/* Middle Section - Visiting Our Setup */}
    <div className="col-lg-12 mt-3">
        <div className="card">
            <div className="card-header">
                <h5 className="card-title mb-0">Visiting Our Setup</h5>
            </div>
            <div className="card-body">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Days</th>
                            <th>1</th> {/* Assuming '1' is a header, adjust if not */}
                            <th>450</th>{/* Assuming '450' is a header, adjust if not */}
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>SUN</td><td><input type="checkbox" /></td><td><input type="checkbox" /></td></tr>
                        <tr><td>MON</td><td><input type="checkbox" /></td><td><input type="checkbox" /></td></tr>
                        <tr><td>TUE</td><td><input type="checkbox" /></td><td><input type="checkbox" /></td></tr>
                        <tr><td>WED</td><td><input type="checkbox" /></td><td><input type="checkbox" /></td></tr>
                        <tr><td>THU</td><td><input type="checkbox" /></td><td><input type="checkbox" /></td></tr>
                        <tr><td>FRI</td><td><input type="checkbox" /></td><td><input type="checkbox" /></td></tr>
                        <tr><td>SAT</td><td><input type="checkbox" /></td><td><input type="checkbox" /></td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    {/* Bottom Section - Rate Setup */}
    <div className="col-lg-12 mt-3">
        <div className="card">
            <div className="card-header">
                <h5 className="card-title mb-0">Rate Setup</h5>
            </div>
            <div className="card-body">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Visit Type</th>
                            <th>Rate</th>
                            <th>Service Ch</th>
                            <th>Group-A</th>
                            <th>Group-B</th>
                            <th>Group-C</th>
                            <th>Group-D</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>CONSULTATION</td>
                            <td><input type="text" className="form-control" /></td>
                            <td><input type="text" className="form-control" /></td>
                            <td><input type="text" className="form-control" /></td>
                            <td><input type="text" className="form-control" /></td>
                            <td><input type="text" className="form-control" /></td>
                            <td><input type="text" className="form-control" /></td>
                        </tr>
                        <tr>
                            <td>DIAGNOSIS</td>
                            <td><input type="text" className="form-control" /></td>
                            <td><input type="text" className="form-control" /></td>
                            <td><input type="text" className="form-control" /></td>
                            <td><input type="text" className="form-control" /></td>
                            <td><input type="text" className="form-control" /></td>
                            <td><input type="text" className="form-control" /></td>
                        </tr>
                        <tr>
                            <td>REPORTING</td>
                            <td><input type="text" className="form-control" /></td>
                            <td><input type="text" className="form-control" /></td>
                            <td><input type="text" className="form-control" /></td>
                            <td><input type="text" className="form-control" /></td>
                            <td><input type="text" className="form-control" /></td>
                            <td><input type="text" className="form-control" /></td>
                        </tr>
                        {/* You might want to add a row for the highlighted input under "REPORTING" or handle it differently */}
                         <tr>
                            <td colSpan="7"><input type="text" className="form-control" placeholder="Input for reporting..." /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</div>











    </MasterLayout>
  )
}

export default Opd_query

