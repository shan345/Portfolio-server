const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const protect = require('../middleware/auth');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.mailID,
        pass: process.env.pass
    }
});

// POST /api/contact - public (save to DB + send email)
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const contact = await Contact.create({ name, email, message });
        // Also send email notification
        try {
            await transporter.sendMail({
                to: process.env.mailID || 'jamnishan345@gmail.com',
                subject: `New Portfolio Message from ${name}`,
                text: `Sender's Email: ${email}\nMessage: ${message}`
            });
        } catch (emailErr) {
            console.error('Email send failed:', emailErr.message);
        }
        res.status(201).json({ message: 'Message sent successfully', contact });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save message' });
    }
});

// GET /api/contacts - protected (admin inbox)
router.get('/', protect, async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ receivedAt: -1 });
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT /api/contacts/:id/read - protected
router.put('/:id/read', protect, async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
        res.json(contact);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE /api/contacts/:id - protected
router.delete('/:id', protect, async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ message: 'Message deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
