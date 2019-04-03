import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
import User from '../../models/User';
import * as error from './messages';

const Query = {
  hello: () => 'world',
  // stories: (parent, args, context) => context.prisma.stories(),
  // story: (parent, { id }, context) => context.prisma.story({ id }),
  // me: (parent, args, context) => {
  //   const id = getUserId(context);
  //   return context.prisma.user({ id });
  // },
  users: (parent, args, context) => {
    // console.log(context.loggedInUser);

    if (!context.loggedInUser) throw new ForbiddenError(error.auth.failed);
    return User.find({});
  },
};

export default Query;
