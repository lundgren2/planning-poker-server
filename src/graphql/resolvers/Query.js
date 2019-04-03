import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
import User from '../../models/User';
import * as error from '../messages';
import { getUserId } from './utils';

const Query = {
  hello: () => 'world',
  // stories: (parent, args, context) => context.prisma.stories(),
  // story: (parent, { id }, context) => context.prisma.story({ id }),
  users: (parent, args, context) => {
    if (!context.loggedInUser) throw new ForbiddenError(error.auth.failed);
    return User.find({});
  },
  user: (parent, args, context) => {
    if (!context.loggedInUser) throw new ForbiddenError(error.auth.failed);
    return User.findById(args.id);
  },
};

export default Query;
