const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gridSize: { type: Number, default: 6 },
    order: { type: Number, default: 0 }
});

module.exports = mongoose.model('Skill', skillSchema);
