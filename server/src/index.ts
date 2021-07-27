import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { authRouter } from './authRouter';
import cookieParser from 'cookie-parser';
import { checkCookie, removeCookie } from './middleware/middleware';
import { categoriesRouter } from './categoriesRouter';
import { cardsRouter } from './cardsRouter';

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload());

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await mongoose.connect('mongodb+srv://admin:0000@cluster0.xiwhl.mongodb.net/english-for-kids', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log('Connection to DB failed', error);
  }
  console.log('Set DB connection');
  app.listen(PORT, () => console.log('Server started on port 4000...'));
}
start();

app.get('/login', checkCookie);
app.get('/logout', removeCookie);
app.use(authRouter);
app.use(categoriesRouter);
app.use(cardsRouter);
