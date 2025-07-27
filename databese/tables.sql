CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- esta estará encriptada
    failed_attempts INTEGER DEFAULT 0,
    last_failed_login TIMESTAMP
);
