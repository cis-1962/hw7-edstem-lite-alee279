import requireAuth from '../middlewares/require-auth';
import User from '../models/user';
import express from 'express';


const router = express.Router();

// router.get('/signup', async (req, res) => {
//   res.status(200).json({ message: 'Sign up page!' });
// })

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

router.post('/logout', async (req, res) => {
  const username = (req.session as unknown as {user: string}).user;
  // if (requireAuth(req.session)) {
    // (req.session as unknown as {user: string}).user = "";
    // req.session.destroy((err) => {
    //   if (err) {
    //     console.error('Error destroying session:', err);
    //     res.status(500).json({ message: 'Error logging out' });
    //   } 
    // });
    req.session = null;
    // res.clearCookie(username);
    res.status(200).send(`${username} logged out`);
  // } else {
  //   res.status(500).send("Please log in");
  // }
  
  
})
export default router;
