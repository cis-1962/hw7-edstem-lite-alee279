import { Model, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

// Create an interface representing a document in MongoDB.
interface IUser {
  username: string;
  password: string;
}

interface IUserMethods {
  checkPassword(possiblePass: string): boolean;
}

type UserModel = Model<IUser, object, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

userSchema.pre('save', async function preSave() {
  // check to see if the password was changed
  if (!this.isModified('password')) return;
  // bcrypt generates secure password hashes
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

userSchema.method('checkPassword', async function checkPassword(possiblePass) {
  const match = await bcrypt.compare(possiblePass, this.password);
  return match;
});

const User = model<IUser, UserModel>('User', userSchema);

export default User