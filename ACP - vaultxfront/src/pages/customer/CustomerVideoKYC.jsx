// src/pages/Customer/CustomerVideoKYC.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const CustomerVideoKYC = () => {
  const { applicationId } = useParams();
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const socket = useRef(null);

  const [connected, setConnected] = useState(false);
  const [error, setError] = useState('');

  const servers = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' }, // public STUN server
    ],
  };

  useEffect(() => {
    // 1. Connect to signaling server
    socket.current = io('http://localhost:3001');
    socket.current.emit('join', applicationId);

    // 2. Setup local stream
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        localVideoRef.current.srcObject = stream;

        // 3. Setup PeerConnection
        peerConnection.current = new RTCPeerConnection(servers);

        // Add local stream tracks to peer connection
        stream.getTracks().forEach(track => {
          peerConnection.current.addTrack(track, stream);
        });

        // Handle remote stream
        peerConnection.current.ontrack = (event) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        };

        // 4. Handle ICE candidates
        peerConnection.current.onicecandidate = (event) => {
          if (event.candidate) {
            socket.current.emit('ice-candidate', {
              candidate: event.candidate,
              room: applicationId
            });
          }
        };

        // 5. Listen for offer from clerk
        socket.current.on('offer', async (offer) => {
          await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
          const answer = await peerConnection.current.createAnswer();
          await peerConnection.current.setLocalDescription(answer);
          socket.current.emit('answer', {
            answer,
            room: applicationId
          });
          setConnected(true);
        });

        // 6. Handle ICE candidates from Clerk
        socket.current.on('ice-candidate', async ({ candidate }) => {
          try {
            await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
          } catch (err) {
            console.error('Error adding received ice candidate', err);
          }
        });

      })
      .catch(err => {
        console.error('Failed to access webcam:', err);
        setError('Camera/Mic access denied or unavailable');
      });

    return () => {
      if (socket.current) socket.current.disconnect();
      if (peerConnection.current) peerConnection.current.close();
    };
  }, [applicationId]);

  return (
    <Container className="mt-4">
      <h3>📹 Customer Video KYC</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {connected && <Alert variant="success">✅ Connected to Clerk</Alert>}
      
      <div className="d-flex justify-content-around mt-4">
        <div>
          <h5>Your Camera</h5>
          <video ref={localVideoRef} autoPlay playsInline muted className="border" width="300" />
        </div>
        <div>
          <h5>Clerk View</h5>
          <video ref={remoteVideoRef} autoPlay playsInline className="border" width="300" />
        </div>
      </div>
    </Container>
  );
};

export default CustomerVideoKYC;
