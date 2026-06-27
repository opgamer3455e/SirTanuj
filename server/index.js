require('dotenv').config();
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
});
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION:', err);
});
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const { router: authRouter } = require('./routes/auth');
const curriculumRouter = require('./routes/curriculum');

const app = express();

// Allow localhost in dev, and the deployed Netlify URL in production
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: Origin not allowed: ${origin}`));
    }
  },
  credentials: true // allow cookies
}));
app.use(express.json()); // Enable JSON body parsing for REST API
app.use(cookieParser()); // Enable Cookie parsing for JWT

// Connect to MongoDB
const connectDB = async () => {
  try {
    try {
      await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/teacher_cms');
      console.log('MongoDB connected successfully');
    } catch (err) {
      console.log('Local MongoDB not running. Starting in-memory database for dev...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      await mongoose.connect(mongoServer.getUri());
      console.log('In-memory MongoDB connected successfully');
    }

    // Auto-create Admin/Teacher account
    const existingAdmin = await User.findOne({ username: 'TanujKim' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('FATKIMBALDPUTIN', 10);
      await User.create({
        username: 'TanujKim',
        name: 'Tanuj Kim',
        email: 'admin@nexus.edu', // dummy email
        password: hashedPassword,
        role: 'TEACHER'
      });
      console.log('Teacher account "TanujKim" created successfully.');
    } else {
      console.log('Teacher account "TanujKim" already exists.');
    }
  } catch (err) {
    console.error('CRITICAL ERROR in connectDB:', err);
  }
};
connectDB();

// REST API Routes
const studentsRouter = require('./routes/students');
const liveClassesRouter = require('./routes/liveClasses');
app.use('/api/auth', authRouter);
app.use('/api/curriculum', curriculumRouter);
app.use('/api/students', studentsRouter);
app.use('/api/live-classes', liveClassesRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Map of roomId -> Map of socketId -> UserData
const rooms = new Map();

// Track which room each socket is in, so disconnect can clean up
const socketRoomMap = new Map(); // socketId -> roomId

io.on('connection', (socket) => {
  console.log(`[WS] Connected: ${socket.id}`);

  // Join Room
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socketRoomMap.set(socket.id, roomId);

    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Map());
    }
    
    rooms.get(roomId).set(socket.id, {
      id: socket.id,
      userId: userId,
      isSpeaking: false,
      isScreenSharing: false,
      videoEnabled: true,
      audioEnabled: true
    });

    // Send the new user the list of all existing users in the room (excluding themselves)
    const existingUsers = Array.from(rooms.get(roomId).keys()).filter(id => id !== socket.id);
    socket.emit('all-users', existingUsers);

    // Notify existing users that someone new joined
    socket.to(roomId).emit('user-joined', socket.id);

    console.log(`[WS] ${socket.id} joined room ${roomId} (${existingUsers.length} existing users)`);
  });

  // Generic signal relay — forwards offers, answers, AND ICE candidates
  socket.on('relay-signal', (payload) => {
    const { targetId, signal } = payload;
    console.log(`[WS] relay-signal: ${socket.id} -> ${targetId} (${signal.type || 'candidate'})`);
    io.to(targetId).emit('relay-signal', {
      senderId: socket.id,
      signal,
    });
  });

  // Chat message
  socket.on('send-message', (roomId, messageData) => {
    io.to(roomId).emit('receive-message', messageData);
  });

  // Whiteboard Action Sync
  socket.on('whiteboard-action', (roomId, actionData) => {
    socket.to(roomId).emit('whiteboard-action', actionData);
  });

  // Whiteboard Toggle Sync
  socket.on('whiteboard-toggle', (roomId, isOpen) => {
    socket.to(roomId).emit('whiteboard-toggle', isOpen);
  });
  
  // Media State Update
  socket.on('update-media-state', (roomId, mediaState) => {
    if (rooms.has(roomId) && rooms.get(roomId).has(socket.id)) {
      const user = rooms.get(roomId).get(socket.id);
      user.isSpeaking = mediaState.isSpeaking;
      user.videoEnabled = mediaState.videoEnabled;
      user.audioEnabled = mediaState.audioEnabled;
      
      socket.to(roomId).emit('user-media-state-changed', {
        userId: socket.id,
        state: mediaState
      });
    }
  });

  // Disconnect — moved OUTSIDE join-room to prevent duplicate handlers
  socket.on('disconnect', () => {
    console.log(`[WS] Disconnected: ${socket.id}`);
    const roomId = socketRoomMap.get(socket.id);
    if (roomId && rooms.has(roomId)) {
      rooms.get(roomId).delete(socket.id);
      if (rooms.get(roomId).size === 0) {
        rooms.delete(roomId);
      }
      socket.to(roomId).emit('user-disconnected', socket.id);
    }
    socketRoomMap.delete(socket.id);
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Signaling server running on port ${PORT}`);
});
