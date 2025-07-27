const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("../db");

const MAX_ATTEMPTS = 5;
const TABLE = `"Login_insurance"."users"`; // 🛠️ Esquema y tabla con comillas dobles para case-sensitive

const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Verificar si ya existe el usuario
    const existing = await pool.query(`SELECT * FROM ${TABLE} WHERE email = $1`, [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ message: "El usuario ya está registrado" });
    }

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // Insertar en la base de datos
    await pool.query(
      `INSERT INTO ${TABLE} (username, email, password, isVerify) VALUES ($1, $2, $3, $4)`,
      [username, email, hash, false]
    );

    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (err) {
    console.error("Error en registro:", err);
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(`SELECT * FROM ${TABLE} WHERE email = $1`, [email]);
    const user = result.rows[0];

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      await pool.query(
        `UPDATE ${TABLE} SET failed_attempts = failed_attempts + 1, last_failed_login = NOW() WHERE email = $1`,
        [email]
      );
      return res.status(401).json({ message: "Email o contraseña incorrectos" });
    }

    await pool.query(
      `UPDATE ${TABLE} SET failed_attempts = 0 WHERE email = $1`,
      [email]
    );

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true si usas HTTPS
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login exitoso" });
  } catch (err) {
    console.error("Error en login:", err);
    next(err);
  }
};

module.exports = { login, register };
