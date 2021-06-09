import { Router } from 'express';
import asyncHanlder from 'express-async-handler';

import restoreOrReject from '../../utils/restoreOrReject';
import createToken from '../../utils/createToken';
import { User } from '../../db/models';
import { environment, jwtConfig } from '../../config';

const router = Router();

router.post('/', asyncHanlder(async (req, res) => {
  const { body } = req;
  const user = await User.SignUp(body);
  const token = createToken(user.id);
  const isProduction = environment === 'production';
  const cookieOptions = {
    maxAge: jwtConfig.expiresIn * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && 'Lax'
  };
  res.cookie('token', token, cookieOptions);
  res.json({ user });
}));

router.get('/me/personals/', restoreOrReject, asyncHanlder(async (req, res) => {
  const { user } = req;
  const accounts = await user.getPersonals({
    include: ['Item']
  });
  res.json({ accounts });
}));

router.get('/me/communals/', restoreOrReject, asyncHanlder(async (req, res) => {
  const { user } = req;
  const accounts = await user.getCommunes({
    include: ['Item']
  });
  res.json({ accounts });
}));

router.get('/me/accounts/', restoreOrReject, asyncHanlder(async (req, res) => {
  const { user } = req;
  const accounts = await user.getAccounts({
    include: ['Item']
  });
  res.json({ accounts });
}));

export default router;
