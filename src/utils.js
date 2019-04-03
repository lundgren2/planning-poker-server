import jwt from 'jsonwebtoken';

function getUserId(context) {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
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
