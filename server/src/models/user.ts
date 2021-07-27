import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: [true] },
  password: { type: String, required: [true] },
});

export const Users = mongoose.model('user', userSchema);
