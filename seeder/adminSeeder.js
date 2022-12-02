require("dotenv").config();
const { Admin } = require("../models/admin");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { mongoURI } = process.env.mongoURI;
console.log(mongoURI);

// connecting to MongoDB with
mongoose
  .connect('mongodb://localhost/jostGreens')
  .then(() => {
    console.log(`DB CONNECTED SUCCESSFULLY:::`);
  })
  .catch((err) => {
    console.log(err);
  });

const admin = new Admin({
  full_name: "CHIRNAN BARDE",
  email: "info@jostgreens.com",
  phone: 09034147782,
  password: "Ash13burton",
  user_type: "Admin",
  avatar: "/images/avatarProfilePic.png",
});

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(admin.password, salt, (err, hash) => {
    if (err) {
      throw err;
    }
    admin.password = hash;
    admin
      .save()
      .then(() => {
        console.log(admin);
        console.log("admin save successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
