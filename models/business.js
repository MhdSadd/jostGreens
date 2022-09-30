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
    businessCategory: {
      type: String,
      required: true,
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
