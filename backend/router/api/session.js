import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import createToken from '../../utils/createToken';
import restoreUser from '../../utils/restoreUser';
import { User } from '../../db/models';
import { environment, jwtConfig } from '../../config';

const router = Router();

router.delete('/', (_req, res) => {
  res.clearCookie('token').status(200).json({});
});

router.post('/', asyncHandler(async (req, res) => {
  const { body: { identification, password } } = req;
  const user = await User.LogIn({ identification, password });
  const token = user && createToken(user.id);
  const isProduction = environment === 'production';
  const cookieOptions = {
    maxAge: jwtConfig.expiresIn * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && 'Lax'
  };
  token && res.cookie('token', token, cookieOptions);
  res.json({ user });
}));

router.get('/', restoreUser, (req, res) => {
  const user = req.user && req.user.info;
  res.json({ user });
});

export default router;
