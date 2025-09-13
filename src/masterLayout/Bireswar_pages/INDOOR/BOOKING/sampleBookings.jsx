import React from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

// --- Sample Data (In a real app, this would come from an API) ---
const bookingsData = [
    { bookingNo: 'B-001', date: '2025-02-22', patientName: 'UJJWAL DAS', bookingFor: 'Consultation' },
    { bookingNo: 'B-002', date: '2025-02-22', patientName: 'DEBAPRIYA AICH', bookingFor: 'Diagnosis' },
    { bookingNo: 'B-003', date: '2025-02-22', patientName: 'PRIYANKA', bookingFor: 'Follow-up' },
];

// Simple component that doesn't use browser extensions
function SampleBookings() {
    return (
        <MasterLayout>
            <Breadcrumb title="Sample Bookings" />
            <div className="container-fluid py-4">
                <div className="card">
                    <div className="card-header">
                        <h5 className="card-title">Booking List</h5>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Booking No</th>
                                        <th>Date</th>
                                        <th>Patient Name</th>
                                        <th>Booking For</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookingsData.map(booking => (
                                        <tr key={booking.bookingNo}>
                                            <td>{booking.bookingNo}</td>
                                            <td>{booking.date}</td>
                                            <td>{booking.patientName}</td>
                                            <td>{booking.bookingFor}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
}

export default SampleBookings;