const multer = require('multer');

// Use memory storage instead of disk storage
const storage = multer.memoryStorage();

exports.upload = multer({ storage });

