import {
  Button,
  Dialog,
  DialogContent,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormInput {
  questionText: string;
}

const PostForm = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await axios.post('api/questions/add', data);
      window.location.href = '/';
      if (response.status === 200) {
        console.log('Post Successful');
        handleClose();
      } else {
        console.log('Post Failed:', response.data);
      }
    } catch (error) {
      console.error('Error occurred during posting:', error);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{ marginTop: '20px' }}
      >
        Ask a question
      </Button>
      <Dialog open={open} onClose={handleClose} sx={{ width: '1000px' }}>
        <DialogContent>
          <Typography
            variant="h4"
            textAlign="left"
            margin="30px"
            marginBottom="0px"
          >
            Ask a question
          </Typography>
          <div style={{ justifyContent: 'center', display: 'flex' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div style={{ margin: '20px' }}>
                <TextField
                  variant="outlined"
                  multiline
                  rows={6}
                  sx={{ width: '470px' }}
                  {...register('questionText')}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostForm;
