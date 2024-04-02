import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';


// read environment variables from .env file
dotenv.config();
const PORT = process.env.PORT ?? 8000;

const app = express();

// add cookie session
app.use(
  cookieSession({
    name: 'session', // default is 'session'
    secret: 'secretkey', // key for signing cookies
  })
);

// define root route
app.get('/api/hello', (_, res) => {
  res.json({ message: 'Hello, frontend!' });
});

// listen
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Now listening on port ${PORT}.`);
});

// add middleware
app.use(express.json());

// connect express server to mongodb
mongoose.connect("mongodb://localhost:27017/hw7-edstem-lite-alee279")