import { FastifyInstance } from 'fastify';
import { readUser } from '../controllers/userController';
import { userSchemasRef } from '../schemas';

export async function userRouter(app: FastifyInstance) {
  app.get(
    '/:id',
    {
      preHandler: [app.authenticate],
      schema: {
        params: userSchemasRef('readUserRequestSchema'),
        response: {
          200: userSchemasRef('readUserResponseSchema'),
        },
      },
    },
    readUser
  );
}
