const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const mongooose = require("mongoose");
const bcrypt = require("bcrypt");
const { User } = require("../models/admin");

module.exports = (passport) => {
  passport.use(
    "local",
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      (email, password, done) => {
        const isUser = User.findOne({
          $or: [{ email: email }, { isAdmin: false }],
        });
        const isAdmin = User.findOne({
          $or: [{ email: email }, { isAdmin: true }],
        });

        if (isUser) {
          isUser
            .then((user) => {
              bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                  return done(null, user);
                } else {
                  return done(null, false, { message: "Password incorrect" });
                }
              });
            })
            .catch((err) => console.log(err));
        } else {
          isAdmin
            .then((user) => {
              if (!user) {
                return done(null, false, { message: "Password incorrect" });
              } else {
                console.log(user);
                bcrypt.compare(password, user.password, (err, isMatch) => {
                  if (err) throw err;
                  if (isMatch) {
                    return done(null, user);
                  } else {
                    return done(null, false, { message: "Password incorrect" });
                  }
                });
              }
            })
            .catch((err) => console.log(err));
        }
      }
    )
  );

  // SERIALIZE AND DESERIALIZE  user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // PASSPORT DESERIALIZER
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
