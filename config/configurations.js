module.exports = {
  mongoURI : process.env.mongoURI,
  credentials : {
    apiKey: process.env.SMS_KEY,
    // username: "AS_Muhd",
    username: "ASMuhammad"
  },
  globalVariables: (req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash('errror')
    res.locals.messages = require("express-messages")
    res.locals.user = req.user ? true : false;
    res.locals.session = req.session;

    next(); 
  },
}