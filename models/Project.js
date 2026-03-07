const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, default: '' },
    overview: { type: String, default: '' },
    techStack: { type: String, default: '' },
    liveUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    order: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
