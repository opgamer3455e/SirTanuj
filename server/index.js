const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Map of roomId -> Map of socketId -> UserData
const rooms = new Map();

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Join Room
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);

    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Map());
    }
    
    // Store user data
    rooms.get(roomId).set(socket.id, {
      id: socket.id,
      userId: userId,
      isSpeaking: false,
      isScreenSharing: false,
      videoEnabled: true,
      audioEnabled: true
    });

    // Notify others in the room that a new user connected
    socket.to(roomId).emit('user-connected', socket.id);

    // Send the new user the list of all existing users in the room
    const existingUsers = Array.from(rooms.get(roomId).keys()).filter(id => id !== socket.id);
    socket.emit('all-users', existingUsers);

    console.log(`User ${socket.id} joined room ${roomId}`);

    socket.on('disconnect', () => {
      console.log(`User Disconnected: ${socket.id}`);
      if (rooms.has(roomId)) {
        rooms.get(roomId).delete(socket.id);
        if (rooms.get(roomId).size === 0) {
          rooms.delete(roomId);
        }
      }
      // Broadcast to everyone else that this user disconnected
      socket.to(roomId).emit('user-disconnected', socket.id);
    });
  });

  // Signaling: WebRTC Offer
  socket.on('offer', (payload) => {
    io.to(payload.userToSignal).emit('offer', {
      signal: payload.signal,
      callerID: payload.callerID
    });
  });

  // Signaling: WebRTC Answer
  socket.on('answer', (payload) => {
    io.to(payload.callerID).emit('answer', {
      signal: payload.signal,
      id: socket.id
    });
  });

  // Chat message
  socket.on('send-message', (roomId, messageData) => {
    io.to(roomId).emit('receive-message', messageData);
  });
  
  // Media State Update (Active Speaker filtering logic)
  socket.on('update-media-state', (roomId, mediaState) => {
    if (rooms.has(roomId) && rooms.get(roomId).has(socket.id)) {
      const user = rooms.get(roomId).get(socket.id);
      user.isSpeaking = mediaState.isSpeaking;
      user.videoEnabled = mediaState.videoEnabled;
      user.audioEnabled = mediaState.audioEnabled;
      
      // Broadcast to room the updated state so peers can adjust their UIs
      socket.to(roomId).emit('user-media-state-changed', {
        userId: socket.id,
        state: mediaState
      });
    }
  });

});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Signaling server running on port ${PORT}`);
});
