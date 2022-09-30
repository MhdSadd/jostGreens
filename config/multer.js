const multer = require("multer");
const path = require("path");

//setting the storage engine
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Check File Type
function checkFileType(file, cb) {
  // Allowed extension format
  const filetypes = /jpeg|jpg|png|pdf/;
  // Check the extension format
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    req.flash("error", "Invalid File");
    cb("ERROR: Please upload a valid filetype");
    return res.redirect("back");
  }
}

//initialize the file uplaod
const upload = multer({
  storage: storage,

  //limits file size
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = { upload };
