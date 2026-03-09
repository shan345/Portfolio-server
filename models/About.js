const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    company: { type: String, default: '' },
    role: { type: String, default: '' },
    employmentType: { type: String, default: 'Full-time' },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: 'Present' },
    totalDuration: { type: String, default: '' },
    location: { type: String, default: '' },
    description: { type: String, default: '' }
}, { _id: true });

const aboutSchema = new mongoose.Schema({
    education: {
        degree: { type: String, default: 'B.E - Computer Science and Engineering' },
        college: { type: String, default: 'Jerusalem College of Engineering, Chennai' }
    },
    certifications: [{
        title: { type: String },
        certId: { type: String }
    }],
    experiences: [experienceSchema],
    resumeLink: { type: String, default: 'https://drive.google.com/file/d/1oxhexkyGn4tRlBuQI540a_a5JU65OMn0/view?usp=sharing' },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('About', aboutSchema);
