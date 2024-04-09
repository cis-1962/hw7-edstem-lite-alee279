import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Typography,
  Link,
} from '@mui/material';
import Post from './post';
import PostForm from './postform';

interface Question {
  _id: string;
  questionText: string;
  answer: string;
  author: string;
}

const fetcher = (url: string) =>
  axios.get<Question[]>(url).then((res) => res.data);

const QuestionList: React.FC = () => {
  const { data: questions, error } = useSWR('/api/questions', fetcher, {
    refreshInterval: 20,
  });
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null,
  );
  const [logInStatus, setLogInStatus] = useState(false);

  useEffect(() => {
    const fetchLogInStatus = async () => {
      try {
        const response = await axios.get('/api/account/isLoggedIn');
        setLogInStatus(response.data.isLoggedIn);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchLogInStatus();
  }, [logInStatus]);

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
        {logInStatus && <PostForm />}
        <List
          sx={{ width: '100%', maxHeight: '80vh', bgcolor: 'background.paper' }}
        >
          {error && <div>Error fetching questions</div>}
          {!error && !questions && <div>Loading...</div>}
          {questions &&
            questions.map((question) => (
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
                    primary={`Q: ${question.questionText}`}
                    secondary={
                      question.answer
                        ? `A: ${question.answer}`
                        : 'Write your answer'
                    }
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
            questionId={selectedQuestion._id}
            questionText={selectedQuestion.questionText}
            author={selectedQuestion.author}
            answer={selectedQuestion.answer}
          />
        </div>
      ) : (
        <div style={{ flexGrow: 1, marginLeft: 20 }}>
          <Paper
            sx={{
              height: 'calc(90vh - 40px)',
              width: '100vh',
              overflow: 'auto',
              marginTop: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {!logInStatus && (
              <Typography variant="h6" textAlign={'center'} margin={'30px'}>
                Please <Link href="/signup">sign up</Link> or{' '}
                <Link href="/login">log in</Link> to ask a question.
              </Typography>
            )}
          </Paper>
        </div>
      )}
    </Paper>
  );
};

export default QuestionList;
