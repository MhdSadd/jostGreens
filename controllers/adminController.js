const mongoose = require("mongoose");
const passport = require("passport");
const bcrypt = require("bcrypt");
const randomstring = require("randomstring");
const { Business } = require("../models/business");
const { passwordHash } = require("../utils/password-hasher");
const { newInvestorMail } = require("../utils/mails");
const { User } = require("../models/admin");

module.exports = {
  loginGet: (req, res) => {
    let pageTitle = "Login";
    res.render("admin/login", { pageTitle });
  },

  loginPost: async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    const isUserAdmin = user.isAdmin;

    passport.authenticate("local", {
      successRedirect: `${
        isUserAdmin ? "/admin/dashboard" : "/investor/dashboard"
      }`,
      failureRedirect: "/admin/login",
      failureFlash: true,
    })(req, res, next);
  },

  dashboard: async (req, res) => {
    let pageTitle = "Dashboard";
    let name = req.user.name;
    let email = req.user.email;

    res.render("admin/dashboard", { pageTitle, name, email });
  },

  bussinesTable: async (req, res) => {
    let pageTitle = "Businesses";
    const allBusinesses = await Business.find();
    const bussinesCount = await Business.countDocuments();
    let name = req.user.name;
    let email = req.user.email;
    res.render("admin/business", {
      pageTitle,
      name,
      email,
      allBusinesses,
      bussinesCount,
    });
  },

  investorsTable: async (req, res) => {
    let pageTitle = "Passwords";
    const allInvestors = await User.find({
      isAdmin: false,
    });
    const InvestorsCount = await User.countDocuments({
      isAdmin: false,
    });
    let name = req.user.name;
    let email = req.user.email;
    res.render("admin/investors", {
      pageTitle,
      name,
      email,
      allInvestors,
      InvestorsCount,
    });
  },

  addInvestor: async (req, res) => {
    const { email, name } = req.body;
    const isInvestor = await User.findOne({ email });

    if (isInvestor && isInvestor.isAdmin === false) {
      console.log("this investor already exists");
      req.flash("success_msg", "this investor already exists");
    } else {
      const password = randomstring.generate({
        length: 6,
        charset: "alphabetic",
      });

      const hashPassword = await passwordHash(password);

      const newInvestor = new User({
        email,
        password: hashPassword,
        name,
      });

      try {
        await newInvestor.save();

        req.flash("success_msg", "New investor created successfully");

        newInvestorMail(name, email, password);

        res.redirect("/admin/password");
      } catch (error) {
        req.flash("error_msg", "error creating new investor " + error);
        res.redirect("/admin/password");
      }
    }
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
