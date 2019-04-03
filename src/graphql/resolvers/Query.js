import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
import { User, Story } from '../../models';
import * as error from '../messages';
// import { getUserId } from './utils';

const Query = {
  hello: () => 'Hello World',
  users: (parent, args, context) => {
    if (!context.loggedInUser) throw new ForbiddenError(error.auth.failed);
    return User.find({});
  },
  user: (parent, { id }, context) => {
    if (!context.loggedInUser) throw new ForbiddenError(error.auth.failed);
    return User.findById(id);
  },
  stories: (parent, args, context) => {
    // if (!context.loggedInUser) throw new ForbiddenError(error.auth.failed);
    return Story.find({}).populate('author');
  },
  story: (parent, { id }, context) => {
    // if (!context.loggedInUser) throw new ForbiddenError(error.auth.failed);
    return Story.findById(id).populate('author');
  },
};

export default Query;
