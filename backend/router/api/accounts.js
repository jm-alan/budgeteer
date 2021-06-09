import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import restoreOrReject from '../../utils/restoreOrReject';

const router = Router();

router.post('/personals/', restoreOrReject, asyncHandler(async (req, res) => {
  const { user, body } = req;
  const account = await user.createPersonal(body);
  res.json({ account });
}));

router.post('/communes/', restoreOrReject, asyncHandler(async (req, res) => {
  const { user, body } = req;
  const account = await user.createCommune(body);
  res.json({ account });
}));

export default router;
