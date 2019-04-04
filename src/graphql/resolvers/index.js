import Query from './Query';
import Mutation from './Mutation';
import Subscription from './Subscription';

import { Story, Vote } from '../../models';

const resolvers = {
  User: {
    createdStories: (parent, args) => Story.find({ author: parent.id }),
  },
  Story: {
    votes: (parent, args) => {
      console.log(parent.id);
      return Vote.find({ storyId: parent.id });
    },
  },
};
export default { Query, Mutation, Subscription, ...resolvers };
