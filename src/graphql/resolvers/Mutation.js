import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
import User from '../../models/User';
import * as error from './messages';

const Mutation = {
  signup: async (parent, args) => {
    try {
      if (!args.email || !args.password || !args.name)
        throw new AuthenticationError(error.signup.invalidEmailPassword);

      const checkUniqueUser = await User.findOne({ email: args.email });
      if (checkUniqueUser)
        throw new AuthenticationError(error.signup.invalidEmail);

      const newUser = new User(args);
      newUser.password = newUser.hashPassword(args.password);

      const user = await User.create(newUser);
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        token: user.getJWT(),
      };
    } catch (err) {
      throw new Error(err);
    }
  },
  login: async (parent, args) => {
    try {
      const user = await User.findOne({ email: args.email });

      if (!user) throw new Error(error.login.noUserFound);
      if (!user.verifyPassword(args.password))
        throw new Error(error.login.noPasswordMatched);

      return {
        id: user.id,
        email: user.email,
        token: user.getJWT(),
      };
    } catch (err) {
      throw new Error(err);
    }
  },
};

export default Mutation;
