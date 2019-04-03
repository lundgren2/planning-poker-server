import mongoose from 'mongoose';

const { Schema } = mongoose;

// TODO: fix title and description fields
const StorySchema = new Schema({
  title: { type: String, required: [true, 'title required'] },
  description: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model('Story', StorySchema);
