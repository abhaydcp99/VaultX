
// import React, { useEffect, useRef, useState } from 'react';
// import io from 'socket.io-client';
// import { useParams, useNavigate } from 'react-router-dom';
// import ClerkLayout from '../../layouts/ClerkLayout';

// const socket = io('http://localhost:3001');

// const ClerkVideoKYC = () => {
//   const { id } = useParams(); // FIXED: should match route param
//   const navigate = useNavigate();
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const [peerConnection, setPeerConnection] = useState(null);
//   const [isCallStarted, setIsCallStarted] = useState(false);

//   const [review, setReview] = useState({
//     selfieVerified: false,
//     poiVerified: false,
//     poaVerified: false,
//     livenessPassed: false,
//     notes: ''
//   });

//   useEffect(() => {
//     return () => {
//       socket.disconnect();
//       peerConnection?.close();
//     };
//   }, [peerConnection]);

//   const startCall = async () => {
//     if (!id) {
//       alert("Application ID missing from URL.");
//       return;
//     }

//     setIsCallStarted(true);
//     const pc = new RTCPeerConnection();
//     setPeerConnection(pc);

//     socket.emit('join-room', id);

//     const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//     if (localVideoRef.current) {
//       localVideoRef.current.srcObject = stream;
//     }
//     stream.getTracks().forEach((track) => pc.addTrack(track, stream));

//     socket.on('user-joined', async () => {
//       const offer = await pc.createOffer();
//       await pc.setLocalDescription(offer);
//       socket.emit('offer', { room: id, offer });
//     });

//     socket.on('answer', async ({ answer }) => {
//       await pc.setRemoteDescription(new RTCSessionDescription(answer));
//     });

//     socket.on('ice-candidate', ({ candidate }) => {
//       pc.addIceCandidate(new RTCIceCandidate(candidate));
//     });

//     socket.on('offer', async ({ offer }) => {
//       await pc.setRemoteDescription(new RTCSessionDescription(offer));
//       const answer = await pc.createAnswer();
//       await pc.setLocalDescription(answer);
//       socket.emit('answer', { room: id, answer });
//     });

//     pc.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit('ice-candidate', { room: id, candidate: event.candidate });
//       }
//     };

//     pc.ontrack = (event) => {
//       if (remoteVideoRef.current) {
//         remoteVideoRef.current.srcObject = event.streams[0];
//       }
//     };
//   };

//   const handleChange = (e) => {
//     const { name, type, checked, value } = e.target;
//     setReview((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleForward = async () => {
//     const { selfieVerified, poiVerified, poaVerified, livenessPassed } = review;
//     const token = localStorage.getItem('token');

//     if (!token) {
//       alert("User not authenticated. Please log in again.");
//       return;
//     }

//     if (!id) {
//       alert("Application ID not found.");
//       return;
//     }

//     if (selfieVerified && poiVerified && poaVerified && livenessPassed) {
//       try {
//         const response = await fetch(`http://localhost:8080/api/clerk/kyc/forward/${id}`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//           body: JSON.stringify(review)
//         });

//         if (response.ok) {
//           alert("KYC successfully forwarded to manager.");
//           navigate('/clerk/kyc');
//         } else {
//           alert("Failed to forward KYC. Please try again.");
//         }
//       } catch (error) {
//         console.error("Error forwarding KYC:", error);
//         alert("Unexpected error occurred.");
//       }
//     } else {
//       alert("Please complete all verification steps before forwarding.");
//     }
//   };

//   return (
//     <ClerkLayout>
//       <div className="container">
//         <h3>Video KYC - Clerk Review</h3>

//         {!isCallStarted ? (
//           <button className="btn btn-success mb-3" onClick={startCall}>
//             Start Video Call
//           </button>
//         ) : (
//           <div className="d-flex gap-3">
//             <video ref={localVideoRef} autoPlay muted width="300" />
//             <video ref={remoteVideoRef} autoPlay width="300" />
//           </div>
//         )}

//         <div className="form-check mt-3">
//           <input type="checkbox" className="form-check-input" id="selfieVerified"
//             name="selfieVerified" checked={review.selfieVerified} onChange={handleChange} />
//           <label htmlFor="selfieVerified">Selfie Verified</label>
//         </div>

//         <div className="form-check">
//           <input type="checkbox" className="form-check-input" id="poiVerified"
//             name="poiVerified" checked={review.poiVerified} onChange={handleChange} />
//           <label htmlFor="poiVerified">Proof of Identity Verified</label>
//         </div>

