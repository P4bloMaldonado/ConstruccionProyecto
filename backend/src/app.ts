import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './config/db.config';
import authRoutes from './routes/auth.routes';
import appointmentRoutes from './routes/appointments.routes';

dotenv.config();

const app = express();

// 🛠️ Esta línea es la clave para que funcione el body JSON:
app.use(express.json());

app.use(cors());

// Rutas principales
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

// Conexión a base de datos
sequelize.authenticate()
  .then(() => console.log('Conexión a PostgreSQL exitosa'))
  .catch(err => console.error('Error de conexión a PostgreSQL:', err));

// Inicializar servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});
