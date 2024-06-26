import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import acctRouter from './routes/account';
import questionRouter from './routes/question';

// read environment variables from .env file
dotenv.config();
const PORT = process.env.PORT ?? 8000;

// connect express server to mongodb
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/express";
mongoose.connect(MONGODB_URI, {})

const app = express();

// add cookie session
app.use(
  cookieSession({
    name: 'session', // default is 'session'
    secret: 'secretkey', // key for signing cookies
  })
);

// define root route
app.get('/hello', (_, res) => {
  res.json({ message: 'Hello, frontend!' });
});

// listen
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Now listening on port ${PORT}.`);
});

// add middleware
app.use(express.json());


// add account router
app.use('/api/account', acctRouter);
// add question router
app.use('/api/questions', questionRouter);

// add error handler
app.use((err, req, res, next) => {
  if (err.message === 'Unauthorized') {
    res.status(401).json({ error: 'Unauthorized. Please sign up or log in to continue' }); // Send 401 Unauthorized status with an error message
  } else {
    res.status(500).json({ error: 'Internal Server Error' }); // Send 500 Internal Server Error status with a generic error message
  }
})

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});