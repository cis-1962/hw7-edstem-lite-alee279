import { Model, Schema, model } from 'mongoose';

interface IQuestion {
  questionText: string;
  answer: string;
  author: string;
}

type QuestionModel = Model<IQuestion, object>;

const questionSchema = new Schema<IQuestion, QuestionModel>({
  questionText: { type: String, required: true },
  answer: { type: String },
  author: { type: String, required: true }
});

const Question = model<IQuestion, QuestionModel>('Question', questionSchema);

export default Question
