import { ForbiddenError } from 'apollo-server-express';
import { PubSub } from 'graphql-subscriptions';
import mongoose from 'mongoose';
import { Story, Vote } from '../../models';
import * as error from '../messages';

const pubsub = new PubSub();
const STORY_UPDATED = 'STORY_UPDATED';

export default {
  Subscription: {
    storyUpdated: {
      resolve: story => {
        return story;
      },
      subscribe: () => pubsub.asyncIterator([STORY_UPDATED]),
    },
  },
  Story: {
    votes: (parent, args) => {
      return Vote.find({ storyId: parent.id }).populate('user');
    },
  },
  Query: {
    stories: (parent, args, context) => {
      // if (!context.loggedInUser) throw new ForbiddenError(error.auth.failed);
      return Story.find({}).populate('author votes');
    },
    story: (parent, args, context) => {
      // if (!context.loggedInUser) throw new ForbiddenError(error.auth.failed);
      return Story.findById(args.id).populate('author votes');
    },
  },
  Mutation: {
    createStory: async (parent, args, context) => {
      if (!context.loggedInUser) throw new ForbiddenError(error.auth.failed);
      const { userId } = context;

      // Check if story title already exists
      if (await Story.findOne({ title: args.title })) {
        throw Error('Story already exists');
      }

      const story = await Story.create({
        ...args,
        author: userId,
      });
      pubsub.publish(STORY_UPDATED, story);

      return story;
    },
    deleteStory: async (parent, { id }, context) => {
      if (!context.loggedInUser) throw new ForbiddenError(error.auth.failed);
      return Story.findOneAndDelete({ _id: id });
    },

    vote: async (parent, { storyId, value }, context) => {
      if (!context.loggedInUser) throw new ForbiddenError(error.auth.failed);
      const { userId } = context;

      // IMPROVE: change order to add vote if not exist else update existing
      const userAlreadyVoted = await Vote.findOneAndUpdate(
        { storyId, user: userId },
        { $set: { value } }
      );
      let updatedStory = null;

      if (!userAlreadyVoted) {
        const vote = new Vote({
          user: userId,
          storyId,
          value,
        });
        vote.save();

        updatedStory = await Story.findOneAndUpdate(
          { _id: storyId },
          {
            $push: {
              votes: vote,
            },
          }
        );
      } else {
        // User has already voted
        updatedStory = await Story.findOne({ _id: storyId });
      }

      pubsub.publish(STORY_UPDATED, updatedStory);
      return updatedStory;
    },
  },
};
