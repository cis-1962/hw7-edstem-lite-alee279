import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import acctRouter from './routes/account';
import questionRouter from './routes/question';


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

// connect express server to mongodb
const MONGODB_URI = "mongodb+srv://iamandal:rYDDgmvNLPunkXkb@cluster0.noigaxk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(MONGODB_URI, {})

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});