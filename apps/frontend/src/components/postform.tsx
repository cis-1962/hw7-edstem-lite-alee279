import { Button, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormInput {
  questionText: string;
}

const PostForm = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await axios.post('api/questions/add', data);
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
        <Typography
          variant="h4"
          textAlign={'left'}
          margin={'30px'}
          marginBottom={'10px'}
        >
          Create a new post
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <TextField variant="outlined" {...register('questionText')} />
          </div>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default PostForm;
