import sessionRouter from './session';
import userRouter from './users';
import accountsRouter from './accounts';
import { Router } from 'express';
const router = Router();

router.use('/session', sessionRouter);
router.use('/users', userRouter);
router.use('/accounts', accountsRouter);

router.get('/csrf/restore/', (req, res) => {
  const token = req.csrfToken();
  res.cookie('XSRF-TOKEN', token);
  res.status(201).json({ token });
});

export default router;
