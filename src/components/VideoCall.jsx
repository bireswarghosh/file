import React, { useState, useRef, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const VideoCall = () => {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const userFromUrl = searchParams.get('user');
  
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [userType, setUserType] = useState(userFromUrl || 'patient');
  const [participants, setParticipants] = useState([]);
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStreamRef = useRef(null);

  useEffect(() => {
    if (userFromUrl) {
      setUserType(userFromUrl);
    }
    
    initializeRoom();
    
    return () => {
      cleanup();
    };
  }, [roomId, userFromUrl]);

  const initializeRoom = () => {
    if (!roomId) return;
    
    const existingParticipants = JSON.parse(localStorage.getItem(`room_${roomId}`) || '[]');
    setParticipants(existingParticipants);
    
    const currentUser = {
      id: Date.now(),
      type: userType,
      joinedAt: new Date().toISOString()
    };
    
    const updatedParticipants = [...existingParticipants.filter(p => p.type !== userType), currentUser];
    localStorage.setItem(`room_${roomId}`, JSON.stringify(updatedParticipants));
    setParticipants(updatedParticipants);
    
    const interval = setInterval(() => {
      const currentParticipants = JSON.parse(localStorage.getItem(`room_${roomId}`) || '[]');
      setParticipants(currentParticipants);
    }, 1000);
    
    return () => clearInterval(interval);
  };

  const cleanup = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
    
    if (roomId) {
      const currentParticipants = JSON.parse(localStorage.getItem(`room_${roomId}`) || '[]');
      const updatedParticipants = currentParticipants.filter(p => p.type !== userType);
      localStorage.setItem(`room_${roomId}`, JSON.stringify(updatedParticipants));
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
      localStorage.setItem(`stream_${roomId}_${userType}`, 'active');
      
      setTimeout(() => {
        simulateRemoteStream();
      }, 2000);
      
    } catch (error) {
      console.error('Error accessing camera/microphone:', error);
      alert('Please allow camera and microphone access');
    }
  };

  const simulateRemoteStream = async () => {
    try {
      const remoteStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      });
      
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
    } catch (error) {
      console.log('Remote stream simulation failed');
    }
  };

  const endCall = () => {
    cleanup();
    setIsCallActive(false);
    setIsMuted(false);
    setIsVideoOff(false);
    
    if (roomId) {
      localStorage.removeItem(`stream_${roomId}_${userType}`);
    }
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

  const hasDoctor = participants.some(p => p.type === 'doctor');
  const hasPatient = participants.some(p => p.type === 'patient');
  const canStartCall = hasDoctor && hasPatient;

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h2>🎥 Video Call - Room: {roomId}</h2>
      
      {/* Room Status */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
        <h3>👥 Room Status:</h3>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div>
            <strong>Doctor:</strong> {hasDoctor ? '✅ Connected' : '❌ Waiting...'}
          </div>
          <div>
            <strong>Patient:</strong> {hasPatient ? '✅ Connected' : '❌ Waiting...'}
          </div>
          <div>
            <strong>You are:</strong> <span style={{ color: userType === 'doctor' ? '#2196F3' : '#4CAF50' }}>
              {userType === 'doctor' ? '👨⚕️ Doctor' : '👤 Patient'}
            </span>
          </div>
        </div>
        
        {!canStartCall && (
          <p style={{ color: '#ff6b35', marginTop: '10px' }}>
            ⏳ Waiting for {userType === 'doctor' ? 'patient' : 'doctor'} to join...
          </p>
        )}
      </div>

      {/* Role Selection (if not set from URL) */}
      {!userFromUrl && (
        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <h3>Select Your Role:</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => setUserType('patient')}
              disabled={isCallActive}
              style={{ 
                padding: '10px 20px', 
                backgroundColor: userType === 'patient' ? '#4CAF50' : '#ddd',
                color: userType === 'patient' ? 'white' : 'black',
                border: 'none', 
                borderRadius: '5px',
                cursor: isCallActive ? 'not-allowed' : 'pointer'
              }}
            >
              👤 Patient
            </button>
            <button 
              onClick={() => setUserType('doctor')}
              disabled={isCallActive}
              style={{ 
                padding: '10px 20px', 
                backgroundColor: userType === 'doctor' ? '#2196F3' : '#ddd',
                color: userType === 'doctor' ? 'white' : 'black',
                border: 'none', 
                borderRadius: '5px',
                cursor: isCallActive ? 'not-allowed' : 'pointer'
              }}
            >
              👨⚕️ Doctor
            </button>
          </div>
        </div>
      )}

      {!isCallActive ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h3>Ready to start video consultation?</h3>
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
              : 'Waiting for both doctor and patient to join the room...'
            }
          </p>
        </div>
      ) : (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            {/* Local Video */}
            <div style={{ position: 'relative' }}>
              <h4>📹 You ({userType === 'patient' ? 'Patient' : 'Doctor'})</h4>
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
                  fontSize: '24px'
                }}>
                  📷 Video Off
                </div>
              )}
            </div>

            {/* Remote Video */}
            <div style={{ position: 'relative' }}>
              <h4>📹 {userType === 'patient' ? 'Doctor' : 'Patient'}</h4>
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

          <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <p style={{ fontSize: '14px', color: '#666' }}>
              Room: {roomId} | Participants: {participants.length}
            </p>
          </div>
        </div>
      )}
      
      {/* Instructions */}
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e8f5e8', borderRadius: '8px' }}>
        <h4>📋 How this works:</h4>
        <ol>
          <li>This link was generated from your API for a specific appointment</li>
          <li>Doctor and Patient both use the same link to join</li>
          <li>System automatically detects who is joining</li>
          <li>Once both join, video call can start!</li>
        </ol>
      </div>
    </div>
  );
};

export default VideoCall;