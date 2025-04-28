import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config';
import { User } from './user.model';

export const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// Relaciones
User.hasMany(Appointment, { foreignKey: 'userId', as: 'clienteAppointments' });
User.hasMany(Appointment, { foreignKey: 'doctorId', as: 'doctorAppointments' });

Appointment.belongsTo(User, { foreignKey: 'userId', as: 'cliente' });
Appointment.belongsTo(User, { foreignKey: 'doctorId', as: 'doctor' });
