require('dotenv').config();
if (!global.crypto) {
  global.crypto = require('crypto').webcrypto || require('crypto');
}
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
    console.log('[CORS] Origin check:', origin);
    // Allow localhost, any netlify frontend, or the exact env variable
    if (!origin || 
        origin.includes('localhost') || 
        origin.includes('netlify.app') || 
        origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      console.error(`[CORS] Blocked origin: ${origin}`);
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
    if (process.env.MONGO_URI) {
      // Production: use the provided MongoDB URI
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB connected successfully (external)');
    } else {
      // Development: try local MongoDB first, then fall back to in-memory
      try {
        await mongoose.connect('mongodb://localhost:27017/teacher_cms');
        console.log('MongoDB connected successfully (local)');
      } catch (err) {
        console.log('Local MongoDB not running. Starting in-memory database for dev...');
        const { MongoMemoryServer } = require('mongodb-memory-server');
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
        console.log('In-memory MongoDB connected successfully');
      }
    }

    // Auto-create Admin/Teacher account
    const existingAdmin = await User.findOne({ username: 'TanujKim' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('FATKIMBALDPUTIN', 10);
      await User.create({
        username: 'TanujKim',
        name: 'Tanuj Kim',
        email: 'admin@nexus.edu',
        password: hashedPassword,
        role: 'TEACHER'
      });
      console.log('Teacher account "TanujKim" created successfully.');
    } else {
      console.log('Teacher account "TanujKim" already exists.');
    }
  } catch (err) {
    console.error('CRITICAL ERROR in connectDB:', err);
    // Don't crash the server — let it run without DB so CORS headers still work
  }
};
connectDB();

// REST API Routes
const studentsRouter = require('./routes/students');
const liveClassesRouter = require('./routes/liveClasses');
const studyMaterialsRouter = require('./routes/studyMaterials');
app.use('/api/auth', authRouter);
app.use('/api/curriculum', curriculumRouter);
app.use('/api/students', studentsRouter);
app.use('/api/live-classes', liveClassesRouter);
app.use('/api/study-materials', studyMaterialsRouter);

// Public endpoint: get published courses (no auth)
const Course = require('./models/Course');
app.get('/api/public/courses', async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).select('-modules.lessons.contentUrl');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin || origin.includes('localhost') || origin.includes('netlify.app') || origin === process.env.FRONTEND_URL) {
        callback(null, true);
      } else {
        callback(new Error('Socket CORS blocked: ' + origin));
      }
    },
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
