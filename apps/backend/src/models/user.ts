import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  username: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

userSchema.pre('save', async function preSave() {
  // check to see if the password was changed
  if (!this.isModified('password')) return;

  // bcrypt generates secure password hashes
  const hash = await bcrypt.hash(this.password, 'salt');
  this.password = hash;
});

userSchema.method('checkPassword', async function checkPassword(possiblePass) {
  const match = await bcrypt.compare(possiblePass, this.password);
  return match;
});

const User = model<IUser>('User', userSchema);

export default User