import { Users } from '../models/user';
import jwt from 'jsonwebtoken';

export async function checkCookie(req, res, next) {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'secret key', async (err, decodedToken) => {
      if (err) {
        res.status(401).json({});
        next();
      } else {
        let user = await Users.findById(decodedToken.id);
        console.log(user);
        res.status(200).json(user);
        next();
      }
    });
  } else {
    res.status(401).json({});
    next();
  }
}

export async function removeCookie(req, res, next) {
  res.cookie('jwt', '', { maxAge: 1, sameSite: 'none', secure: true });
  res.status(200).json({});
  next();
}
