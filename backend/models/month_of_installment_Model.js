const mongoose = require("mongoose");

const monthSchema = new mongoose.Schema({
  month: {
    type: String,
    required: [true, "Please Enter Month"],
    minLength: [4, "Month cannot exceed 4 characters"], 
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

module.exports = mongoose.model("Month", monthSchema);
