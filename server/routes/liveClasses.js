const express = require('express');
const router = express.Router();
const LiveClass = require('../models/LiveClass');
const { requireAuth } = require('./auth');

// Create a new live class (Teacher only)
router.post('/', requireAuth, async (req, res) => {
  try {
    if (req.user.role !== 'TEACHER' && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Only teachers can create classes' });
    }

    const { title, description, roomId, scheduledFor } = req.body;

    if (!title || !roomId) {
      return res.status(400).json({ error: 'Title and Room ID are required' });
    }

    const liveClass = await LiveClass.create({
      title,
      description: description || '',
      roomId,
      status: 'SCHEDULED',
      scheduledFor: scheduledFor || new Date(),
      teacher: req.user._id,
      teacherName: req.user.name || req.user.username
    });

    res.status(201).json(liveClass);
  } catch (err) {
    console.error('Error creating live class:', err);
    res.status(500).json({ error: 'Failed to create live class' });
  }
});

// Get all live classes (public — students can see them)
router.get('/', async (req, res) => {
  try {
    const classes = await LiveClass.find()
      .sort({ scheduledFor: -1 })
      .limit(50);
    res.json(classes);
  } catch (err) {
    console.error('Error fetching live classes:', err);
    res.status(500).json({ error: 'Failed to fetch live classes' });
  }
});

// Update class status (Teacher only)
router.patch('/:id/status', requireAuth, async (req, res) => {
  try {
    if (req.user.role !== 'TEACHER' && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Only teachers can update class status' });
    }

    const { status } = req.body;
    if (!['SCHEDULED', 'LIVE', 'COMPLETED'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const updated = await LiveClass.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Class not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error('Error updating class status:', err);
    res.status(500).json({ error: 'Failed to update class status' });
  }
});

// Delete a class (Teacher only)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    if (req.user.role !== 'TEACHER' && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Only teachers can delete classes' });
    }

    await LiveClass.findByIdAndDelete(req.params.id);
    res.json({ message: 'Class deleted' });
  } catch (err) {
    console.error('Error deleting class:', err);
    res.status(500).json({ error: 'Failed to delete class' });
  }
});

module.exports = router;
