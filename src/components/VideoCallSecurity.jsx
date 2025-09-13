import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const VideoCallSecurity = () => {
  const { roomId } = useParams();
  const [accessStatus, setAccessStatus] = useState('checking');
  const [appointmentData, setAppointmentData] = useState(null);

  useEffect(() => {
    checkAccess();
  }, [roomId]);

  const checkAccess = async () => {
    try {
      // Extract appointment ID from room ID
      const appointmentId = roomId.split('_')[1];
      
      // Get current user info (you need to implement this)
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = currentUser.id;
      const userType = currentUser.type; // 'doctor' or 'patient'
      
      // Check access permission
      const response = await axiosInstance.get(
        `/appointments/${appointmentId}/video-access/${userId}/${userType}`
      );
      
      if (response.data.success) {
        setAccessStatus('authorized');
        setAppointmentData(response.data);
      } else {
        setAccessStatus('denied');
      }
    } catch (error) {
      console.error('Access check failed:', error);
      setAccessStatus('denied');
    }
  };

  if (accessStatus === 'checking') {
    return <div>Checking access permissions...</div>;
  }

  if (accessStatus === 'denied') {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>🚫 Access Denied</h2>
        <p>You are not authorized to join this video call.</p>
        <p>Only the patient and doctor involved in this appointment can join.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>✅ Access Granted - Video Call Ready</h2>
      {/* Your video call component here */}
    </div>
  );
};

export default VideoCallSecurity;