const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    education: {
        degree: { type: String, default: 'B.E - Computer Science and Engineering' },
        college: { type: String, default: 'Jerusalem College of Engineering, Chennai' }
    },
    certifications: [{
        title: { type: String },
        certId: { type: String }
    }],
    internship: {
        company: { type: String, default: 'Edify Techno Solutions' },
        role: { type: String, default: 'Full Stack Web Development (MERN)' },
        duration: { type: String, default: '1 month' }
    },
    resumeLink: { type: String, default: 'https://drive.google.com/file/d/1oxhexkyGn4tRlBuQI540a_a5JU65OMn0/view?usp=sharing' },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('About', aboutSchema);
