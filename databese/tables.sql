CREATE SCHEMA IF NOT EXISTS "Login_insurance";

CREATE TABLE IF NOT EXISTS "Login_insurance"."users" (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  isVerify BOOLEAN DEFAULT false,
  failed_attempts INTEGER DEFAULT 0,
  last_failed_login TIMESTAMP
);
