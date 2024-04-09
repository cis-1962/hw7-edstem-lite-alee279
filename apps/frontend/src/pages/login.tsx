import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Link, TextField, Typography } from '@mui/material';
import axios from 'axios';
import NavBar from '../components/navbar';

interface IFormInput {
  username: string;
  password: string;
}

export default function App() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await axios.post('api/account/login', data);
      window.location.href = '/';
      if (response.status === 200) {
        console.log('Login Successful');
      } else {
        console.log('Login Failed:', response.data);
      }
    } catch (error) {
      alert('Wrong username or password. Please try again.');
      console.error('Error occurred during login:', error);
    }
  };

  return (
    <>
      <NavBar />
      <Typography variant="h4">Log In</Typography>
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
          Don&apos;t have an account? Sign up <Link href="/signup">here</Link>
        </Typography>
      </div>
    </>
  );
}
