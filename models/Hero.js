const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    greeting: { type: String, default: 'Hai there!' },
    typewriterStrings: { type: [String], default: ["I'm Shan", "I'm a Software Engineer"] },
    resumeLink: { type: String, default: '' },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Hero', heroSchema);
