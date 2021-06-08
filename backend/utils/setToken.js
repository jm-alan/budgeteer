import { sign } from 'jsonwebtoken';
import { jwtConfig, environment } from '../config';

const { secret, expiresIn } = jwtConfig;

export default function (res, userId) {
  const token = sign(
    { userId },
    secret,
    { expiresIn }
  );
  const isProduction = environment === 'production';
  const cookieOptions = {
    maxAge: expiresIn * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && 'Lax'
  };
  res.cookie('token', token, cookieOptions);
  return token;
}
