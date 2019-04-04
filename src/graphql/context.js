import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

const context = ({ req, connection }) => {
  if (connection) {
    // https://www.apollographql.com/docs/apollo-server/features/subscriptions#context-with-subscriptions
    // check connection for metadata
    return connection.context;
  }

  try {
    const { authorization } = req.headers;
    if (!authorization) return undefined;

    const token = authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET);

    // TODO: return only userId
    return {
      loggedInUser: decoded.email,
      userId: decoded.userId,
    };
  } catch (error) {
    console.log(error);
    throw new AuthenticationError('invalid token');
  }
};

export default context;
