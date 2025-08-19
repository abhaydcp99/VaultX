// // === 1. ClerkVideoKYC.jsx ===
// import React, { useEffect, useRef, useState } from 'react';
// import io from 'socket.io-client';
// import ClerkLayout from '../../layouts/ClerkLayout';

// const socket = io('http://localhost:3001');

// const ClerkVideoKYC = ({ applicationId }) => {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const [peerConnection, setPeerConnection] = useState(null);
//   const [checkboxes, setCheckboxes] = useState({ aadhar: false, pan: false });

//   useEffect(() => {
//     const pc = new RTCPeerConnection();
//     setPeerConnection(pc);

//     socket.emit('join-room', applicationId);

//     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
//       localVideoRef.current.srcObject = stream;
//       stream.getTracks().forEach((track) => pc.addTrack(track, stream));
//     });

//     socket.on('user-joined', async () => {
//       const offer = await pc.createOffer();
//       await pc.setLocalDescription(offer);
//       socket.emit('offer', { room: applicationId, offer });
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
//       socket.emit('answer', { room: applicationId, answer });
//     });

//     pc.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit('ice-candidate', { room: applicationId, candidate: event.candidate });
//       }
//     };

//     pc.ontrack = (event) => {
//       remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     return () => {
//       socket.disconnect();
//       pc.close();
//     };
//   }, [applicationId]);

//   const handleForward = async () => {
//     if (checkboxes.aadhar && checkboxes.pan) {
//       await fetch(`/api/clerk/kyc/forward/${applicationId}`, { method: 'PUT' });
//       alert('Forwarded to manager.');
//     } else {
//       alert('Please complete all checks.');
//     }
//   };

//   return (
//     <ClerkLayout>
//     <div className="container">
//       <h3>Video KYC - Clerk View</h3>
//       <div className="d-flex gap-3">
//         <video ref={localVideoRef} autoPlay muted width="300" />
//         <video ref={remoteVideoRef} autoPlay width="300" />
//       </div>
//       <div className="form-check mt-3">
//         <input type="checkbox" className="form-check-input" id="aadhar" checked={checkboxes.aadhar} onChange={() => setCheckboxes({ ...checkboxes, aadhar: !checkboxes.aadhar })} />
//         <label htmlFor="aadhar">Aadhar Verified</label>
//       </div>
//       <div className="form-check">
//         <input type="checkbox" className="form-check-input" id="pan" checked={checkboxes.pan} onChange={() => setCheckboxes({ ...checkboxes, pan: !checkboxes.pan })} />
//         <label htmlFor="pan">PAN Verified</label>
//       </div>
//       <button className="btn btn-primary mt-2" onClick={handleForward}>Forward to Manager</button>
//     </div>
//     </ClerkLayout>
//   );
// };

// export default ClerkVideoKYC;

import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { useParams, useNavigate } from 'react-router-dom';
import ClerkLayout from '../../layouts/ClerkLayout';

const socket = io('http://localhost:3001');

const ClerkVideoKYC = () => {
  const { id } = useParams(); // FIXED: should match route param
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
      socket.disconnect();
      peerConnection?.close();
    };
  }, [peerConnection]);

  const startCall = async () => {
    if (!id) {
      alert("Application ID missing from URL.");
      return;
    }

    setIsCallStarted(true);
    const pc = new RTCPeerConnection();
    setPeerConnection(pc);

    socket.emit('join-room', id);

    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    socket.on('user-joined', async () => {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.emit('offer', { room: id, offer });
    });

    socket.on('answer', async ({ answer }) => {
      await pc.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on('ice-candidate', ({ candidate }) => {
      pc.addIceCandidate(new RTCIceCandidate(candidate));
    });

    socket.on('offer', async ({ offer }) => {
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit('answer', { room: id, answer });
    });

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('ice-candidate', { room: id, candidate: event.candidate });
      }
    };

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };
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
