import React, { useState } from 'react';

const VideoCallLinkTest = () => {
  const [testLink, setTestLink] = useState('');
  const [roomId, setRoomId] = useState('');

  const handleLinkSubmit = () => {
    if (testLink.includes('/video-call/')) {
      const extractedRoomId = testLink.split('/video-call/')[1];
      setRoomId(extractedRoomId);
    } else {
      alert('Invalid video call link format');
    }
  };

  const openAsDoctor = () => {
    const doctorUrl = `https://xrk77z9r-3000.inc1.devtunnels.ms/video-call/${roomId}?user=doctor`;
    window.open(doctorUrl, '_blank', 'width=800,height=600');
  };

  const openAsPatient = () => {
    const patientUrl = `https://xrk77z9r-3000.inc1.devtunnels.ms/video-call/${roomId}?user=patient`;
    window.open(patientUrl, '_blank', 'width=800,height=600');
  };

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>🎥 Video Call Link Tester</h2>
      
      {/* Sample API Response */}
      <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
        <h3>📋 Sample API Response:</h3>
        <pre style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '5px', fontSize: '12px' }}>
{`{
  "success": true,
  "video_call_link": "https://xrk77z9r-3000.inc1.devtunnels.ms/video-call/appointment_105_1755495060338",
  "room_id": "appointment_105_1755495060338",
  "appointment_time": "2025-08-18T05:32:00.000Z",
  "expires_at": "2025-08-18T05:42:00.000Z"
}`}
        </pre>
      </div>

      {/* Link Input */}
      <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>🔗 Test Your Video Call Link:</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <input
            type="text"
            value={testLink}
            onChange={(e) => setTestLink(e.target.value)}
            placeholder="Paste your video call link here..."
            style={{
              flex: 1,
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '14px'
            }}
          />
          <button
            onClick={handleLinkSubmit}
            style={{
              padding: '12px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Test Link
          </button>
        </div>
        
        <button
          onClick={() => setTestLink('https://xrk77z9r-3000.inc1.devtunnels.ms/video-call/appointment_105_1755497253490')}
          style={{
            padding: '8px 15px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          Use Sample Link
        </button>
      </div>

      {/* Test Results */}
      {roomId && (
        <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#e8f5e8', borderRadius: '8px' }}>
          <h3>✅ Link Validated Successfully!</h3>
          <p><strong>Room ID:</strong> {roomId}</p>
          <p><strong>Status:</strong> Ready for testing</p>
          
          <div style={{ marginTop: '20px' }}>
            <h4>🚀 Open Video Call in Separate Windows:</h4>
            <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
              <button
                onClick={openAsDoctor}
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
                👨⚕️ Open as Doctor
              </button>
              
              <button
                onClick={openAsPatient}
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
                👤 Open as Patient
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div style={{ padding: '20px', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
        <h3>📖 How to Test:</h3>
        <ol style={{ lineHeight: '1.8' }}>
          <li><strong>Get Video Call Link:</strong> Use Postman to call your API and get the video_call_link</li>
          <li><strong>Paste Link:</strong> Copy the link and paste it in the input field above</li>
          <li><strong>Click Test Link:</strong> This will validate and extract the room ID</li>
          <li><strong>Open as Doctor:</strong> Click "Open as Doctor" - this opens a new window</li>
          <li><strong>Open as Patient:</strong> Click "Open as Patient" - this opens another window</li>
          <li><strong>Start Video Calls:</strong> In both windows, select your role and start the video call</li>
          <li><strong>See Each Other:</strong> You'll see both doctor and patient videos in real-time!</li>
        </ol>
        
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#d1ecf1', borderRadius: '5px' }}>
          <strong>💡 Pro Tip:</strong> Make sure to allow camera/microphone permissions in both browser windows for the best experience.
        </div>
      </div>

      {/* Quick Test Links */}
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>⚡ Quick Test Links:</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={() => window.open('https://xrk77z9r-3000.inc1.devtunnels.ms/real-video-call/test123', '_blank')}
            style={{
              padding: '12px',
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            🔗 Open Real Video Call Demo (Room: test123)
          </button>
          
          <button
            onClick={() => window.open('https://xrk77z9r-3000.inc1.devtunnels.ms/video-call-demo', '_blank')}
            style={{
              padding: '12px',
              backgroundColor: '#6f42c1',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            🎮 Open Video Call Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallLinkTest;