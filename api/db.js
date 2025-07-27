const { Pool } = require("pg");

const pool = new Pool({
  user: String(process.env.PG_USER),
  host: String(process.env.PG_HOST),
  database: String(process.env.PG_DB),
  password: String(process.env.PG_PASSWORD),
  port: parseInt(process.env.PG_PORT || "5432", 10),
});

const connect = async () => {
  try {
    await pool.connect();
    console.log("Connected to PostgreSQL");
  } catch (err) {
    console.error("PostgreSQL connection error", err);
    throw err;
  }
};

module.exports = { pool, connect };
