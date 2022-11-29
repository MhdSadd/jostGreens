const { sendEmail } = require("../config/mailer");
const { mailGenerator } = require("./mail.generator");

const newInvestorMail = async (name, email, password) => {
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
          text: "Login Businesses Dashboard",
          link: "http://nhubinternship.herokuapp.com/internshipApplication",
        },
      },
      outro: "Need help, or have any question, just reply to this mail.",
    },
  };

  const html = mailGenerator.generate(mail);

  return await sendEmail(
    "jostgreens@gmail.com",
    email,
    "Investor's welcome mail",
    html
  );
};

module.exports = { newInvestorMail };
