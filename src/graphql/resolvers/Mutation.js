import { ForbiddenError } from 'apollo-server-express';
import * as error from '../messages';
import { Story, User } from '../../models';
import { signup, login } from './auth';

const Mutation = {
  signup,
  login,
  createStory: async (parent, args, context) => {
    if (!context.loggedInUser) throw new ForbiddenError(error.auth.failed);
    const { userId } = context;
    return Story.create({
      ...args,
      author: userId,
    });
  },
  deleteStory: async (parent, { id }, context) => {
    if (!context.loggedInUser) throw new ForbiddenError(error.auth.failed);
    return Story.findByIdAndRemove(id);
  },
};

export default Mutation;
