import React, { useState, useRef, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const SimpleVideoCall = () => {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const userFromUrl = searchParams.get('user');
  
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [userType, setUserType] = useState(userFromUrl || '');
  const [roomStatus, setRoomStatus] = useState({ doctor: false, patient: false });
  const [connectionId] = useState(Date.now().toString());
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (roomId) {
      joinRoom();
      startStatusCheck();
    }
    
    return () => {
      leaveRoom();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [roomId, userType]);

  const joinRoom = () => {
    if (!userType || !roomId) return;
    
    // Set user status in localStorage
    localStorage.setItem(`${roomId}_${userType}_${connectionId}`, JSON.stringify({
      type: userType,
      active: true,
      joinedAt: Date.now()
    }));
    
    updateRoomStatus();
  };

  const leaveRoom = () => {
    if (roomId && userType) {
      localStorage.removeItem(`${roomId}_${userType}_${connectionId}`);
      
      // Clean up old entries
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(`${roomId}_${userType}_`)) {
          const data = JSON.parse(localStorage.getItem(key) || '{}');
          if (Date.now() - data.joinedAt > 60000) { // Remove entries older than 1 minute
            localStorage.removeItem(key);
          }
        }
      });
    }
    
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const startStatusCheck = () => {
    intervalRef.current = setInterval(() => {
      updateRoomStatus();
    }, 1000);
  };

  const updateRoomStatus = () => {
    if (!roomId) return;
    
    let doctorActive = false;
    let patientActive = false;
    
    // Check all localStorage entries for this room
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(`${roomId}_`)) {
        try {
          const data = JSON.parse(localStorage.getItem(key) || '{}');
          if (data.active && Date.now() - data.joinedAt < 60000) { // Active within last minute
            if (data.type === 'doctor') doctorActive = true;
            if (data.type === 'patient') patientActive = true;
          }
        } catch (e) {
          // Invalid data, remove it
          localStorage.removeItem(key);
        }
      }
    });
    
    setRoomStatus({ doctor: doctorActive, patient: patientActive });
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
      
      // Simulate remote video after 2 seconds
      setTimeout(async () => {
        try {
          const remoteStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false // Prevent feedback
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
      alert('Please allow camera and microphone access to start video call');
    }
  };

  const endCall = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
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

  const canStartCall = roomStatus.doctor && roomStatus.patient;

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h2>🎥 Hospital Video Call</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>Room: {roomId}</p>
      
      {/* Room Status */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
        <h3>👥 Participants:</h3>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>👨⚕️</span>
            <span><strong>Doctor:</strong> {roomStatus.doctor ? '✅ Online' : '❌ Offline'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>👤</span>
            <span><strong>Patient:</strong> {roomStatus.patient ? '✅ Online' : '❌ Offline'}</span>
          </div>
        </div>
        
        {userType && (
          <p style={{ marginTop: '10px', color: '#333' }}>
            <strong>You joined as:</strong> 
            <span style={{ 
              color: userType === 'doctor' ? '#2196F3' : '#4CAF50',
              marginLeft: '5px'
            }}>
              {userType === 'doctor' ? '👨⚕️ Doctor' : '👤 Patient'}
            </span>
          </p>
        )}
      </div>

      {/* User Selection */}
      {!userType && (
        <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
          <h3>🔐 Join as:</h3>
          <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
            <button 
              onClick={() => setUserType('doctor')}
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
              👨⚕️ Join as Doctor
            </button>
            <button 
              onClick={() => setUserType('patient')}
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
              👤 Join as Patient
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
                    {userType === 'patient' ? 'Dr. Smith' : 'Patient'}
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
      
      {/* Instructions */}
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e8f5e8', borderRadius: '8px' }}>
        <h4>📋 Instructions:</h4>
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li>Share this same link with both doctor and patient</li>
          <li>Each person selects their role when joining</li>
          <li>Video call starts when both participants are ready</li>
          <li>Use controls to mute/unmute or turn video on/off</li>
        </ul>
      </div>
    </div>
  );
};

export default SimpleVideoCall;