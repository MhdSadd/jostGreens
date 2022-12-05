const mailGen = require("mailgen");

// Configure mailgen by setting a theme and your product info
const mailGenerator = new mailGen({
  theme: "default",
  product: {
    name: "JostGreen",
    link: "http://jostgreen.onrender.com/",
    logo: "",
  },
});

module.exports = { mailGenerator };
