const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const protect = require('../middleware/auth');

// GET /api/projects - public
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ order: 1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/projects - protected
router.post('/', protect, async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT /api/projects/:id - protected
router.put('/:id', protect, async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!project) return res.status(404).json({ error: 'Project not found' });
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE /api/projects/:id - protected
router.delete('/:id', protect, async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
