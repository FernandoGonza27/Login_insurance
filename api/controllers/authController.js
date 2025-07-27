const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("../db");

const MAX_ATTEMPTS = 5;

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];

    if (!user) return res.status(404).json({ message: "Usuario no registrado" });

    if (user.failed_attempts >= MAX_ATTEMPTS) {
      return res.status(403).json({ message: "Cuenta bloqueada por múltiples intentos fallidos" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      await pool.query(
        "UPDATE users SET failed_attempts = failed_attempts + 1, last_failed_login = NOW() WHERE email = $1",
        [email]
      );
      return res.status(401).json({ message: "Email o contraseña incorrectos" });
    }

    // Resetear intentos fallidos
    await pool.query("UPDATE users SET failed_attempts = 0 WHERE email = $1", [email]);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Usuario logueado satisfactoriamente", token });
  } catch (err) {
    next(err);
  }
};

module.exports = { login };
