const mailGen = require("mailgen");

// Configure mailgen by setting a theme and your product info
const mailGenerator = new mailGen({
  theme: "default",
  product: {
    name: "JostGreen",
    link: "https://nhubfoundation.org/",
    logo: "https://res.cloudinary.com/h2mcs/image/upload/v1660851458/do_not_delete%5BProductFiles%5D/WhatsApp_Image_2022-05-04_at_10.39.16_PM_gd4mqs.jpg",
  },
});

module.exports = { mailGenerator };
