import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';

const router = express.Router();

// POST route for user signup
router.post('/api/account/signup', async (req: Request, res: Response) => {
  // const { username, password } = req.body;
  const { username, password } = req.body as {
    username: string;
    password: string;
  };

  try {
    // check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const hash = await bcrypt.hash(password, 'salt');
    const newUser = new User({
      username,
      password: hash,
    });
    await newUser.save();

    req.session!.user = username;

  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving user!');
  }
});

// POST route for user sign in
router.post('/api/account/login', async (req, res) => {
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
        res.status(200).send('Login Successful');
      } else {
        res.status(401).send('Wrong Password');
      }
    } catch (err) {
      // error
      res.status(500).send('Internal Server Error');
    }
  }
});

export default router;
