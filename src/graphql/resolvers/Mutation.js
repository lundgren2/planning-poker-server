import { ForbiddenError, PubSub } from 'apollo-server-express';
import * as error from '../messages';
import { Story, User, Vote } from '../../models';
import { signup, login } from './auth';

// const STORY_UPDATED = 'STORY_UPDATED';

// const pubsub = new PubSub();

const Mutation = {
  signup,
  login,
  createStory: async (parent, args, context) => {
    if (!context.loggedInUser) throw new ForbiddenError(error.auth.failed);
    const { userId } = context;

    // Check if story title already exists
    if (await Story.findOne({ title: args.title })) {
      throw Error('Story already exists');
    }

    return Story.create({
      ...args,
      author: userId,
    });
  },
  deleteStory: async (parent, { id }, context) => {
    if (!context.loggedInUser) throw new ForbiddenError(error.auth.failed);
    return Story.findOneAndDelete({ _id: id });
  },

  vote: async (parent, { id, value }, context) => {
    if (!context.loggedInUser) throw new ForbiddenError(error.auth.failed);

    // const userThatVoted = await User.findOne({ _id: context.userId });
    const vote = new Vote({
      user: context.userId,
      storyId: id,
      value,
    });

    vote.save();

    Story.updateOne(
      { _id: id },
      {
        $push: {
          votes: vote,
        },
      }
    ).then(data => {
      console.log(vote);
    });

    return Story.findOneAndUpdate(
      { _id: id },
      // { $push: { votes: vote } },
      { new: true }
    );
  },
};

export default Mutation;
