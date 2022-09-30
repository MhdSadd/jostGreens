const router = require("express").Router();
const {
  indexGet,
  aboutGet,
  contactGet,
  registerGet,
  registerPost,
} = require("../controllers/defaultController");
const { upload } = require("../config/multer");

router.get("/", indexGet);
router.get("/about", aboutGet);
router.get("/contact", contactGet);

router.get("/register", registerGet);
router.post("/register", upload.array("bussFile"), registerPost);

module.exports = router;
