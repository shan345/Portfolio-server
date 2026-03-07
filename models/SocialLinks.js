const mongoose = require('mongoose');

const socialLinksSchema = new mongoose.Schema({
    instagram: { type: String, default: 'https://www.instagram.com/jamnishan/' },
    github: { type: String, default: 'https://github.com/shan345' },
    linkedin: { type: String, default: 'https://www.linkedin.com/in/shan345/' },
    youtube: { type: String, default: 'https://www.youtube.com/@shantechworld' },
    twitter: { type: String, default: 'https://twitter.com/jamnishan' },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SocialLinks', socialLinksSchema);
