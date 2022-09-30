const { validatePhoneNumberSync } = require("nigeria-phone-number-validator");
const { Business } = require("../models/business");
const { cloudinaryMediaUpload } = require(".././config/cloudinary");

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

    // console.log(req.body);
    console.log(req.files);
    let errors = [];

    // Checking Required Field
    if (
      !businessName ||
      !businessAddress ||
      !businessPhone ||
      !businessCategory
    ) {
      errors.push({ msg: "All fields are required" });
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
        errors,
      });
    } else {
      Business.findOne({ businessName }).then(async (buss) => {
        if (buss) {
          errors.push({
            msg: "A business with this name is already registered",
          });
          let pageTitle = "Register";
          res.render("default/register", {
            pageTitle,
            businessName,
            businessAddress,
            businessPhone,
            errors,
          });
        } else {
          // uploading files to cloud
          const uploader = async (path) => {
            const folderName = businessName
              .trim()
              .toLowerCase()
              .replace(/^[^A-Z0-9]+/gi, function (match) {
                return arguments[2].toUpperCase();
              });

            console.log(folderName);

            await cloudinaryMediaUpload(path, "folderName");
          };
          const urls = [];
          const files = req.files;
          for (const file of files) {
            const { path } = file;
            const cloudPath = await uploader(path);
            urls.push(cloudPath);
          }

          const newBusiness = new Business({
            businessName,
            businessAddress,
            businessPhone,
            businessCategory,
          });
          newBusiness.save();
          req.flash("success_msg", "Business successfully registered");
          res.redirect("/");
        }
      });
    }
  },
};
