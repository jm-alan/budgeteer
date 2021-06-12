import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import { RequestError } from '../../RequestError';
import restoreOrReject from '../../utils/restoreOrReject';

const router = Router();

router.post('/personals/:id(\\d+)/items/', restoreOrReject, asyncHandler(async (req, res) => {
  const { user, params: { id }, body } = req;
  const account = user.getPersonalByPk(id);
  if (
    !account
  ) throw new RequestError('Account not found', 'An account with that ID belonging to this user does not exist.', 404);
  const item = account.createItem(body);
  res.json({ item });
}));

router.post('/communals/:id(\\d+)/items/', restoreOrReject, asyncHandler(async (req, res) => {
  const { user, params: { id }, body } = req;
  const account = user.getCommunalByPk(id);
  if (
    !account
  ) throw new RequestError('Account not found', 'An account with that ID belonging to this user does not exist.', 404);
  const item = account.createItem(body);
  res.json({ item });
}));

router.delete('/personals/:id(\\d+)/', restoreOrReject, asyncHandler(async (req, res) => {
  const { user, params: { id }, body: { password } } = req;
  if (
    !user.validatePass(password)
  ) throw new RequestError('Invalid password', 'The password provided was incorrect', 401);
  const account = (await user.getPersonals({ where: { id } }))[0];
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

router.delete('/communals/:id(\\d+)/', restoreOrReject, asyncHandler(async (req, res) => {
  const { user, params: { id }, body: { password } } = req;
  if (
    !user.validatePass(password)
  ) throw new RequestError('Invalid password', 'The password provided was incorrect', 401);
  const account = (await user.getCommunes({ where: { id } }))[0];
  if (!account) return res.json({ success: true });
  try {
    await user.removeCommune(account);
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
  const account = { ...(await user.createCommune(body)).dataValues, Items: [] };
  res.json({ account });
}));

export default router;
