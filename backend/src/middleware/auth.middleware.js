import usermodel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

const protectRoute = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) return res.status(400).json({ error: error.array() });

  try {
    const authHeader = req.headers.authorization;
    const token = req.cookies.token || (authHeader && authHeader.split(' ')[1]);

    if (!token) {
      return res.status(401).send('Unauthorized: You have no login access right now');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await usermodel.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'Unauthorized: User not found' });

    req.user = user;
    next();
  } catch (err) {
    console.error('Auth error:', err.message);
    res.status(401).send('Unauthorized: ' + err.message);
  }
};

export default protectRoute