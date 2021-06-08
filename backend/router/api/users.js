import { Router } from 'express';
import asyncHanlder from 'express-async-handler';
import restoreOrReject from '../../utils/restoreOrReject';

const router = Router();

router.get('/me/personals/', restoreOrReject, asyncHanlder(async (req, res, next) => {
  const { user } = req;
  const accounts = await user.getPersonals();
  res.json({ accounts });
}));

export default router;
