import express, { Express, NextFunction } from 'express';
import { ValidationError } from 'sequelize';
import morgan from 'morgan';
import cors from 'cors';
import csurf from 'csurf';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import router from './router';
import { RequestError, ExtendedValidationError } from './RequestError'
import { environment } from './config';

const isProduction = environment === 'production';

interface AppObject {
  [app: string]: Express
}

export default function appBuilder (apps: AppObject, port: number | string) {
  const app = express();
  apps[port] = app;
  // @ts-expect-error
  app.use(morgan('dev'));
  // @ts-expect-error
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  if (!isProduction) app.use(cors());
  app.use(helmet({
    contentSecurityPolicy: false
  }));
  // @ts-expect-error
  app.use(csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction,
      httpOnly: true
    }
  }));

  app.use(router);

  app.use((_req, _res, next: NextFunction) => {
    const err = new RequestError(
      'Resource Not Found',
      'The requested resource couldn\'t be found.',
      404
    );
    next(err);
  });

  app.use((err: RequestError | Error | ValidationError, _req, _res, next: NextFunction) => {
    if (err instanceof ValidationError) {
      const errOut = new ExtendedValidationError('Validation Error');
      errOut.errors = err.errors.map(e => e.message);
      return next(errOut);
    } else return next(err);
  });

  app.use((err: Error | RequestError | ExtendedValidationError, _req, res, _next) => {
    if (err instanceof RequestError) res.status(err.status);
    else res.status(500);
    console.error(err);
    res.json({
      title: err instanceof RequestError
        ? err.title
        : 'Server Error',
      message: (err instanceof RequestError && err.message) || null,
      errors: ((
          err instanceof RequestError ||
          err instanceof ExtendedValidationError
        ) && err.errors
      ) || null,
      stack: isProduction && err instanceof Error && err.stack
    });
  });
}
