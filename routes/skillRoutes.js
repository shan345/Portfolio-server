const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const protect = require('../middleware/auth');

// GET /api/skills - public
router.get('/', async (req, res) => {
    try {
        const skills = await Skill.find().sort({ order: 1 });
        res.json(skills);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/skills - protected
router.post('/', protect, async (req, res) => {
    try {
        const { name, gridSize, order } = req.body;
        const skill = await Skill.create({ name, gridSize, order });
        res.status(201).json(skill);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT /api/skills/:id - protected
router.put('/:id', protect, async (req, res) => {
    try {
        const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!skill) return res.status(404).json({ error: 'Skill not found' });
        res.json(skill);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE /api/skills/:id - protected
router.delete('/:id', protect, async (req, res) => {
    try {
        await Skill.findByIdAndDelete(req.params.id);
        res.json({ message: 'Skill deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
