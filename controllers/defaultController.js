const { validatePhoneNumberSync } = require("nigeria-phone-number-validator");
const { Business } = require("../models/business");
const { passwordHash } = require("../utils/password-hasher");
const cloudinaryMediaUpload = require(".././config/cloudinary");
const { newBusinessMail } = require("../utils/mails");

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
    const {
      businessName,
      businessAddress,
      businessPhone,
      businessMail,
      password,
    } = req.body;
    res.render("default/register", {
      pageTitle,
      businessName,
      businessAddress,
      businessPhone,
      businessMail,
      password,
    });
  },

  registerPost: async (req, res) => {
    const {
      businessName,
      businessAddress,
      businessPhone,
      businessCategory,
      businessMail,
      password,
    } = req.body;

    let errors = [];

    // Checking Required Field
    if (
      !businessName ||
      !businessAddress ||
      !businessPhone ||
      !businessCategory ||
      !businessMail ||
      !password
    ) {
      errors.push({ msg: "Inavalid registration data: Check your inputs" });
    }

    const businessWithMail = await Business.findOne({ businessMail });
    if (businessWithMail) return;

    if (Object.keys(req.files).length === 0) {
      errors.push({
        msg: "Business documents are required",
      });
    }

    if (password.length !== 6) {
      errors.push({
        msg: "Password has to be atleast 6 characters long",
      });
    }

    let validatePhone = validatePhoneNumberSync(businessPhone);
    if (!validatePhone.isValid === true) {
      errors.push({ msg: "Invalid phone number" });
    }

    if (errors.length > 0) {
      let pageTitle = "Register";
      res.render("default/register", {
        pageTitle,
        businessName,
        businessAddress,
        businessPhone,
        businessMail,
        password,
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
          businessMail,
          password,
          investmentDeck: [...PitchDeckUrls],
          financialStatement: [...FinDocsUrls],
          companyProfile: [...ProfileUrls],
          incorporationDoc: [...IncopDocsUrls],
        });

        const hashPassword = await passwordHash(newBusiness.password);
        newBusiness.password = hashPassword;
        newBusiness.save();
        req.flash("success_msg", "Business successfully registered");

        newBusinessMail(businessName, businessMail);

        res.redirect("/");
      } catch (error) {
        console.log("THIS IS THE ERROR===>", error);
        req.flash(
          "error_msg",
          "Registration failed: Check your inputs and try again"
        );
        res.redirect("back");
      }
    }
  },
};
