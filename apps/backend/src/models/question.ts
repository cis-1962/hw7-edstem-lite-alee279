import { Model, Schema, model } from 'mongoose';

interface IQuestion {
  questionText: string;
  answer: string;
  author: string;
}

type QuestionModel = Model<IQuestion, object>;

const questionSchema = new Schema<IQuestion, QuestionModel>({
  questionText: { type: String, required: true },
  answer: { type: String, required: true },
  author: { type: String, required: true }
});

// 3. Create a Model.
const Question = model<IQuestion>('Question', questionSchema);

export default Question

// userSchema.pre('save', async function preSave() {
//   // check to see if the password was changed
//   if (!this.isModified('password')) return;
//   // bcrypt generates secure password hashes
//   const hash = await bcrypt.hash(this.password, 10);
//   this.password = hash;
// });