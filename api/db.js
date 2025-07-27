const { Pool } = require("pg");

// Validar que las variables estén definidas y sean del tipo correcto
function validateEnvVar(name, value) {
  if (!value || typeof value !== "string") {
    throw new Error(`❌ ENV variable ${name} is missing or invalid: [${value}]`);
  }
  return value;
}

const user = validateEnvVar("PG_USER", process.env.PG_USER);
const host = validateEnvVar("PG_HOST", process.env.PG_HOST);
const database = validateEnvVar("PG_DB", process.env.PG_DB);
const password = validateEnvVar("PG_PASSWORD", process.env.PG_PASSWORD);
const port = parseInt(process.env.PG_PORT || "5432", 10);




if (isNaN(port)) {
  throw new Error(`❌ PG_PORT is invalid: [${process.env.PG_PORT}]`);
}

console.log("Environment variables validated successfully");

const pool = new Pool({
  user,
  host,
  database,
  password,
  port,
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


