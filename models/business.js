const mongoose = require("mongoose");
const { Schema } = mongoose;

const businessSchema = new Schema(
  {
    businessName: {
      type: String,
      required: true,
    },
    businessAddress: {
      type: String,
      required: true,
    },
    businessPhone: {
      type: String,
      required: true,
    },
    businessMail: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    progress: {
      type: Number,
      default: 50,
    },
    investmentDeck: {
      type: [],
      required: true,
    },
    financialStatement: {
      type: [],
      required: true,
    },
    companyProfile: {
      type: [],
      required: true,
    },
    incorporationDoc: {
      type: [],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = { Business: mongoose.model("business", businessSchema) };
