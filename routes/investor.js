const router = require("express").Router();
const {
  dashboard,
  bussinesTable,
  logout,
} = require("../controllers/investorController");
const { verifyInvestorPermission } = require("../config/auth");

router.get("/dashboard", verifyInvestorPermission, dashboard);
router.get("/business", verifyInvestorPermission, bussinesTable);

router.get("/logout", logout);

module.exports = router;
