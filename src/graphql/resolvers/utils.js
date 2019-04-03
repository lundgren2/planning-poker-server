import jwt from 'jsonwebtoken';

function getUserId(context) {
  const authorization = context.request.get('authorization');
  if (authorization) {
    const token = authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    return userId;
  }

  // eslint-disable-next-line no-use-before-define
  throw new AuthError();
}

class AuthError extends Error {
  constructor() {
    super('Not authorized');
  }
}

export { getUserId, AuthError };
