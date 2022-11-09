const mongoose = require("mongoose");
const { Schema } = mongoose;

const investorSchema = new Schema(
  {
    mail: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = { Investor: mongoose.model("investor", investorSchema) };
