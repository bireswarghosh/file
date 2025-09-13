import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';

const VideoCallTest = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testAccess = async (appointmentId, userId, userType) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/appointments/${appointmentId}/video-access/${userId}/${userType}`
      );
      
      if (response.data.success) {
        setResult(`✅ Access GRANTED for ${userType} ${userId}`);
      } else {
        setResult(`❌ Access DENIED for ${userType} ${userId}`);
      }
    } catch (error) {
      setResult(`❌ Access DENIED for ${userType} ${userId} - ${error.response?.data?.message || 'Error'}`);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h2>🎥 Video Call Access Test</h2>
      
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Appointment 101 Details:</h3>
        <p><strong>Patient ID:</strong> 62</p>
        <p><strong>Doctor ID:</strong> 8555</p>
      </div>

      <div style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
        <button 
          onClick={() => testAccess(101, 62, 'patient')}
          disabled={loading}
          style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Test Patient 62 (Should Work ✅)
        </button>
        
        <button 
          onClick={() => testAccess(101, 8555, 'doctor')}
          disabled={loading}
          style={{ padding: '10px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Test Doctor 8555 (Should Work ✅)
        </button>
        
        <button 
          onClick={() => testAccess(101, 11, 'patient')}
          disabled={loading}
          style={{ padding: '10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Test Patient 11 (Should Fail ❌)
        </button>
        
        <button 
          onClick={() => testAccess(101, 999, 'doctor')}
          disabled={loading}
          style={{ padding: '10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Test Doctor 999 (Should Fail ❌)
        </button>
      </div>

      {loading && <p>Testing...</p>}
      
      {result && (
        <div style={{ 
          padding: '15px', 
          backgroundColor: result.includes('GRANTED') ? '#d4edda' : '#f8d7da',
          border: `1px solid ${result.includes('GRANTED') ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '5px',
          marginTop: '20px'
        }}>
          <strong>Result:</strong> {result}
        </div>
      )}
    </div>
  );
};

export default VideoCallTest;