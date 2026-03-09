const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS - allow portfolio client and admin panel
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'https://www.shantechworld.com',
        process.env.CLIENT_URL
    ].filter(Boolean),
    credentials: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/hero', require('./routes/heroRoutes'));
app.use('/api/about', require('./routes/aboutRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/social', require('./routes/socialRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
