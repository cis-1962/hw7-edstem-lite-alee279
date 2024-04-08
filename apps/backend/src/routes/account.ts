// import requireAuth from '../middlewares/require-auth';
import requireAuth from '../middlewares/require-auth';
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
    // check if the username already exists
    const existingUser = await User.exists({ username });
    if (existingUser) {
      return res.status(400).send(`User ${username} taken`);
    }
    const newUser = new User({
      username,
      password,
    });
    await newUser.save();

    (req.session as unknown as {user: string}).user = username;

    res.status(200).send(`User ${username} created`);

  } catch (err) {
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
    res.status(401).send(`User ${username} does not exist`);
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

router.post('/logout', requireAuth, async (req, res) => {
  try {
    req.session = null;
    res.status(200).send('Logout successful');
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).send('error: Internal Server Error');
  }
});

router.get('/user', async (req, res) => {
  try {
    if ((req.session as unknown as {user: string}).user) {
      const username = (req.session as unknown as {user: string}).user;
      res.status(200).json({ username });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Account error:', error);
    res.status(500).send('error: Internal Server Error');
  }
});

router.get('/isLoggedIn', async (req, res) => {
  try {
    const isLoggedIn = req.session !== null && (req.session as unknown as {user: string}).user !== "";
    //  && (req.session as unknown as {user: string}).user;
    res.status(200).json({ isLoggedIn });
  } catch (error) {
    console.error('Account error:', error);
    res.status(500).send('error: Internal Server Error');
  }
});

export default router;
