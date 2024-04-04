import User from '../models/user';
import express from 'express';


const router = express.Router();

// POST route for user signup
router.post('/signup', async (req, res) => {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };

  try {
  //   // check if the username already exists
    const existingUser = await User.exists({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const newUser = new User({
      username,
      password,
    });
    await newUser.save();

    (req.session as unknown as {user: string}).user = username;

    res.status(200).send('Sign Up Successful');

  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving user!');
  }
});

// POST route for user sign in
router.post('/login', async (req, res) => {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };

  const user = await User.findOne({ username: username });
  if (!user) {
    res.status(401).send('User does not exist');
  } else {
    try {
      const match = await user.checkPassword(password);
      if (match) {
        (req.session as unknown as {user: string}).user = username;
        res.status(200).send('Login Successful');
      } else {
        res.status(401).send('Wrong Password');
      }
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }
});

router.post('/api/account/logout', async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ message: 'Error logging out' });
    } else {
      res.status(200).json({ message: 'Logged out successfully' });
    }
  });
})
export default router;
