import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Paper,
} from '@mui/material';
import Post from './post'; // Remove the file extension
import PostForm from './postform';

interface Question {
  _id: string;
  questionText: string;
  answer: string;
  author: string;
}

const QuestionList: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null,
  );

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await axios.get<Question[]>('/api/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    getQuestions();
  }, []);

  // const windowHeight = window.innerHeight;

  return (
    <Paper elevation={0} sx={{ display: 'flex', p: 2 }}>
      <Paper
        sx={{
          height: 'calc(90vh - 40px)',
          overflow: 'auto',
          marginTop: '40px',
          width: '275px',
        }}
      >
        <Button
          variant="contained"
          onClick={() => setSelectedQuestion(null)}
          sx={{ margin: '10px' }}
        >
          Ask a Question
        </Button>
        <List
          sx={{ width: '100%', maxHeight: '80vh', bgcolor: 'background.paper' }}
        >
          {questions.map((question) => (
            <div key={question._id}>
              <ListItem
                alignItems="flex-start"
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
                onClick={() => setSelectedQuestion(question)}
              >
                <ListItemText
                  primary={question.questionText}
                  secondary={`Answer: ${question.answer}`}
                />
              </ListItem>
              <Divider component="li" />
            </div>
          ))}
        </List>
      </Paper>
      {selectedQuestion ? (
        <div style={{ flexGrow: 1, marginLeft: 20 }}>
          <Post
            questionText={selectedQuestion.questionText}
            author={selectedQuestion.author}
            answer={selectedQuestion.answer}
          />
        </div>
      ) : (
        <div style={{ flexGrow: 1, marginLeft: 20 }}>
          <PostForm />
        </div>
      )}
    </Paper>
  );
};

export default QuestionList;
