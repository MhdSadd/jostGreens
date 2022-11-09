const router = require("express").Router();
const {
  loginGet,
  loginPost,
  dashboard,
  bussinesTable,
  investorsTable,
  accepBusiness,
  addInvestor,
  logout,
} = require("../controllers/adminController");
const { verifyPermission } = require("../config/auth");

router.route("/login").get(loginGet).post(loginPost);

router.get("/dashboard", verifyPermission, dashboard);
router.get("/business", verifyPermission, bussinesTable);
router.get("/password", verifyPermission, investorsTable);
router.post("/addinvestor", verifyPermission, addInvestor);

router.get("/acceptbuss/:id", verifyPermission, accepBusiness);

router.get("/logout", logout);

module.exports = router;
