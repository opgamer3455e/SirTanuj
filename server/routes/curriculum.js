const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { requireAuth } = require('./auth');

// Middleware to ensure user is a TEACHER
const requireTeacher = (req, res, next) => {
  if (req.user.role !== 'TEACHER') {
    return res.status(403).json({ error: 'Access denied: Teacher privileges required' });
  }
  next();
};

// @route   GET /api/curriculum/courses
// @desc    Get all published courses (Student View) or all courses (Teacher View)
router.get('/courses', requireAuth, async (req, res) => {
  try {
    const filter = req.user.role === 'TEACHER' ? {} : { isPublished: true };
    const courses = await Course.find(filter).populate('instructorId', 'email');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// @route   POST /api/curriculum/courses
// @desc    Create a new course (Teacher Only)
router.post('/courses', requireAuth, requireTeacher, async (req, res) => {
  try {
    const newCourse = new Course({
      ...req.body,
      instructorId: req.user._id
    });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create course' });
  }
});

// @route   PUT /api/curriculum/courses/:id
// @desc    Update course (modules, drip settings, theme)
router.put('/courses/:id', requireAuth, requireTeacher, async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update course' });
  }
});

module.exports = router;
