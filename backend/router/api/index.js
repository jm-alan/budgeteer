import sessionRouter from './session';
import { Router } from 'express';
const router = Router();

router.use('/session', sessionRouter);

router.get('/csrf/restore/', (req, res) => {
  const token = req.csrfToken();
  res.cookie('XSRF-TOKEN', token);
  res.status(201).json({ token });
});

export default router;
