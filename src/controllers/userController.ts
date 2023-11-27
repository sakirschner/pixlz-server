import { FastifyReply, FastifyRequest } from 'fastify';
import { userView } from '../views/userViews';

export async function readUser(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const id = req.params.id;
  try {
    const view = await userView(id);
    if (view) {
      return reply.code(200).send(view);
    }
    return reply.code(404).send({ message: 'User could not be found' });
  } catch (error) {
    console.error(error);
    return reply.code(500).send(error);
  }
}
