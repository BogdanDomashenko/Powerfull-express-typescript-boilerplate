import { createRouter } from '@lib';
import { logout, signin, signup } from './auth.controller';
import { authSchema } from './auth.schema';

const authRouter = createRouter();

/**
 * @swagger
 * /signup:
 *  post:
 *    :summary: Creates a new user
 *    :responses:
 *      200:
 *        description: The user successfully signed up
 */

authRouter.post('/signup', { schema: { body: authSchema }, handler: signup });
authRouter.post('/signin', { schema: { body: authSchema }, handler: signin });
authRouter.get('/logout', { handler: logout });

export default authRouter.initialize();
