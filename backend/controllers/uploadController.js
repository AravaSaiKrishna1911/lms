const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads';
        // Create uploads directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Generate unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Configure multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: function (req, file, cb) {
        // Accept images and videos only
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|mp4|mov|avi)$/)) {
            return cb(new Error('Only image and video files are allowed!'), false);
        }
        cb(null, true);
    }
});

// Handle file upload
exports.uploadFile = async (req, res) => {
    try {
        const type = req.params.type; // 'thumbnail' or 'video'
        
        // Use multer to handle the upload
        upload.single('file')(req, res, function(err) {
            if (err) {
                console.error('Upload error:', err);
                return res.status(400).json({ message: err.message });
            }

            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            // Return the file URL
            const fileUrl = `/uploads/${req.file.filename}`;
            res.json({ url: fileUrl });
        });
    } catch (error) {
        console.error('Error in uploadFile:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}; 