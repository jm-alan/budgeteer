export default function (req, _res, next) {
  if (req.user) return next();

  const err = new Error('Unauthorized');
  err.status = 401;
  next(err);
}
