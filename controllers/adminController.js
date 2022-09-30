const mongoose = require("mongoose");
const passport = require("passport");
const { Admin } = require("../models/admin");
const { Business } = require("../models/business");

module.exports = {
  loginGet: (req, res) => {
    let pageTitle = "Login";
    res.render("admin/login", { pageTitle });
  },

  loginPost: (req, res, next) => {
    // console.log(req.body)
    passport.authenticate("local", {
      successRedirect: "/admin/dashboard",
      failureRedirect: "/admin/login",
      failureFlash: true,
    })(req, res, next);
  },

  dashboard: async (req, res) => {
    let pageTitle = "Dashboard";
    let name = req.user.full_name;
    let email = req.user.email;
    res.render("admin/dashboard", { pageTitle, name, email });
  },

  bussinesTable: async (req, res) => {
    let pageTitle = "Businesses";
    const allBusinesses = await Business.find();
    const bussinesCount = await Business.countDocuments();
    let name = req.user.full_name;
    let email = req.user.email;
    res.render("admin/business", {
      pageTitle,
      name,
      email,
      allBusinesses,
      bussinesCount,
    });
  },

  singleBusiness: async (req, res) => {
    let pageTitle = "Single Business";
    let id = req.params.id;
    console.log(id);
    let name = req.user.full_name;
    let email = req.user.email;
    res.render("admin/single-business", { pageTitle, name, email });
  },

  // LOGOUT HANDLER
  logout: (req, res) => {
    req.logOut();
    req.flash("success_msg", "You are logged out");
    res.redirect("/");
  },
};