//         <div className="form-check">
//           <input type="checkbox" className="form-check-input" id="poaVerified"
//             name="poaVerified" checked={review.poaVerified} onChange={handleChange} />
//           <label htmlFor="poaVerified">Proof of Address Verified</label>
//         </div>

//         <div className="form-check">
//           <input type="checkbox" className="form-check-input" id="livenessPassed"
//             name="livenessPassed" checked={review.livenessPassed} onChange={handleChange} />
//           <label htmlFor="livenessPassed">Liveness Detection Passed</label>
//         </div>

//         <div className="form-group mt-3">
//           <label htmlFor="notes">Notes (optional)</label>
//           <textarea className="form-control" id="notes" name="notes"
//             rows="3" value={review.notes} onChange={handleChange}></textarea>
//         </div>

//         <button className="btn btn-primary mt-3" onClick={handleForward}>
//           Forward to Manager
//         </button>
//       </div>
//     </ClerkLayout>
//   );
// };

// export default ClerkVideoKYC;


import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useParams, useNavigate } from 'react-router-dom';
import ClerkLayout from '../../layouts/ClerkLayout';

let stompClient = null;

const ClerkVideoKYC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [isCallStarted, setIsCallStarted] = useState(false);

  const [review, setReview] = useState({
    selfieVerified: false,
    poiVerified: false,
    poaVerified: false,
    livenessPassed: false,
    notes: ''
  });

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

      // Optional: Notify join
      sendSignal({ type: 'join', from: 'clerk', payload: null });
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
        sendSignal({ type: 'answer', from: 'clerk', payload: answer });
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

  // ✅ Send a "join" message so customer side knows to open the video
  sendSignal({
    type: 'join',
    from: 'clerk',
    to: 'customer', // optional, can be ignored if not using
    payload: { applicationId: id, message: 'Please join the video call' }
  });

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
      sendSignal({ type: 'ice', from: 'clerk', payload: event.candidate });
    }
  };

  pc.ontrack = (event) => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = event.streams[0];
    }
  };

  // Clerk starts the call by sending an offer
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  sendSignal({ type: 'offer', from: 'clerk', payload: offer });
};


  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setReview((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleForward = async () => {
    const { selfieVerified, poiVerified, poaVerified, livenessPassed } = review;
    const token = localStorage.getItem('token');

    if (!token) {
      alert("User not authenticated. Please log in again.");
      return;
    }

    if (!id) {
      alert("Application ID not found.");
      return;
    }

    if (selfieVerified && poiVerified && poaVerified && livenessPassed) {
      try {
        const response = await fetch(`http://localhost:8080/api/clerk/kyc/forward/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(review)
        });

        if (response.ok) {
          alert("KYC successfully forwarded to manager.");
          navigate('/clerk/kyc');
        } else {
          alert("Failed to forward KYC. Please try again.");
        }
      } catch (error) {
        console.error("Error forwarding KYC:", error);
        alert("Unexpected error occurred.");
      }
    } else {
      alert("Please complete all verification steps before forwarding.");
    }
  };

  return (
    <ClerkLayout>
      <div className="container">
        <h3>Video KYC - Clerk Review</h3>

        {!isCallStarted ? (
          <button className="btn btn-success mb-3" onClick={startCall}>
            Start Video Call
          </button>
        ) : (
          <div className="d-flex gap-3">
            <video ref={localVideoRef} autoPlay muted width="300" />
            <video ref={remoteVideoRef} autoPlay width="300" />
          </div>
        )}

        <div className="form-check mt-3">
          <input type="checkbox" className="form-check-input" id="selfieVerified"
            name="selfieVerified" checked={review.selfieVerified} onChange={handleChange} />
          <label htmlFor="selfieVerified">Selfie Verified</label>
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="poiVerified"
            name="poiVerified" checked={review.poiVerified} onChange={handleChange} />
          <label htmlFor="poiVerified">Proof of Identity Verified</label>
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="poaVerified"
            name="poaVerified" checked={review.poaVerified} onChange={handleChange} />
          <label htmlFor="poaVerified">Proof of Address Verified</label>
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="livenessPassed"
            name="livenessPassed" checked={review.livenessPassed} onChange={handleChange} />
          <label htmlFor="livenessPassed">Liveness Detection Passed</label>
        </div>

        <div className="form-group mt-3">
          <label htmlFor="notes">Notes (optional)</label>
          <textarea className="form-control" id="notes" name="notes"
            rows="3" value={review.notes} onChange={handleChange}></textarea>
        </div>

        <button className="btn btn-primary mt-3" onClick={handleForward}>
          Forward to Manager
        </button>
      </div>
    </ClerkLayout>
  );
};

export default ClerkVideoKYC;
