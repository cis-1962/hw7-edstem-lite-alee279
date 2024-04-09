import requireAuth from '../middlewares/require-auth';
import Question, { IQuestion } from '../models/question';
import express from 'express';


const router = express.Router();

router.get('', async (req, res) => {
  try {
    const questions: IQuestion[] = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/add', requireAuth, async (req, res) => {
  const { questionText } = req.body as { questionText: string };

  console.log(questionText)

  try {
    const newQuestion = new Question({
      questionText,
      author: (req.session as unknown as {user: string}).user
    });
    await newQuestion.save();
    res.status(200).send('Question Post Successful');
    console.log(newQuestion)
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving question!');
  }
})

router.post('/answer', requireAuth, async (req, res) => {
  const { questionId, answer } = req.body as {
    questionId;
    answer: string
  };
  try {
    const answerQuestion = await Question.findByIdAndUpdate(
      questionId,
      { answer }
    );
    res.status(200).send('Question Answered Successful');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving answer!');
  }
})

export default router;
