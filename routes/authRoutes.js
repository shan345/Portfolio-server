const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin || !(await admin.matchPassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, username: admin.username });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
