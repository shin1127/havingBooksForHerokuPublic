const multer = require("multer");

const multerDiskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../static/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

module.exports.multerDiskStorage = multerDiskStorage;
