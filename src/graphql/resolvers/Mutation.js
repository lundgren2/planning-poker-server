// import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
// import * as error from './messages';
import { signup, login } from './auth';

const Mutation = {
  signup,
  login,
};

export default Mutation;
