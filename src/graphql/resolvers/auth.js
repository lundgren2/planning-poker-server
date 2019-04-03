import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
import User from '../../models/User';
import * as error from '../messages';

export const signup = async (parent, args) => {
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
      token: user.getJWT(),
      user,
    };
  } catch (err) {
    throw new Error(err);
  }
};

export const login = async (parent, args) => {
  try {
    const user = await User.findOne({ email: args.email });

    if (!user) throw new Error(error.login.noUserFound);
    if (!user.verifyPassword(args.password))
      throw new Error(error.login.noPasswordMatched);

    return {
      token: user.getJWT(),
      user,
    };
  } catch (err) {
    throw new Error(err);
  }
};
