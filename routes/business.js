const router = require("express").Router();
const {
  indexGet,
  aboutGet,
  contactGet,
  registerGet,
  registerPost,
} = require("../controllers/defaultController");
const upload = require("../config/multer");

router.get("/", indexGet);
router.get("/about", aboutGet);
router.get("/contact", contactGet);

router
  .route("/register")
  .get(registerGet)
  .post(
    upload.fields([
      { name: "IncopDocs", maxCount: 4 },
      { name: "Profile", maxCount: 4 },
      { name: "FinDocs", maxCount: 4 },
      { name: "PitchDeck", maxCount: 10 },
    ]),
    registerPost
  );

module.exports = router;
