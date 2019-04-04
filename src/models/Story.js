import mongoose from 'mongoose';

const { Schema } = mongoose;

const StorySchema = new Schema({
  title: { type: String, required: [true, 'title required'] },
  description: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  fake: [Number],
  votes: {
    type: [Schema.Types.ObjectId],
    ref: 'Vote',
  },
});

export default mongoose.model('Story', StorySchema);
