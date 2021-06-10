import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import restoreOrReject from '../../utils/restoreOrReject';

const router = Router();

router.delete('/personals/:accountId(\\d+)/', restoreOrReject, asyncHandler(async (req, res) => {
  const { user, params: { accountId } } = req;
  const account = (await user.getPersonals()).filter(({ id }) => id === accountId)[0];
  if (!account) return res.json({ success: true });
  try {
    await account.destroy();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    console.error(err.toString());
    res.json({ success: false });
  }
}));

router.post('/personals/', restoreOrReject, asyncHandler(async (req, res) => {
  const { user, body } = req;
  const account = { ...(await user.createPersonal(body)).dataValues, Items: [] };
  res.json({ account });
}));

router.post('/communals/', restoreOrReject, asyncHandler(async (req, res) => {
  const { user, body } = req;
  const account = { ...(await user.createCommune(body)), Items: [] };
  res.json({ account });
}));

export default router;
