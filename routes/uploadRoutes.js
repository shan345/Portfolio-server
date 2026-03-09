const express = require('express');
const router = express.Router();
const { upload, cloudinary } = require('../config/cloudinary');
const protect = require('../middleware/auth');

// POST /api/upload — protected, single image upload
router.post('/', protect, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file provided' });
        res.json({
            url: req.file.path,
            public_id: req.file.filename
        });
    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({ error: 'Upload failed' });
    }
});

// DELETE /api/upload/:public_id — protected, delete image from Cloudinary
router.delete('/:public_id', protect, async (req, res) => {
    try {
        const publicId = decodeURIComponent(req.params.public_id);
        await cloudinary.uploader.destroy(publicId);
        res.json({ message: 'Image deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Delete failed' });
    }
});

module.exports = router;
