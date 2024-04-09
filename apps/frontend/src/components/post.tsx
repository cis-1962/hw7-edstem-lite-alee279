import React, { useEffect, useState } from 'react';
import { Button, Link, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';

interface PostProps {
  questionId;
  questionText: string;
  author: string;
  answer: string;
}

interface IFormInput {
  questionId;
  answer: string;
}

const Post: React.FC<PostProps> = ({
  questionId,
  questionText,
  author,
  answer,
}) => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const [logInStatus, setLogInStatus] = useState(false);
  const [editAnswer, setEditAnswer] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      data.questionId = questionId;
      const response = await axios.post(`api/questions/answer`, data);
      window.location.href = '/';
      if (response.status === 200) {
        console.log('Post Successful');
      } else {
        console.log('Post Failed:', response.data);
      }
    } catch (error) {
      console.error('Error occurred during posting:', error);
    }
  };

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
    <>
      <Paper
        sx={{
          height: 'calc(90vh - 40px)',
          width: '100vh',
          overflow: 'auto',
          marginTop: '40px',
        }}
      >
        <div>
          <Typography
            variant="h4"
            textAlign={'left'}
            margin={'30px'}
            marginBottom={'10px'}
          >
            Q: {questionText}
          </Typography>
          <Typography
            variant="subtitle1"
            textAlign={'right'}
            marginRight={'50px'}
          >
            Asked by {author}
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h6"
              textAlign="left"
              marginLeft="30px"
              marginTop="30px"
              flex="1"
            >
              Answer:
            </Typography>
            {logInStatus && answer && !editAnswer && (
              <Button
                variant="contained"
                sx={{ marginTop: '30px', marginRight: '30px' }}
                onClick={() => setEditAnswer(true)}
              >
                Edit Answer
              </Button>
            )}
            {logInStatus && answer && editAnswer && (
              <Button
                variant="contained"
                sx={{ marginTop: '30px', marginRight: '30px' }}
                onClick={() => setEditAnswer(false)}
              >
                Cancel
              </Button>
            )}
          </div>

          {answer && !editAnswer ? (
            <Typography
              variant="body1"
              textAlign={'left'}
              margin={'30px'}
              marginTop={'10px'}
            >
              {answer}
            </Typography>
          ) : logInStatus ? (
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
              <div style={{ margin: '30px' }}>
                <TextField
                  variant="outlined"
                  multiline
                  rows={3}
                  fullWidth
                  defaultValue={answer}
                  {...register('answer')}
                />
              </div>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </form>
          ) : (
            <div style={{ flexGrow: 1, marginLeft: 20 }}>
              <Typography variant="body1" textAlign={'center'} margin={'30px'}>
                Please <Link href="/signup">sign up</Link> or{' '}
                <Link href="/login">log in</Link> to write your answer.
              </Typography>
            </div>
          )}
        </div>
      </Paper>
    </>
  );
};

export default Post;
