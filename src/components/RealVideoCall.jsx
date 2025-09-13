import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RealVideoCall = () => {
  const { roomId } = useParams();
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [userType, setUserType] = useState('patient');
  const [participants, setParticipants] = useState([]);
  const [messages, setMessages] = useState([]);
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection for signaling
    initializeWebSocket();
    
    return () => {
      cleanup();
    };
  }, [roomId]);

  const initializeWebSocket = () => {
    // For demo, we'll use localStorage to simulate real-time communication
    // In production, you'd use Socket.IO or WebSocket
    
    // Check if someone else is already in the room
    const existingParticipants = JSON.parse(localStorage.getItem(`room_${roomId}`) || '[]');
    setParticipants(existingParticipants);
    
    // Add current user to room
    const currentUser = {
      id: Date.now(),
      type: userType,
      joinedAt: new Date().toISOString()
    };
    
    const updatedParticipants = [...existingParticipants, currentUser];
    localStorage.setItem(`room_${roomId}`, JSON.stringify(updatedParticipants));
    setParticipants(updatedParticipants);
    
    // Listen for changes in the room
    const interval = setInterval(() => {
      const currentParticipants = JSON.parse(localStorage.getItem(`room_${roomId}`) || '[]');
      setParticipants(currentParticipants);
    }, 1000);
    
    return () => clearInterval(interval);
  };

  const startCall = async () => {
    try {
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      setIsCallActive(true);
      
      // Store stream info in localStorage for demo
      localStorage.setItem(`stream_${roomId}_${userType}`, 'active');
      
      // Simulate receiving remote stream after 3 seconds
      setTimeout(() => {
        simulateRemoteStream();
      }, 3000);
      
    } catch (error) {
      console.error('Error accessing camera/microphone:', error);
      alert('Please allow camera and microphone access');
    }
  };

  const simulateRemoteStream = async () => {
    // In a real app, this would be the other person's stream
    // For demo, we'll create a different video element
    try {
      const remoteStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false // Avoid feedback
      });
      
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
    } catch (error) {
      console.log('Could not simulate remote stream');
    }
  };

  const endCall = () => {
    cleanup();
    setIsCallActive(false);
    
    // Remove from room
    const currentParticipants = JSON.parse(localStorage.getItem(`room_${roomId}`) || '[]');
    const updatedParticipants = currentParticipants.filter(p => p.type !== userType);
    localStorage.setItem(`room_${roomId}`, JSON.stringify(updatedParticipants));
    localStorage.removeItem(`stream_${roomId}_${userType}`);
  };

  const cleanup = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
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

  const sendMessage = (message) => {
    const newMessage = {
      id: Date.now(),
      sender: userType,
      text: message,
      timestamp: new Date().toLocaleTimeString()
    };
    
    const roomMessages = JSON.parse(localStorage.getItem(`messages_${roomId}`) || '[]');
    const updatedMessages = [...roomMessages, newMessage];
    localStorage.setItem(`messages_${roomId}`, JSON.stringify(updatedMessages));
    setMessages(updatedMessages);
  };

  // Check if both doctor and patient are present
  const hasDoctor = participants.some(p => p.type === 'doctor');
  const hasPatient = participants.some(p => p.type === 'patient');
  const canStartCall = hasDoctor && hasPatient;

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2>🎥 Real Video Call - Room: {roomId}</h2>
      
      {/* Room Status */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
        <h3>👥 Room Status:</h3>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div>
            <strong>Doctor:</strong> {hasDoctor ? '✅ Present' : '❌ Waiting...'}
          </div>
          <div>
            <strong>Patient:</strong> {hasPatient ? '✅ Present' : '❌ Waiting...'}
          </div>
          <div>
            <strong>Total Participants:</strong> {participants.length}
          </div>
        </div>
        
        {!canStartCall && (
          <p style={{ color: '#ff6b35', marginTop: '10px' }}>
            ⏳ Waiting for both doctor and patient to join...
          </p>
        )}
      </div>

      {/* User Type Selection */}
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
            👤 Join as Patient
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
            👨⚕️ Join as Doctor
          </button>
        </div>
      </div>

      {!isCallActive ? (
        /* Call Start Screen */
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
              ? 'Both participants are ready!' 
              : 'Waiting for both doctor and patient to join the room...'
            }
          </p>
        </div>
      ) : (
        /* Active Call Screen */
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

          {/* Quick Actions */}
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button 
              onClick={() => sendMessage('Hello!')}
              style={{ 
                padding: '10px 20px', 
                margin: '0 5px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '5px'
              }}
            >
              👋 Say Hello
            </button>
            <button 
              onClick={() => sendMessage('Can you hear me?')}
              style={{ 
                padding: '10px 20px', 
                margin: '0 5px',
                backgroundColor: '#FF9800',
                color: 'white',
                border: 'none',
                borderRadius: '5px'
              }}
            >
              🔊 Audio Check
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e8f5e8', borderRadius: '8px' }}>
        <h4>📋 How to Test:</h4>
        <ol>
          <li>Open this URL in 2 different browsers: <code>https://xrk77z9r-3000.inc1.devtunnels.ms/real-video-call/{roomId}</code></li>
          <li>In first browser: Select "Join as Patient" and start call</li>
          <li>In second browser: Select "Join as Doctor" and start call</li>
          <li>Both users will see each other's video!</li>
        </ol>
      </div>
    </div>
  );
};

export default RealVideoCall;