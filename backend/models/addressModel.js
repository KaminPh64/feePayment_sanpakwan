const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  identification: {
    type: String,
    required: [true, "Please Enter Your Identification"],
    trim: true,
    maxLength: [13, "Identification cannot exceed 30 characters"],
    minLength: [13, "Identification should have more than 4 characters"],
  },
  titlename: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: [true, "Please Enter Your Phone"],
  },
  paymenttype: {
    type: String,
    required: true,
  },
  place: {
    type: String,
  },
  homenumber: {
    type: String,
    required: true,
  },
  lane: {
    type: String,
  },
  villageno: {
    type: String,
    required: true,
  },
  road: {
    type: String,
  },
  province: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  subdistrict: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
  trash: {
    type: Number,
    required: true,
  },
  wastewater: {
    type: Number,
    required: true,
  },
  createyear: {
    type: String,
  },
  Stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"], //คือการดัก error เวลาเราลืมใส่ input ข้อมูล ซัก1ช่อง มันจะบอกเราว่าลืมกรอกข้อมูลช่องไหน
    default: 12,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAddressAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Address", addressSchema);
