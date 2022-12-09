const { User } = require("../models/admin");

module.exports = {
  // desc - admin login
  // access - PRIVATE
  verifyPermission: (req, res, next) => {
    let isAdmin = req.user.isAdmin;
    if (req.isAuthenticated() && isAdmin === true) {
      return next();
    } else {
      req.flash("error_msg", "Admin Prevelages Required To View Resource");
      res.redirect("/admin/login");
    }
  },

  // desc - investor login
  // access - PRIVATE
  verifyInvestorPermission: (req, res, next) => {
    let isInvestor = req.user.isAdmin;

    if (req.isAuthenticated() && isInvestor === false) {
      return next();
    } else {
      req.flash("error_msg", "Investor Prevelages Required To View Resource");
      res.redirect("/admin/login");
    }
  },
};
