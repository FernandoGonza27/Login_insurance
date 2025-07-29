const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");
const { register } = require("../controllers/authController");
const { verifyToken } = require("../middleware/verifyToken ");

router.get("/welcome", verifyToken, (req, res) => {
  res.json({ message: "Usuario logueado satisfactoriamente" });
});
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "strict"
  });
  res.status(200).json({ message: "Logout exitoso" });
});

router.post("/register", register);
router.post("/login", login);

module.exports = router;
