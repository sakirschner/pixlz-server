import { FastifyInstance } from 'fastify';
import { authSchemasRef, userSchemasRef } from '../schemas';
import { login, logout, register } from '../controllers/authController';

export async function authRouter(app: FastifyInstance) {
  app.post(
    '/register',
    {
      schema: {
        body: authSchemasRef('registerRequestSchema'),
        response: {
          200: userSchemasRef('readUserResponseSchema'),
        },
      },
    },
    register
  );

  app.post(
    '/login',
    {
      schema: {
        body: authSchemasRef('loginRequestSchema'),
        response: {
          200: authSchemasRef('loginResponseSchema'),
        },
      },
    },
    login
  );

  app.delete('/logout', { preHandler: [app.authenticate] }, logout);
}
