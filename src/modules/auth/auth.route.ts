import express from 'express';
import { validate } from '@lib';
import { logout, signin, signup } from './auth.controller';
import { authSchema } from './auth.schema';

const authRouter = express.Router();

authRouter.post('/signup', validate('body', authSchema), signup);
authRouter.post('/signin', validate('body', authSchema), signin);
authRouter.get('/logout', logout);

export default authRouter;
