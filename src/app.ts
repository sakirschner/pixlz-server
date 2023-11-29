import Fastify from 'fastify';
import cookie from '@fastify/cookie';
import { appSchemas } from './schemas';
import cors from '@fastify/cors';
import fjwt, { FastifyJWT } from '@fastify/jwt';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { router } from './routers';
import * as config from './configs/app.config';
import dbConnection from './db';
import runServer from './server';

// Instantiate Fastify
const app = Fastify({ logger: config.LOGGING });

// Health Check Route
app.get('/healthcheck', (_, res) => {
  res.send({ message: 'Success' });
});

// Add JSON Schemas to validate requests
for (let schema of [...appSchemas]) {
  app.addSchema(schema);
}

// jwt
app.register(fjwt, { secret: config.ENCRYPTION_KEY || '' });
app.addHook('preHandler', (req, _, next) => {
  req.jwt = app.jwt;
  return next();
});
app.decorate('authenticate', async (req: FastifyRequest, reply: FastifyReply) => {
  const token = req.cookies.access_token;
  if (!token) {
    return reply.status(401).send({ message: 'Authentication required' });
  }

  const decoded = req.jwt.verify<FastifyJWT['user']>(token);
  req.user = decoded;
});

// Cookies
app.register(cookie, {
  secret: config.COOKIE_KEY,
  hook: 'preHandler',
  parseOptions: { httpOnly: true },
});

// Cors
app.register(cors, {
  origin: config.CLIENT_ORIGIN,
});

// Routes
app.register(router, { prefix: 'api/v1' });

// graceful shutdown
const listeners = ['SIGINT', 'SIGTERM'];
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await app.close();
    process.exit(0);
  });
});

// ====== Run App ====== //

async function main() {
  await runServer(app);
  await dbConnection();
}

main();
