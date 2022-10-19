const mongoose = require("mongoose");
const passport = require("passport");
const { Admin } = require("../models/admin");
const { Business } = require("../models/business");
const { Password } = require("../models/password");

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

  passwordsTable: async (req, res) => {
    let pageTitle = "Passwords";
    const allPasswords = await Password.find();
    const PasswordsCount = await Password.countDocuments();
    let name = req.user.full_name;
    let email = req.user.email;
    res.render("admin/investment-passwords", {
      pageTitle,
      name,
      email,
      allPasswords,
      PasswordsCount,
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

  accepBusiness: async (req, res) => {
    let id = req.params.id;
    console.log(id);
    const buss = await Business.findById(id);
    if (!buss) req.flash("error_msg", "Business not found");

    if (buss.progress === 100)
      req.flash("error_msg", "Business already accepted");

    buss.progress = 100;
    buss.save();
    req.flash("success_msg", "Business accepted");
    res.redirect("/admin/business");
  },

  // LOGOUT HANDLER
  logout: (req, res) => {
    req.logOut();
    req.flash("success_msg", "You are logged out");
    res.redirect("/");
  },
};
