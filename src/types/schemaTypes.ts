import z from 'zod';
import {
  registerRequestSchema,
  loginRequestSchema,
} from '../schemas/auth.schema';
import {
  readUserRequestSchema,
  readUserResponseSchema,
} from '../schemas/user.schema';

// ====== Auth ====== //
export type RegisterRequest = z.infer<typeof registerRequestSchema>;
export type LoginRequest = z.infer<typeof loginRequestSchema>;

// ===== User ===== //
export type ReadUserRequest = z.infer<typeof readUserRequestSchema>;
export type UserView = z.infer<typeof readUserResponseSchema>;
