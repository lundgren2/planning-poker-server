import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

const context = async ({ req }) => {
  try {
    const { authorization } = await req.headers;
    if (!authorization) return undefined;

    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    return {
      loggedInUser: decoded.username,
    };
  } catch (error) {
    console.log(error);
    throw new AuthenticationError('invalid token');
  }
};

export default context;
