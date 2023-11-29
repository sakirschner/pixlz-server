import { FastifyInstance } from 'fastify';
import { SERVER_PORT, SERVER_HOSTNAME } from './configs/app.config';

async function runServer(app: FastifyInstance) {
  try {
    await app.listen({
      port: SERVER_PORT,
      host: SERVER_HOSTNAME,
    });
    console.info(`Server listening at ${SERVER_HOSTNAME}:${SERVER_PORT}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

export default runServer;
