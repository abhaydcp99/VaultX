
// // src/pages/Customer/CustomerVideoKYC.jsx
// import React, { useEffect, useRef, useState } from 'react';
// import { Container, Alert, Card, Badge, Spinner } from 'react-bootstrap';
// import { useParams } from 'react-router-dom';
// import { io } from 'socket.io-client';

// const CustomerVideoKYC = () => {
//   const { applicationId } = useParams();
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const peerConnection = useRef(null);
//   const socket = useRef(null);

//   const [connected, setConnected] = useState(false);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [connectionStatus, setConnectionStatus] = useState('Initializing...');

//   const servers = {
//     iceServers: [
//       { urls: 'stun:stun.l.google.com:19302' }, // public STUN server
//     ],
//   };

//   useEffect(() => {
//     // 1. Connect to signaling server
//     setConnectionStatus('Connecting to server...');
//     socket.current = io('http://localhost:3001');
//     socket.current.emit('join', applicationId);

//     // 2. Setup local stream
//     setConnectionStatus('Accessing camera and microphone...');
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then(stream => {
//         localVideoRef.current.srcObject = stream;
//         setConnectionStatus('Setting up video connection...');

//         // 3. Setup PeerConnection
//         peerConnection.current = new RTCPeerConnection(servers);

//         // Add local stream tracks to peer connection
//         stream.getTracks().forEach(track => {
//           peerConnection.current.addTrack(track, stream);
//         });

//         // Handle remote stream
//         peerConnection.current.ontrack = (event) => {
//           if (remoteVideoRef.current) {
//             remoteVideoRef.current.srcObject = event.streams[0];
//           }
//         };

//         // 4. Handle ICE candidates
//         peerConnection.current.onicecandidate = (event) => {
//           if (event.candidate) {
//             socket.current.emit('ice-candidate', {
//               candidate: event.candidate,
//               room: applicationId
//             });
//           }
//         };

//         // 5. Listen for offer from clerk
//         socket.current.on('offer', async (offer) => {
//           setConnectionStatus('Connecting to clerk...');
//           await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
//           const answer = await peerConnection.current.createAnswer();
//           await peerConnection.current.setLocalDescription(answer);
//           socket.current.emit('answer', {
//             answer,
//             room: applicationId
//           });
//           setConnected(true);
//           setIsLoading(false);
//           setConnectionStatus('Connected');
//         });

//         // 6. Handle ICE candidates from Clerk
//         socket.current.on('ice-candidate', async ({ candidate }) => {
//           try {
//             await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
//           } catch (err) {
//             console.error('Error adding received ice candidate', err);
//           }
//         });

//         setConnectionStatus('Waiting for clerk to join...');
//         setIsLoading(false);

//       })
//       .catch(err => {
//         console.error('Failed to access webcam:', err);
//         setError('Camera/Mic access denied or unavailable');
//         setIsLoading(false);
//         setConnectionStatus('Connection failed');
//       });

//     return () => {
//       if (socket.current) socket.current.disconnect();
//       if (peerConnection.current) peerConnection.current.close();
//     };
//   }, [applicationId]);

//   const getStatusVariant = () => {
//     if (error) return 'danger';
//     if (connected) return 'success';
//     if (isLoading) return 'info';
//     return 'warning';
//   };

//   const getStatusIcon = () => {
//     if (error) return '❌';
//     if (connected) return '✅';
//     if (isLoading) return '⏳';
//     return '⏸️';
//   };

//   return (
//     <div className="min-vh-100" style={{ 
//       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//       paddingTop: '2rem',
//       paddingBottom: '2rem'
//     }}>
//       <Container>
//         {/* Header Section */}
//         <div className="text-center mb-4">
//           <h1 className="text-white mb-3" style={{ fontWeight: '700', fontSize: '2.5rem' }}>
//             📹 Video KYC Session
//           </h1>
//           <p className="text-white-50 mb-4" style={{ fontSize: '1.1rem' }}>
//             Secure video verification with our KYC specialist
//           </p>
          
//           {/* Status Badge */}
//           <div className="d-flex justify-content-center mb-4">
//             <Badge 
//               bg={getStatusVariant()} 
//               className="px-4 py-2 rounded-pill" 
//               style={{ fontSize: '1rem' }}
//             >
//               {getStatusIcon()} {error || connectionStatus}
//               {isLoading && !error && <Spinner size="sm" className="ms-2" />}
//             </Badge>
//           </div>

//           {/* Application ID */}
//           <div className="text-white-50 mb-4">
//             <small>Application ID: <code className="text-white bg-dark bg-opacity-25 px-2 py-1 rounded">{applicationId}</code></small>
//           </div>
//         </div>

//         {/* Error Alert */}
//         {error && (
//           <Alert variant="danger" className="mb-4 shadow-sm">
//             <Alert.Heading>Connection Error</Alert.Heading>
//             <p className="mb-0">{error}</p>
//             <hr />
//             <small>Please ensure you have granted camera and microphone permissions, then refresh the page.</small>
//           </Alert>
//         )}

//         {/* Video Section */}
//         <div className="row g-4">
//           {/* Local Video */}
//           <div className="col-lg-6">
//             <Card className="h-100 shadow-lg border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
//               <Card.Header className="bg-primary text-white text-center py-3">
//                 <h5 className="mb-0">
//                   <i className="bi bi-camera-video me-2"></i>
//                   Your Video
//                 </h5>
//               </Card.Header>
//               <Card.Body className="p-0 position-relative">
//                 <div className="video-container" style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
//                   <video 
//                     ref={localVideoRef} 
//                     autoPlay 
//                     playsInline 
//                     muted 
//                     className="w-100 h-100"
//                     style={{ 
//                       position: 'absolute', 
//                       top: 0, 
//                       left: 0,
//                       objectFit: 'cover',
//                       background: '#000'
//                     }}
//                   />
//                   {/* Overlay for local video indicator */}
//                   <div 
//                     className="position-absolute top-0 start-0 m-3 px-2 py-1 rounded text-white"
//                     style={{ backgroundColor: 'rgba(0,0,0,0.7)', fontSize: '0.8rem' }}
//                   >
//                     🔴 LIVE
//                   </div>
//                 </div>
//               </Card.Body>
//             </Card>
//           </div>

//           {/* Remote Video */}
//           <div className="col-lg-6">
//             <Card className="h-100 shadow-lg border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
//               <Card.Header className="bg-success text-white text-center py-3">
//                 <h5 className="mb-0">
//                   <i className="bi bi-person-video me-2"></i>
//                   KYC Specialist
//                 </h5>
//               </Card.Header>
//               <Card.Body className="p-0 position-relative">
//                 <div className="video-container" style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
//                   <video 
//                     ref={remoteVideoRef} 
//                     autoPlay 
//                     playsInline 
//                     className="w-100 h-100"
//                     style={{ 
//                       position: 'absolute', 
//                       top: 0, 
//                       left: 0,
//                       objectFit: 'cover',
//                       background: '#000'
//                     }}
//                   />
//                   {/* Waiting overlay */}
//                   {!connected && (
//                     <div 
//                       className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
//                       style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
//                     >
//                       <div className="text-center text-white">
//                         <div className="mb-3">
//                           <Spinner animation="border" role="status" className="text-light">
//                             <span className="visually-hidden">Loading...</span>
//                           </Spinner>
//                         </div>
//                         <p className="mb-0">Waiting for specialist to join...</p>
//                       </div>
//                     </div>
//                   )}
                  
//                   {/* Connected indicator */}
//                   {connected && (
//                     <div 
//                       className="position-absolute top-0 start-0 m-3 px-2 py-1 rounded text-white"
//                       style={{ backgroundColor: 'rgba(0,128,0,0.8)', fontSize: '0.8rem' }}
//                     >
//                       🟢 CONNECTED
//                     </div>
//                   )}
//                 </div>
//               </Card.Body>
//             </Card>
//           </div>
//         </div>

//         {/* Instructions */}
//         {!error && (
//           <div className="mt-5">
//             <Card className="border-0 shadow-sm" style={{ borderRadius: '15px', backgroundColor: 'rgba(255,255,255,0.9)' }}>
//               <Card.Body className="p-4">
//                 <h5 className="text-primary mb-3">📋 Session Instructions</h5>
//                 <div className="row">
//                   <div className="col-md-6">
//                     <ul className="list-unstyled">
//                       <li className="mb-2">
//                         <i className="bi bi-check-circle-fill text-success me-2"></i>
//                         Ensure good lighting on your face
//                       </li>
//                       <li className="mb-2">
//                         <i className="bi bi-check-circle-fill text-success me-2"></i>
//                         Keep your documents ready
//                       </li>
//                     </ul>
//                   </div>
//                   <div className="col-md-6">
//                     <ul className="list-unstyled">
//                       <li className="mb-2">
//                         <i className="bi bi-check-circle-fill text-success me-2"></i>
//                         Speak clearly and follow instructions
//                       </li>
//                       <li className="mb-2">
//                         <i className="bi bi-check-circle-fill text-success me-2"></i>
//                         Process typically takes 5-10 minutes
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </Card.Body>
//             </Card>
//           </div>
//         )}
//       </Container>
//     </div>
//   );
// };

// export default CustomerVideoKYC;


import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useParams } from 'react-router-dom';

let stompClient = null;

const CustomerVideoKYC = () => {
  const { id } = useParams();
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [isCallStarted, setIsCallStarted] = useState(false);

  useEffect(() => {
    return () => {
      stompClient?.disconnect();
      peerConnection?.close();
    };
  }, [peerConnection]);

  const connectWebSocket = () => {
    const socket = new SockJS('http://localhost:8080/ws'); // Backend WS endpoint
    stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      console.log('Connected to WebSocket');

      // Subscribe to signaling channel for this session
      stompClient.subscribe(`/topic/webrtc/${id}`, (message) => {
        const data = JSON.parse(message.body);
        handleSignalingData(data);
      });

      // Notify join
      sendSignal({ type: 'join', from: 'customer', payload: null });
    });
  };

  const sendSignal = (msg) => {
    if (stompClient && stompClient.connected) {
      stompClient.send(`/app/webrtc/${id}`, {}, JSON.stringify(msg));
    }
  };

  const handleSignalingData = async (data) => {
    switch (data.type) {
      case 'offer':
        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.payload));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        sendSignal({ type: 'answer', from: 'customer', payload: answer });
        break;

      case 'answer':
        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.payload));
        break;

      case 'ice':
        await peerConnection.addIceCandidate(new RTCIceCandidate(data.payload));
        break;

      default:
        break;
    }
  };

  const startCall = async () => {
    if (!id) {
      alert("Application ID missing from URL.");
      return;
    }

    connectWebSocket();
    setIsCallStarted(true);

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });
    setPeerConnection(pc);

    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        sendSignal({ type: 'ice', from: 'customer', payload: event.candidate });
      }
    };

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };
  };

  return (
    <div className="container mt-4">
      <h3>Customer Video KYC</h3>

      {!isCallStarted ? (
        <button className="btn btn-primary" onClick={startCall}>
          Join Video Call
        </button>
      ) : (
        <div className="d-flex gap-3">
          <video ref={localVideoRef} autoPlay muted width="300" />
          <video ref={remoteVideoRef} autoPlay width="300" />
        </div>
      )}
    </div>
  );
};

export default CustomerVideoKYC;
