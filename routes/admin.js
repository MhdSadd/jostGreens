const router = require("express").Router();
const {
  loginGet,
  loginPost,
  dashboard,
  bussinesTable,
  singleBusiness,
  logout,
} = require("../controllers/adminController");
const { verifyPermission } = require("../config/auth");

router.route("/login").get(loginGet).post(loginPost);

router.get("/dashboard", verifyPermission, dashboard);
router.get("/business", verifyPermission, bussinesTable);
router.get("/single-business/:id", verifyPermission, singleBusiness);

router.get("/logout", logout);

module.exports = router;
