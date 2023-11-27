import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

// ======= Read User ========== //

export const readUserRequestSchema = z.object({
  id: z.string(),
});

export const readUserResponseSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  role: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
});

// ===== Build Schemas ======= //

export const { schemas: userSchemas, $ref: userSchemasRef } = buildJsonSchemas(
  {
    readUserRequestSchema,
    readUserResponseSchema,
  },
  { $id: 'userSchemas' },
);
