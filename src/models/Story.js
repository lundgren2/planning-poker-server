import mongoose from 'mongoose';

const { Schema } = mongoose;

// TODO: fix title and description fields
const StorySchema = new Schema({
  title: String,
  content: String,
});

export default mongoose.model('Story', StorySchema);
