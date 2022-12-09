const mongoose = require("mongoose");

const { Business } = require("../models/business");

module.exports = {
  // @desc - businesses table
  // @route - /investor/dashboard
  // @access - private
  dashboard: async (req, res) => {
    let pageTitle = "Dashboard";
    let name = req.user.name;
    let email = req.user.email;

    console.log(req)
    res.render("investor/dashboard", { pageTitle, name, email });
  },

  // @desc - businesses table
  // @route - /investor/business
  // @access - private
  bussinesTable: async (req, res) => {
    let pageTitle = "Businesses";
    const allBusinesses = await Business.find();
    const bussinesCount = await Business.countDocuments();
    res.render("investor/business", {
      pageTitle,
      allBusinesses,
      bussinesCount,
    });
  },

  // LOGOUT HANDLER
  logout: (req, res) => {
    req.logOut();
    req.flash("success_msg", "You are logged out");
    res.redirect("/");
  },
};
