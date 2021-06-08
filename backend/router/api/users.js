import { Router } from 'express';
import asyncHanlder from 'express-async-handler';
import restoreOrReject from '../../utils/restoreOrReject';
import { User } from '../../db/models';

const router = Router();

router.post('/', asyncHanlder(async (req, res) => {
  const { body } = req;
  const user = await User.SignUp(body);
  res.json({ user });
}));

router.get('/me/personals/', restoreOrReject, asyncHanlder(async (req, res) => {
  const { user } = req;
  const accounts = await user.getPersonals();
  res.json({ accounts });
}));

export default router;
