const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the directory where files will be stored
const uploadDir = path.join(__dirname, 'uploads');

// Ensure the 'uploads' directory exists, if not, create it
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);  // Files will be saved in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);  // Generate a unique filename
  },
});

// File filter (accept only specific file types)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.jpg', '.jpeg', '.png', '.gif'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedTypes.includes(ext)) {
    return cb(new Error('Only JPG, JPEG, PNG, and GIF files are allowed'), false);
  }
  cb(null, true);
};

// Initialize multer with configuration
const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
