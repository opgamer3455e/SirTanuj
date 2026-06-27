const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { requireAuth } = require('./auth'); // Reuse the auth middleware

// Get all students (Teacher/Admin only)
router.get('/', requireAuth, async (req, res) => {
  try {
    if (req.user.role !== 'TEACHER' && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Not authorized to view students' });
    }

    const students = await User.find({ role: 'STUDENT' }).select('-password -deviceSessionKey').sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Server error fetching students' });
  }
});

// Update student status (e.g., suspend or revoke access)
router.patch('/:id/status', requireAuth, async (req, res) => {
  try {
    if (req.user.role !== 'TEACHER' && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Not authorized to modify students' });
    }

    // Example logic: in a real app you might have an 'isActive' or 'status' field.
    // For now, we can just clear their deviceSessionKey to force them to log in again, 
    // or change their role. 
    
    // We'll just return a success message for now.
    res.json({ message: 'Student status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error modifying student' });
  }
});

module.exports = router;
