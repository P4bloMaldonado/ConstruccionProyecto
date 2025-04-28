import { Request, Response } from 'express';
import { Appointment } from '../models/appointment.model';

export const createAppointment = async (req: Request, res: Response) => {
  const { title, description, date, doctorId } = req.body;
  const userId = (req as any).user.id;

  try {
    const appointment = await Appointment.create({ title, description, date, userId, doctorId });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error creando cita', error });
  }
};

export const getAppointments = async (req: Request, res: Response) => {
  const { id, role } = (req as any).user;

  try {
    let appointments;
    if (role === 'cliente') {
      appointments = await Appointment.findAll({ where: { userId: id } });
    } else if (role === 'medico') {
      appointments = await Appointment.findAll({ where: { doctorId: id } });
    } else {
      appointments = [];
    }

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo citas', error });
  }
};
