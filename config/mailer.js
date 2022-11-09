// require("dotenv").config();
// const nodemailer = require("nodemailer");
// const googleapis = require("googleapis");
// const OAuth2 = googleapis.google.auth.OAuth2;

// const {
//   GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET,
//   REDIRECT_URI,
//   REFRESH_TOKEN,
//   GMAIL_NAME,
// } = process.env;

// const oauth2Client = new OAuth2(
//   GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET,
//   REDIRECT_URI
// );
// oauth2Client.setCredentials({
//   refresh_token: REFRESH_TOKEN,
// });
// const accessToken = oauth2Client.getAccessToken();

// const smtpTransport = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     type: "OAuth2",
//     user: GMAIL_NAME,
//     clientId: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     refreshToken: REFRESH_TOKEN,
//     accessToken: accessToken,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// const sendEmail = async (from, to, subject, html) => {
//   return new Promise((resolve, reject) => {
//     smtpTransport.sendMail({ from, to, subject, html }, (err, info) => {
//       if (err) {
//         console.log({ err });
//         return reject(err);
//       }
//       resolve(info);
//       // console.log({ info });
//     });
//   });
// };
// module.exports = { sendEmail };
