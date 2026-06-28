const express = require('express');
const router = express.Router();
const User = require('../models/User');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_for_development_only_change_in_production';

// Helper function to generate tokens and cookies
const issueTokenAndCookie = (res, user, newSessionKey) => {
  const token = jwt.sign(
    { userId: user._id, role: user.role, deviceSessionKey: newSessionKey },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  });

  return token;
};

// @route   POST /api/auth/register
// @desc    Register a new user with email and password
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newSessionKey = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    user = new User({
      name,
      email,
      password: hashedPassword,
      deviceSessionKey: newSessionKey,
      sessionExpiresAt: expiresAt,
      role: 'STUDENT' // default role
    });

    await user.save();
    
    issueTokenAndCookie(res, user, newSessionKey);

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// @route   POST /api/auth/login
// @desc    Login with email/username and password
router.post('/login', async (req, res) => {
  const { identifier, password } = req.body; // identifier can be email or username

  if (!identifier || !password) {
    return res.status(400).json({ error: 'Please provide email/username and password' });
  }

  try {
    // Check by email or username
    let user = await User.findOne({ 
      $or: [{ email: identifier }, { username: identifier }] 
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    if (!user.password) {
      return res.status(400).json({ error: 'Please login using Google' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const newSessionKey = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    user.deviceSessionKey = newSessionKey;
    user.sessionExpiresAt = expiresAt;
    await user.save();

    issueTokenAndCookie(res, user, newSessionKey);

    res.json({
      message: 'Logged in successfully',
      user: { id: user._id, name: user.name, email: user.email, role: user.role, username: user.username }
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// @route   POST /api/auth/google
// @desc    Login/Register with Google ID Token
router.post('/google', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'No Google token provided' });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: googleId, email, name } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      // Create new user if they don't exist
      user = new User({
        name,
        email,
        googleId,
        role: 'STUDENT'
      });
    } else if (!user.googleId) {
      // Link Google account to existing email user
      user.googleId = googleId;
    }

    const newSessionKey = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    user.deviceSessionKey = newSessionKey;
    user.sessionExpiresAt = expiresAt;
    await user.save();

    issueTokenAndCookie(res, user, newSessionKey);

    res.json({
      message: 'Google login successful',
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ error: 'Server error during Google authentication' });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user and clear cookie
router.post('/logout', (req, res) => {
  res.cookie('token', '', { 
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  });
  res.json({ message: 'Logged out successfully' });
});

// Middleware to protect routes and enforce 1-device policy via JWT
const requireAuth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Check if session key matches (1-device policy check)
    if (user.deviceSessionKey !== decoded.deviceSessionKey) {
      return res.status(403).json({ 
        error: 'Session Revoked: Your account was logged into from another device.',
        code: 'DEVICE_CONFLICT'
      });
    }

    // Check expiration
    if (new Date() > user.sessionExpiresAt) {
      return res.status(403).json({
        error: 'Session Expired: Please log in again. (24hr limit reached)',
        code: 'SESSION_EXPIRED'
      });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
       return res.status(401).json({ error: 'Session Expired', code: 'SESSION_EXPIRED' });
    }
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

// @route   GET /api/auth/me
// @desc    Get current logged in user
router.get('/me', requireAuth, (req, res) => {
  res.json({
    user: { id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role, username: req.user.username }
  });
});

module.exports = { router, requireAuth };
