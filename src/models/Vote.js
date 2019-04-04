import mongoose from 'mongoose';

const { Schema } = mongoose;

const VoteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  value: {
    type: Number,
    min: 0,
    max: 13,
  },
  storyId: String,
});

export default mongoose.model('Vote', VoteSchema);
