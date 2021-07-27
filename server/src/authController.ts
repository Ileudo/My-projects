import { Users } from './models/user';
import jwt from 'jsonwebtoken';

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id: string) => {
  return jwt.sign({ id }, 'secret key', {
    expiresIn: maxAge,
  });
};

class AuthController {
  async login(req, res) {
    try {
      const { username, password } = req.body;

      const user = await Users.findOne({ username });
      if (!user) return res.status(400).json({ message: `Пользователь ${username} не найден` });

      const validPassword = password === user.password;
      if (!validPassword) return res.status(400).json({ message: 'Введен неверный пароль' });

      const token = createToken(user._id);
      res.cookie('jwt', token, { maxAge: maxAge * 1000, sameSite: 'none', secure: true });
      res.status(200).json({ user: user._id });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Login Error' });
    }
  }
}

export const authController = new AuthController();
