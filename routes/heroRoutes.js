const express = require('express');
const router = express.Router();
const Hero = require('../models/Hero');
const protect = require('../middleware/auth');

// GET /api/hero - public
router.get('/', async (req, res) => {
    try {
        let hero = await Hero.findOne();
        if (!hero) hero = await Hero.create({});
        res.json(hero);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT /api/hero - protected
router.put('/', protect, async (req, res) => {
    try {
        let hero = await Hero.findOne();
        if (!hero) hero = new Hero();
        const { greeting, typewriterStrings, resumeLink } = req.body;
        if (greeting !== undefined) hero.greeting = greeting;
        if (typewriterStrings !== undefined) hero.typewriterStrings = typewriterStrings;
        if (resumeLink !== undefined) hero.resumeLink = resumeLink;
        hero.updatedAt = Date.now();
        await hero.save();
        res.json(hero);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
