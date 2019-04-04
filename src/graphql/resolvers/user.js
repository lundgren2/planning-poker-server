import { ForbiddenError } from 'apollo-server-express';
import { User, Story } from '../../models';
import * as error from '../messages';

export default {
  User: {
    createdStories: (parent, args) => Story.find({ author: parent.id }),
  },
  Query: {
    user: (parent, { id }, context) => {
      if (!context.loggedInUser) throw new ForbiddenError(error.auth.failed);
      return User.findById(id);
    },
    users: (parent, args, context) => {
      if (!context.loggedInUser) throw new ForbiddenError(error.auth.failed);
      return User.find({});
    },
  },
};
