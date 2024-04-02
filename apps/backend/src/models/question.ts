import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IQuestion {
  questionText: string;
  answer: string;
  author: string;
}

// 2. Create a Schema corresponding to the document interface.
const questionSchema = new Schema<IQuestion>({
  questionText: { type: String, required: true },
  answer: { type: String, required: true },
  author: { type: String, required: true }
});

// 3. Create a Model.
const Question = model<IQuestion>('Question', questionSchema);

export default Question