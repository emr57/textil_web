const User = require("../models/User");

// Şifresiz hashleme ile kullanıcı kaydı
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "Kullanıcı zaten mevcut." });
    }

    const newUser = new User({
      username,
      email,
      password, // HASHLEME YOK
    });

    await newUser.save();

    res.status(201).json({ message: "Kayıt başarılı", user: { username, email } });
  } catch (error) {
    console.error("Kayıt hatası:", error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

// Şifresiz giriş kontrolü
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "E-posta bulunamadı" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Şifre yanlış" });
    }

    res.status(200).json({ message: "Giriş başarılı", user: { username: user.username, email: user.email } });
  } catch (error) {
    console.error("Giriş hatası:", error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

module.exports = {
  registerUser,
  loginUser
};
