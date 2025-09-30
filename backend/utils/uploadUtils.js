const multer = require("multer");

// Use memory storage
const storage = multer.memoryStorage();

// File filter
function fileFilter(req, file, cb) {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(file.originalname.toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
}

// Multer instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
