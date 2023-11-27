import { FastifyInstance } from 'fastify';
import { authRouter } from './authRouter';
import { userRouter } from './userRouter';

export async function router(app: FastifyInstance) {
  app.register(authRouter, { prefix: '/auth' });
  app.register(userRouter, { prefix: '/users' });
}
