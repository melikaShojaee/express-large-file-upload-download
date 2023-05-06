const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Define storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../public/assets/uploads');
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

// Limit the file size to 10 GB
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 1024 * 10 }
});
router.post('/', upload.single('file'), function (req, res, next) {
    if (!req.file) {
        res.status(400).send({ message: 'No file uploaded' });
        return;
    }

    const file = req.file;
    console.log(`File ${file.originalname} uploaded successfully`);

    // Use the progress package to track upload progress
    res.status(200).send({ message: `File ${file.originalname} uploaded successfully` })
});

module.exports = router;
