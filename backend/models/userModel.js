const mongoose = require("mongoose");
const validator = require("validator");

//library hash รหัส
const bcrypt = require("bcryptjs");

//library JWT
const jwt = require("jsonwebtoken");

//library Resset Password
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  identification: {
    type: String,
    required: [true, "Please Enter Your Identification"],
    trim: true,
    unique: true,
    maxLength: [13, "Identification cannot exceed 30 characters"],
    minLength: [13, "Identification should have more than 4 characters"],
  },
  titlename: {
    type: String,
    required: [true, "Please Enter Your TitleName"],
  },
  firstname: {
    type: String,
    required: [true, "Please Enter Your Firstname"],
    maxLength: [30, "Firstname cannot exceed 30 characters"],
    minLength: [4, "Firstname should have more than 4 characters"],
  },
  lastname: {
    type: String,
    required: [true, "Please Enter Your Lasttname"],
    maxLength: [30, "Lasttname cannot exceed 30 characters"],
    minLength: [4, "Lasttname should have more than 4 characters"],
  },
  phone: {
    type: String,
    required: [true, "Please Enter Your Phone"],
    maxLength: [10, "Phone cannot exceed 10 characters"],
    minLength: [10, "Phone should have more than 4 characters"],
  },
  jobtitle: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
  },
  createyear: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
