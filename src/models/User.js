import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { JWT_SECRET } from '../config';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email required'],
    validate: { validator: validator.isEmail },
    unique: [true, 'Email already exists'],
    message: '{VALUE} is not a valid email',
  },
  password: {
    type: String,
    required: [true, 'Password required'],
  },
  name: {
    type: String,
    required: [true, 'Name required'],
  },
  createdStories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Story',
    },
  ],
});

// Do not declare methods using ES6 arrow functions
userSchema.methods.hashPassword = function hashPassword(candidatePassword) {
  return bcrypt.hashSync(candidatePassword, 10);
};

// TODO: fix expire to 15 min
userSchema.methods.getJWT = function getJWT() {
  return jwt.sign({ email: this.email, userId: this.id }, JWT_SECRET, {
    expiresIn: '1d',
  });
};

userSchema.methods.verifyPassword = function verifyPassword(candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
