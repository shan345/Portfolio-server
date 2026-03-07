const express = require('express');
const router = express.Router();
const SocialLinks = require('../models/SocialLinks');
const protect = require('../middleware/auth');

// GET /api/social - public
router.get('/', async (req, res) => {
    try {
        let social = await SocialLinks.findOne();
        if (!social) social = await SocialLinks.create({});
        res.json(social);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT /api/social - protected
router.put('/', protect, async (req, res) => {
    try {
        let social = await SocialLinks.findOne();
        if (!social) social = new SocialLinks();
        const { instagram, github, linkedin, youtube, twitter } = req.body;
        if (instagram !== undefined) social.instagram = instagram;
        if (github !== undefined) social.github = github;
        if (linkedin !== undefined) social.linkedin = linkedin;
        if (youtube !== undefined) social.youtube = youtube;
        if (twitter !== undefined) social.twitter = twitter;
        social.updatedAt = Date.now();
        await social.save();
        res.json(social);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
