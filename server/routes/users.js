const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/loginn", async (req, res) => {
  const { email, password } = req.body;
  console.log("login middleware");
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Kullanıcı bulunamadı" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Hatalı şifre" });
    }

    res.status(200).json({
      message: "Giriş başarılı",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası", details: err });
  }
});

module.exports = router;
