import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import restoreOrReject from '../../utils/restoreOrReject';
import { RequestError } from '../../RequestError';
import { Item } from '../../db/models';

const router = Router();

router.delete(
  '/personals/:accountId(\\d+)/items/:itemId/',
  restoreOrReject,
  asyncHandler(async (req, res) => {
    const { user, params: { accountId, itemId } } = req;
    const account = user.findPersonalByPk(accountId);
    if (!account) {
      throw new RequestError(
        'Account not found',
        'An account with that ID belonging to this user does not exist.',
        404
      );
    }
    const item = Item.findByPk(itemId);
    if (!item || !account.hasItem(item) || !user.hasItem(item)) {
      throw new RequestError(
        'Transaction not found',
        'A transaction item with that ID was not found on this account',
        404
      );
    }
    try {
      await item.destroy();
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      console.error(err.toString());
      res.json({ success: false });
    }
  })
);

router.delete(
  '/communals/:accountId(\\d+)/items/:itemId/',
  restoreOrReject,
  asyncHandler(async (req, res) => {
    const { user, params: { accountId, itemId } } = req;
    const account = user.findCommunalByPk(accountId);
    if (!account) {
      throw new RequestError(
        'Account not found',
        'An account with that ID belonging to this user does not exist.',
        404
      );
    }
    const item = Item.findByPk(itemId);
    if (!item || !account.hasItem(item) || !user.hasItem(item)) {
      throw new RequestError(
        'Transaction not found',
        'A transaction item with that ID was not found on this account',
        404
      );
    }
    try {
      await item.destroy();
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      console.error(err.toString());
      res.json({ success: false });
    }
  })
);

router.post(
  '/:accountType(personals|communals)/:id(\\d+)/items/',
  restoreOrReject,
  asyncHandler(async (req, res) => {
    const { user, params: { id, accountType }, body } = req;
    const account = await user[
    `find${
      accountType.upperCaseFirst().truncateUntil(/^(Personal|Communal)$/)
    }ByPk`
    ](id);
    if (!account) {
      throw new RequestError(
        'Account not found',
        'An account with that ID belonging to this user does not exist.',
        404
      );
    }
    try {
      const item = await account.createItem({ ...body, ownerId: user.id });
      res.json({ item });
    } catch (err) {
      console.error(err);
      console.error(err.toString());
      throw new RequestError(
        'Failed to create transaction item',
        'Sorry, something went wrong. Please refresh the page and try again',
        500
      );
    }
  })
);

router.delete('/personals/:id(\\d+)/', restoreOrReject, asyncHandler(async (req, res) => {
  const { user, params: { id }, body: { password } } = req;
  if (!user.validatePass(password)) {
    throw new RequestError(
      'Invalid password',
      'The password provided was incorrect',
      401
    );
  }
  const account = await user.findPersonalByPk(id);
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
  if (!user.validatePass(password)) {
    throw new RequestError(
      'Invalid password',
      'The password provided was incorrect',
      401
    );
  }
  const account = await user.findCommunalByPk(id);
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
