import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

// ======= Register ========== //

export const registerRequestSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string().min(6),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  role: z.number(),
});

// ======= Login ========== //

export const loginRequestSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  password: z.string().min(6),
});

export const loginResponseSchema = z.object({
  accessToken: z.string(),
});

// ===== Build Schemas ======= //

export const { schemas: authSchemas, $ref: authSchemasRef } = buildJsonSchemas(
  {
    registerRequestSchema,
    loginRequestSchema,
    loginResponseSchema,
  },
  { $id: 'authSchemas' },
);
