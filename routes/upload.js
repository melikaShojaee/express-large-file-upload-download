const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const rateLimit = require('express-rate-limit');

const uploadLimit = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // 10 requests per hour
    message: 'Too many file upload requests from this IP, please try again later'
});
// Define storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const allowedTypes = ['video/mp4', 'video/avi', 'audio/wav', 'audio/mp4'];
        if (file.mimetype && allowedTypes.includes(file.mimetype)) {
            const uploadPath = path.join(__dirname, '../public/assets/uploads');
            fs.mkdirSync(uploadPath, { recursive: true });
            cb(null, uploadPath);
        } else {
            cb(new Error('Only audio and video files are allowed!'), false);
        }
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

// Limit the file size to 5 GB
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 1024 * 5 }
});
router.post('/', uploadLimit, upload.single('file'), function (req, res, next) {
    if (!req.file) {
        res.status(400).send({ message: 'No file uploaded' });
        return;
    }

    const file = req.file;
    console.log(`File ${file.originalname} uploaded successfully`);

    res.status(200).send({ message: `File ${file.originalname} uploaded successfully` })
});

module.exports = router;
