import { Request, Response } from 'express';
import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

    // Comparar contraseñas directamente (texto plano)
    if ((user as any).password !== password) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Crear token JWT
    const token = jwt.sign(
      { id: (user as any).id, role: (user as any).role },
      process.env.JWT_SECRET || '',
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: (user as any).id,
        role: (user as any).role,
        name: (user as any).name
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};
