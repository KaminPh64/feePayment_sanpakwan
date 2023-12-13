const mongoose = require("mongoose");

const yearSchema = new mongoose.Schema({
  year: {
    type: String,
    required: [true, "Please Enter Year"],
    minLength: [4, "Year cannot exceed 4 characters"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Year", yearSchema);
