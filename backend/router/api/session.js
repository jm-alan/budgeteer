import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import setToken from '../../utils/setToken';
import restoreUser from '../../utils/restoreUser';
import { User } from '../../db/models';

const router = Router();

router.delete('/', (_req, res) => {
  res.clearCookie('token').status(200).json({});
});

router.post('/', asyncHandler(async (req, res) => {
  const { body: { identification, password } } = req;
  const user = await User.LogIn(identification, password);
  if (user) setToken(res, user.id);
  res.json({ user });
}));

router.get('/', restoreUser, (req, res) => {
  const user = req.user && req.user.info;
  res.json({ user });
});

export default router;
