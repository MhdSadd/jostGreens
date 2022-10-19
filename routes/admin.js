const router = require("express").Router();
const {
  loginGet,
  loginPost,
  dashboard,
  bussinesTable,
  passwordsTable,
  singleBusiness,
  accepBusiness,
  logout,
} = require("../controllers/adminController");
const { verifyPermission } = require("../config/auth");

router.route("/login").get(loginGet).post(loginPost);

router.get("/dashboard", verifyPermission, dashboard);
router.get("/business", verifyPermission, bussinesTable);
router.get("/password", verifyPermission, passwordsTable);
router.get("/single-business/:id", verifyPermission, singleBusiness);

router.get("/acceptbuss/:id", verifyPermission, accepBusiness);

router.get("/logout", logout);

module.exports = router;
