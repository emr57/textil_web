const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: String, required: true }  // Yeni eklenen alan
});

module.exports = mongoose.model("Product", ProductSchema);
