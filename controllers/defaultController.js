const { validatePhoneNumberSync } = require("nigeria-phone-number-validator");
const { Business } = require("../models/business");
const cloudinaryMediaUpload = require(".././config/cloudinary");

module.exports = {
  indexGet: (req, res) => {
    let pageTitle = "Home";
    res.render("default/index", { pageTitle });
  },

  aboutGet: (req, res) => {
    let pageTitle = "About";
    res.render("default/about", { pageTitle });
  },

  contactGet: (req, res) => {
    let pageTitle = "Contact";
    res.render("default/contact", { pageTitle });
  },

  registerGet: (req, res) => {
    let pageTitle = "Register";
    const { businessName, businessAddress, businessPhone } = req.body;
    res.render("default/register", {
      pageTitle,
      businessName,
      businessAddress,
      businessPhone,
    });
  },

  registerPost: async (req, res) => {
    const { businessName, businessAddress, businessPhone, businessCategory } =
      req.body;
    let errors = [];
    // Checking Required Field
    if (
      !businessName ||
      !businessAddress ||
      !businessPhone ||
      !businessCategory
    ) {
      errors.push({ msg: "Inavalid registration data: Check your inputs" });
      req.flash("error_msg", "Inavalid registration data: Check your inputs");
      res.redirect("back");
      return;
    }
    if (!req.files) return req.flash("error", "All fields are required");

    let validatePhone = validatePhoneNumberSync(businessPhone);
    if (!validatePhone.isValid === true) {
      errors.push({ msg: "Invalid phone number" });
      req.flash("error_msg", "Invalid phone number");
    }

    if (errors.length > 0) {
      let pageTitle = "Register";
      res.render("default/register", {
        pageTitle,
        businessName,
        businessAddress,
        businessPhone,
        errors,
      });
    } else {
      try {
        // uploading files to cloud
        const uploader = async (path) =>
          await cloudinaryMediaUpload(path, "BussFiles");
        const IncopDocsUrls = [];
        const ProfileUrls = [];
        const FinDocsUrls = [];
        const PitchDeckUrls = [];
        const files = req.files;
        for (const file of files.IncopDocs) {
          const { path } = file;
          const cloudPath = await uploader(path);
          IncopDocsUrls.push(cloudPath);
        }

        for (const file of files.Profile) {
          const { path } = file;
          const cloudPath = await uploader(path);
          ProfileUrls.push(cloudPath);
        }

        for (const file of files.FinDocs) {
          const { path } = file;
          const cloudPath = await uploader(path);
          FinDocsUrls.push(cloudPath);
        }

        for (const file of files.PitchDeck) {
          const { path } = file;
          const cloudPath = await uploader(path);
          PitchDeckUrls.push(cloudPath);
        }

        const newBusiness = new Business({
          businessName,
          businessAddress,
          businessPhone,
          businessCategory,
          investmentDeck: [...PitchDeckUrls],
          financialStatement: [...FinDocsUrls],
          companyProfile: [...ProfileUrls],
          incorporationDoc: [...IncopDocsUrls],
        });
        newBusiness.save();
        req.flash("success_msg", "Business successfully registered");
        res.redirect("/");
      } catch (error) {
        console.log("THIS IS THE ERROR===>", error);
        req.flash(
          "error_msg",
          "Registration failed: Check your inputs and try again"
        );
        res.redirect("back");
        return;
      }
    }
  },
};
