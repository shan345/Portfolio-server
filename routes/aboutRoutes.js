const express = require('express');
const router = express.Router();
const About = require('../models/About');
const protect = require('../middleware/auth');

// GET /api/about - public
router.get('/', async (req, res) => {
    try {
        let about = await About.findOne();
        if (!about) about = await About.create({});
        res.json(about);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT /api/about - protected
router.put('/', protect, async (req, res) => {
    try {
        let about = await About.findOne();
        if (!about) about = new About();
        const { education, certifications, experiences, resumeLink } = req.body;
        if (education) about.education = education;
        if (certifications) about.certifications = certifications;
        if (experiences !== undefined) about.experiences = experiences;
        if (resumeLink !== undefined) about.resumeLink = resumeLink;
        about.updatedAt = Date.now();
        await about.save();
        res.json(about);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
