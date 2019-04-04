import Query from './Query';
import Mutation from './Mutation';

import { Story, Vote } from '../../models';
// import Subscription from './Subscription'

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
export default { Query, Mutation, ...resolvers };
