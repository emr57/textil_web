const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Tüm ürünleri getir
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    console.log("veriler alindi")
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

module.exports = router;
