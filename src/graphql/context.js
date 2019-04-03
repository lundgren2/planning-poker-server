import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

const context = ({ req }) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return undefined;

    const token = authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET);

    return {
      loggedInUser: decoded.email,
    };
  } catch (error) {
    console.log(error);
    throw new AuthenticationError('invalid token');
  }
};

export default context;
