import requireAuth from '../middlewares/require-auth';
import Question from '../models/question';
import express from 'express';


const router = express.Router();

router.get('', async (req, res) => {
  res.status(200).send({ message: 'get questions' });
})


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
  const { _id, answer } = req.body as { 
    _id,
    answer: string
  };

    try {
      const answerQuestion = await Question.findByIdAndUpdate(
        _id,
        { answer },
        { new: true }
      );

      res.json(answerQuestion);
      res.status(200).send('Question Answered Successful');

    } catch (err) {
      console.error(err);
      res.status(500).send('Error saving answer!');
    }
})

export default router;
