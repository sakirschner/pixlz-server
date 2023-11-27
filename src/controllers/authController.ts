import { createUser } from '../actions/userActions';
import User from '../models/User';
import type { LoginRequest, RegisterRequest } from '../types/schemaTypes';
import type { FastifyReply, FastifyRequest } from 'fastify';
import bcrypt from 'bcrypt';
import { UserPayload } from '../types/fastifyTypes';
import { userView } from '../views/userViews';

export async function register(
  req: FastifyRequest<{
    Body: RegisterRequest;
  }>,
  reply: FastifyReply,
) {
  const { password, email, username, firstName, lastName, phone, role } = req.body;

  // Return error if email exists in db
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return reply.code(401).send({
      message: 'User already exists with this email',
    });
  }

  try {
    // create new user if credentials pass access
    const newUser = await createUser({
      password,
      email,
      firstName,
      lastName,
      phone,
      username,
      role,
    });
    const view = await userView(newUser._id.toString());
    return reply.code(200).send(view);
  } catch (error) {
    console.error(error);
    return reply.code(500).send(error);
  }
}

export async function login(
  req: FastifyRequest<{
    Body: LoginRequest;
  }>,
  reply: FastifyReply,
) {
  const { email, password } = req.body;

  // Find existing user
  const user = await User.findOne({ email: email });
  const isMatch = Boolean(user && (await bcrypt.compare(password, user.password)));

  //return error if no match is found
  if (!user || !isMatch) {
    return reply.code(401).send({
      message: 'Invalid email or password',
    });
  }

  try {
    // Create token and set Cookie for successful login
    const tokenPayload: UserPayload = {
      id: user._id.toString(),
      email: user.email,
      username: user.username,
    };
    const token = req.jwt.sign(tokenPayload);
    reply.setCookie('access_token', token, {
      path: '/',
      httpOnly: true,
      secure: true,
    });
    return reply.code(200).send({ accessToken: token, user: tokenPayload });
  } catch (error) {
    console.error(error);
    return reply.code(500).send(error);
  }
}

export async function logout(_: FastifyRequest, reply: FastifyReply) {
  try {
    reply.clearCookie('access_token');
    return reply.send({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    return reply.code(500).send(error);
  }
}
