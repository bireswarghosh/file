import React, { useState, useRef, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const FinalVideoCall = () => {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const userFromUrl = searchParams.get('user');
  
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [userType, setUserType] = useState(userFromUrl || '');
  const [userId, setUserId] = useState('');
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [participants, setParticipants] = useState({ doctor: false, patient: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (roomId) {
      fetchAppointmentDetails();
    }
    
    return () => {
      cleanup();
    };
  }, [roomId]);

  useEffect(() => {
    if (userType && userId && appointmentDetails) {
      joinVideoCall();
      startParticipantCheck();
    }
  }, [userType, userId, appointmentDetails]);

  const fetchAppointmentDetails = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/appointments/${roomId}/details`);
      
      if (response.data.success) {
        setAppointmentDetails(response.data.appointment);
        setError('');
      } else {
        setError('Appointment not found or not authorized');
      }
    } catch (err) {
      console.error('Error fetching appointment details:', err);
      setError('Failed to load appointment details');
    } finally {
      setLoading(false);
    }
  };

  const joinVideoCall = async () => {
    try {
      const response = await axiosInstance.post(`/appointments/${roomId}/join`, {
        userId: parseInt(userId),
        userType: userType
      });
      
      if (response.data.success) {
        // Mark user as joined
        localStorage.setItem(`videocall_${roomId}_${userType}`, JSON.stringify({
          userId: userId,
          userType: userType,
          joinedAt: Date.now()
        }));
        
        updateParticipants();
      } else {
        setError('Access denied. Please check your credentials.');
      }
    } catch (err) {
      console.error('Error joining video call:', err);
      setError('Failed to join video call. Please check your ID.');
    }
  };

  const startParticipantCheck = () => {
    intervalRef.current = setInterval(() => {
      updateParticipants();
    }, 2000);
  };

  const updateParticipants = () => {
    const doctorData = localStorage.getItem(`videocall_${roomId}_doctor`);
    const patientData = localStorage.getItem(`videocall_${roomId}_patient`);
    
    const now = Date.now();
    const timeout = 30000; // 30 seconds timeout
    
    let doctorActive = false;
    let patientActive = false;
    
    if (doctorData) {
      try {
        const data = JSON.parse(doctorData);
        if (now - data.joinedAt < timeout) {
          doctorActive = true;
        }
      } catch (e) {
        localStorage.removeItem(`videocall_${roomId}_doctor`);
      }
    }
    
    if (patientData) {
      try {
        const data = JSON.parse(patientData);
        if (now - data.joinedAt < timeout) {
          patientActive = true;
        }
      } catch (e) {
        localStorage.removeItem(`videocall_${roomId}_patient`);
      }
    }
    
    setParticipants({ doctor: doctorActive, patient: patientActive });
  };

  const cleanup = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Remove from participants
    if (roomId && userType) {
      localStorage.removeItem(`videocall_${roomId}_${userType}`);
    }
  };

  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      setIsCallActive(true);
      
      // Simulate remote video for demo
      setTimeout(async () => {
        try {
          const remoteStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
          });
          
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        } catch (error) {
          console.log('Could not get remote stream');
        }
      }, 2000);
      
    } catch (error) {
      console.error('Error accessing camera/microphone:', error);
      alert('Please allow camera and microphone access');
    }
  };

  const endCall = () => {
    cleanup();
    setIsCallActive(false);
    setIsMuted(false);
    setIsVideoOff(false);
  };

  const toggleMute = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOff(!videoTrack.enabled);
      }
    }
  };

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    
    // Auto-set user ID based on appointment details
    if (appointmentDetails) {
      if (type === 'doctor') {
        setUserId(appointmentDetails.doctor_id.toString());
      } else if (type === 'patient') {
        setUserId(appointmentDetails.patient_id.toString());
      }
    }
  };

  const canStartCall = participants.doctor && participants.patient;

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>🔄 Loading appointment details...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>❌ Error</h2>
        <p style={{ color: 'red' }}>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px' 
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h2>🎥 Hospital Video Call</h2>
      
      {/* Appointment Info */}
      {appointmentDetails && (
        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
          <h3>📅 Appointment Details:</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <p><strong>Appointment ID:</strong> {appointmentDetails.id}</p>
            <p><strong>Room:</strong> {roomId}</p>
            <p><strong>Patient:</strong> {appointmentDetails.patient_name} (ID: {appointmentDetails.patient_id})</p>
            <p><strong>Doctor:</strong> {appointmentDetails.doctor_name} (ID: {appointmentDetails.doctor_id})</p>
            <p><strong>Date:</strong> {appointmentDetails.date}</p>
            <p><strong>Time:</strong> {appointmentDetails.time}</p>
          </div>
        </div>
      )}
      
      {/* Participants Status */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
        <h3>👥 Participants:</h3>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>👨⚕️</span>
            <span><strong>Doctor:</strong> {participants.doctor ? '✅ Online' : '❌ Offline'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>👤</span>
            <span><strong>Patient:</strong> {participants.patient ? '✅ Online' : '❌ Offline'}</span>
          </div>
        </div>
        
        {userType && (
          <p style={{ marginTop: '10px', color: '#333' }}>
            <strong>You joined as:</strong> 
            <span style={{ 
              color: userType === 'doctor' ? '#2196F3' : '#4CAF50',
              marginLeft: '5px'
            }}>
              {userType === 'doctor' ? '👨⚕️ Doctor' : '👤 Patient'} (ID: {userId})
            </span>
          </p>
        )}
      </div>

      {/* User Selection */}
      {!userType && appointmentDetails && (
        <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
          <h3>🔐 Select Your Role:</h3>
          <p style={{ marginBottom: '15px', color: '#856404' }}>
            Choose your role to join the video call. Your ID will be automatically verified.
          </p>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button 
              onClick={() => handleUserTypeSelect('doctor')}
              style={{ 
                padding: '15px 25px', 
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none', 
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              👨⚕️ Join as Doctor<br/>
              <small>(ID: {appointmentDetails.doctor_id})</small>
            </button>
            <button 
              onClick={() => handleUserTypeSelect('patient')}
              style={{ 
                padding: '15px 25px', 
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none', 
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              👤 Join as Patient<br/>
              <small>(ID: {appointmentDetails.patient_id})</small>
            </button>
          </div>
        </div>
      )}

      {/* Video Call Interface */}
      {userType && (
        <>
          {!isCallActive ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <h3>Ready to start video consultation?</h3>
              
              {!canStartCall && (
                <div style={{ 
                  padding: '15px', 
                  backgroundColor: '#fff3cd', 
                  borderRadius: '8px', 
                  marginBottom: '20px',
                  border: '1px solid #ffeaa7'
                }}>
                  <p style={{ margin: 0, color: '#856404' }}>
                    ⏳ Waiting for {userType === 'doctor' ? 'patient' : 'doctor'} to join the room...
                  </p>
                </div>
              )}
              
              <button 
                onClick={startCall}
                disabled={!canStartCall}
                style={{ 
                  padding: '15px 30px', 
                  fontSize: '18px',
                  backgroundColor: canStartCall ? '#4CAF50' : '#ccc', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '8px',
                  cursor: canStartCall ? 'pointer' : 'not-allowed'
                }}
              >
                📹 Start Video Call
              </button>
              
              <p style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
                {canStartCall 
                  ? 'Both participants are ready! Click to start.' 
                  : 'Both doctor and patient must join before starting the call.'
                }
              </p>
            </div>
          ) : (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                {/* Local Video */}
                <div style={{ position: 'relative' }}>
                  <h4 style={{ margin: '0 0 10px 0' }}>
                    📹 You ({userType === 'patient' ? 'Patient' : 'Doctor'})
                  </h4>
                  <video 
                    ref={localVideoRef}
                    autoPlay 
                    muted 
                    playsInline
                    style={{ 
                      width: '100%', 
                      height: '300px', 
                      backgroundColor: '#000', 
                      borderRadius: '8px',
                      objectFit: 'cover'
                    }}
                  />
                  {isVideoOff && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      color: 'white',
                      fontSize: '24px',
                      textAlign: 'center'
                    }}>
                      📷<br/>Video Off
                    </div>
                  )}
                </div>

                {/* Remote Video */}
                <div style={{ position: 'relative' }}>
                  <h4 style={{ margin: '0 0 10px 0' }}>
                    📹 {userType === 'patient' ? 'Doctor' : 'Patient'}
                  </h4>
                  <video 
                    ref={remoteVideoRef}
                    autoPlay 
                    playsInline
                    style={{ 
                      width: '100%', 
                      height: '300px', 
                      backgroundColor: '#000', 
                      borderRadius: '8px',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px',
                    color: 'white',
                    fontSize: '12px',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    padding: '5px 8px',
                    borderRadius: '3px'
                  }}>
                    {userType === 'patient' ? appointmentDetails?.doctor_name : appointmentDetails?.patient_name}
                  </div>
                </div>
              </div>

              {/* Call Controls */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '15px',
                padding: '20px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px'
              }}>
                <button 
                  onClick={toggleMute}
                  title={isMuted ? 'Unmute' : 'Mute'}
                  style={{ 
                    padding: '15px', 
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: isMuted ? '#f44336' : '#4CAF50',
                    color: 'white',
                    fontSize: '24px',
                    cursor: 'pointer',
                    width: '60px',
                    height: '60px'
                  }}
                >
                  {isMuted ? '🔇' : '🎤'}
                </button>

                <button 
                  onClick={toggleVideo}
                  title={isVideoOff ? 'Turn Video On' : 'Turn Video Off'}
                  style={{ 
                    padding: '15px', 
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: isVideoOff ? '#f44336' : '#4CAF50',
                    color: 'white',
                    fontSize: '24px',
                    cursor: 'pointer',
                    width: '60px',
                    height: '60px'
                  }}
                >
                  {isVideoOff ? '📷' : '📹'}
                </button>

                <button 
                  onClick={endCall}
                  title="End Call"
                  style={{ 
                    padding: '15px', 
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: '#f44336',
                    color: 'white',
                    fontSize: '24px',
                    cursor: 'pointer',
                    width: '60px',
                    height: '60px'
                  }}
                >
                  📞
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FinalVideoCall;