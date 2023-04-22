import express from 'express';
import { validate } from '@lib';
import { logout, signin, signup } from './auth.controller';
import { AuthSchema } from './auth.schema';

const authRouter = express.Router();

authRouter.post('/signup', validate('body', AuthSchema), signup);
authRouter.post('/signin', validate('body', AuthSchema), signin);
authRouter.get('/logout', logout);

export default authRouter;
