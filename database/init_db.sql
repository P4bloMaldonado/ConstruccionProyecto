-- Crear base de datos
CREATE DATABASE gestor_citas;

-- Conectarse a la nueva base de datos
\c gestor_citas;

-- Crear tabla de usuarios
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('cliente', 'medico')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de citas
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  date TIMESTAMP NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  doctor_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar usuarios de prueba
-- (Contraseñas encriptadas con bcrypt)

INSERT INTO users (name, email, password, role) VALUES
('Cliente Demo', 'cliente@example.com', '$2b$10$nOUIs5kJ7naTuTFkBy1veuEvaf1uE/7dZq5pIUKUV4SkV2YPmv7ty', 'cliente'),
('Medico Demo', 'medico@example.com', '$2b$10$nOUIs5kJ7naTuTFkBy1veuEvaf1uE/7dZq5pIUKUV4SkV2YPmv7ty', 'medico');

-- NOTA:
-- La contraseña en texto plano de ambos es: 123456
