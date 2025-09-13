import React, { useState, useRef, useEffect } from 'react';

const VideoCallDemo = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [userType, setUserType] = useState('patient'); // patient or doctor
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStreamRef = useRef(null);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCall = async () => {
    try {
      // Get user media (camera + microphone)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      setIsCallActive(true);
      
      // Simulate remote video (for demo purposes)
      setTimeout(() => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = stream; // Using same stream for demo
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

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>🎥 Video Call Demo - Hospital Appointment</h2>
      
      {/* User Type Selection */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Select Your Role:</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setUserType('patient')}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: userType === 'patient' ? '#4CAF50' : '#ddd',
              color: userType === 'patient' ? 'white' : 'black',
              border: 'none', 
              borderRadius: '5px' 
            }}
          >
            👤 Patient
          </button>
          <button 
            onClick={() => setUserType('doctor')}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: userType === 'doctor' ? '#2196F3' : '#ddd',
              color: userType === 'doctor' ? 'white' : 'black',
              border: 'none', 
              borderRadius: '5px' 
            }}
          >
            👨‍⚕️ Doctor
          </button>
        </div>
        <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          You are joining as: <strong>{userType === 'patient' ? 'Patient' : 'Doctor'}</strong>
        </p>
      </div>

      {/* Appointment Info */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
        <h3>📅 Appointment Details:</h3>
        <p><strong>Appointment ID:</strong> 101</p>
        <p><strong>Patient:</strong> Test Patient (ID: 62)</p>
        <p><strong>Doctor:</strong> Dr. Smith (ID: 8555)</p>
        <p><strong>Time:</strong> 12:00 PM</p>
        <p><strong>Status:</strong> <span style={{ color: 'green' }}>✅ Accepted</span></p>
      </div>

      {!isCallActive ? (
        /* Call Start Screen */
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h3>Ready to start video consultation?</h3>
          <button 
            onClick={startCall}
            style={{ 
              padding: '15px 30px', 
              fontSize: '18px',
              backgroundColor: '#4CAF50', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            📹 Start Video Call
          </button>
          <p style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
            Make sure your camera and microphone are working
          </p>
        </div>
      ) : (
        /* Active Call Screen */
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            {/* Local Video (Your Video) */}
            <div style={{ position: 'relative' }}>
              <h4>{userType === 'patient' ? '👤 You (Patient)' : '👨‍⚕️ You (Doctor)'}</h4>
              <video 
                ref={localVideoRef}
                autoPlay 
                muted 
                playsInline
                style={{ 
                  width: '100%', 
                  height: '250px', 
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
                  fontSize: '24px'
                }}>
                  📷 Video Off
                </div>
              )}
            </div>

            {/* Remote Video (Other Person's Video) */}
            <div style={{ position: 'relative' }}>
              <h4>{userType === 'patient' ? '👨‍⚕️ Doctor' : '👤 Patient'}</h4>
              <video 
                ref={remoteVideoRef}
                autoPlay 
                playsInline
                style={{ 
                  width: '100%', 
                  height: '250px', 
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
                padding: '5px',
                borderRadius: '3px'
              }}>
                {userType === 'patient' ? 'Dr. Smith' : 'Test Patient'}
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
              style={{ 
                padding: '12px', 
                borderRadius: '50%',
                border: 'none',
                backgroundColor: isMuted ? '#f44336' : '#4CAF50',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer',
                width: '50px',
                height: '50px'
              }}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? '🔇' : '🎤'}
            </button>

            <button 
              onClick={toggleVideo}
              style={{ 
                padding: '12px', 
                borderRadius: '50%',
                border: 'none',
                backgroundColor: isVideoOff ? '#f44336' : '#4CAF50',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer',
                width: '50px',
                height: '50px'
              }}
              title={isVideoOff ? 'Turn Video On' : 'Turn Video Off'}
            >
              {isVideoOff ? '📷' : '📹'}
            </button>

            <button 
              onClick={endCall}
              style={{ 
                padding: '12px', 
                borderRadius: '50%',
                border: 'none',
                backgroundColor: '#f44336',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer',
                width: '50px',
                height: '50px'
              }}
              title="End Call"
            >
              📞
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <p style={{ fontSize: '14px', color: '#666' }}>
              Call Duration: {Math.floor(Date.now() / 1000) % 60} seconds
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCallDemo;