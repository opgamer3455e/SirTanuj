const express = require('express');
const router = express.Router();
const StudyMaterial = require('../models/StudyMaterial');
const { requireAuth } = require('./auth');

// @route   GET /api/study-materials
// @desc    Get all study materials (public)
router.get('/', async (req, res) => {
  try {
    const materials = await StudyMaterial.find().sort({ createdAt: -1 });
    res.json(materials);
  } catch (error) {
    console.error('Error fetching study materials:', error);
    res.status(500).json({ error: 'Failed to fetch study materials' });
  }
});

// @route   POST /api/study-materials
// @desc    Create a study material (Teacher only)
router.post('/', requireAuth, async (req, res) => {
  try {
    if (req.user.role !== 'TEACHER' && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Teacher privileges required' });
    }

    const material = new StudyMaterial({
      ...req.body,
      createdBy: req.user._id
    });
    await material.save();
    res.status(201).json(material);
  } catch (error) {
    console.error('Error creating study material:', error);
    res.status(500).json({ error: 'Failed to create study material' });
  }
});

// @route   DELETE /api/study-materials/:id
// @desc    Delete a study material (Teacher only)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    if (req.user.role !== 'TEACHER' && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Teacher privileges required' });
    }

    await StudyMaterial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Study material deleted' });
  } catch (error) {
    console.error('Error deleting study material:', error);
    res.status(500).json({ error: 'Failed to delete study material' });
  }
});

module.exports = router;
