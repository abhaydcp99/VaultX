// signaling-server/index.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // adjust to your React frontend origin if needed
    methods: ['GET', 'POST']
  }
});

const PORT = 3001;

io.on('connection', (socket) => {
  console.log('🟢 A user connected:', socket.id);

  // Join room based on applicationId
  socket.on('join', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  // Offer from Clerk
  socket.on('offer', ({ offer, room }) => {
    socket.to(room).emit('offer', offer);
  });

  // Answer from Customer
  socket.on('answer', ({ answer, room }) => {
    socket.to(room).emit('answer', answer);
  });

  // ICE candidate sharing
  socket.on('ice-candidate', ({ candidate, room }) => {
    socket.to(room).emit('ice-candidate', { candidate });
  });

  socket.on('disconnect', () => {
    console.log('🔴 A user disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`✅ Signaling server running on http://localhost:${PORT}`);
});
