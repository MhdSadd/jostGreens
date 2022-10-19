const mongoose = require("mongoose");
const { Schema } = mongoose;

const passwordSchema = new Schema(
  {
    mail: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = { Password: mongoose.model("password", passwordSchema) };
