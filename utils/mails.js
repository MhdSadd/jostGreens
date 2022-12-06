const postmark = require("postmark");
const { mailGenerator } = require("./mail.generator");
const token = process.env.serverToken;

// @desc - new investor email service
const newInvestorMail = async (name, email, password) => {
  const client = new postmark.ServerClient(token);

  const mail = {
    body: {
      name: name,
      dictionary: {
        email: email,
        password: password,
      },
      intro:
        "Welcome to jostGreens business platform, You've just be signed on as an investor",
      action: {
        instructions:
          "To get started, use above credentials to log in and view several businesses investment readiness",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Investor Dashboard",
          link: "http://jostgreen.onrender.com/admin/login",
        },
      },
      outro: "Need help, or have any question, just reply to this mail.",
    },
  };

  const html = mailGenerator.generate(mail);

  client.sendEmail({
    From: "mail.service@jostgreens.com",
    To: `${email}`,
    Subject: "JostGreen Investor's Welcome Mail",
    TextBody: `Hello ${name}`,
    HtmlBody: html,
  });
};

// @desc - new business email service
const newBusinessMail = async (businessName, businessMail) => {
  const client = new postmark.ServerClient(token);

  const mail = {
    body: {
      name: businessName,
      dictionary: {
        email: businessName,
        // password: password,
      },
      intro:
        "Welcome to jostGreens business platform, You've just be signed on as a Business on our platform!",

      outro: "Need help, or have any question, just reply to this mail.",
    },
  };

  const html = mailGenerator.generate(mail);

  client.sendEmail({
    From: "mail.service@jostgreens.com",
    To: `${businessMail}`,
    Subject: "JostGreen New Business Welcome Mail",
    TextBody: `Hello ${businessName}`,
    HtmlBody: html,
  });
};

module.exports = { newInvestorMail, newBusinessMail };
