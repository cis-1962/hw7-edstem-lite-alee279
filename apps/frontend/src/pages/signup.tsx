import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Link, TextField, Typography } from '@mui/material';
import axios from 'axios';

interface IFormInput {
  username: string;
  password: string;
}

const SignUp = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await axios.post('api/account/signup', data);
      window.location.href = '/';
      if (response.status === 200) {
        console.log('Sign Up Successful');
      } else {
        console.log('Sign Up Failed:', response.data);
      }
    } catch (error) {
      console.error('Error occurred during sign up:', error);
    }
  };

  return (
    <>
      <Typography variant="h4">Sign Up</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <TextField
            label="Username"
            variant="outlined"
            {...register('username')}
          />
        </div>
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            {...register('password')}
          />
        </div>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        <Typography variant="body1">
          Already have an account? Sign up <Link href="/login">here</Link>
        </Typography>
      </div>
    </>
  );
};

export default SignUp;
