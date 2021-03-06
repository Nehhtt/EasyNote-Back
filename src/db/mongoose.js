import mongoose from 'mongoose';
import { config } from 'dotenv';
import debug from 'debug';

config();
const DEBUG = debug('dev');

// const { DEV_DB } = process.env;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose

  .connect('mongodb+srv://dbUser:dbUserPassword@cluster0.paawm.mongodb.net/easynote?retryWrites=true&w=majority', options)
  .then(() => {
    DEBUG('MongoDB is connected');
  })
  .catch((e) => {
    DEBUG('MongoDB connection unsuccessful', e);
  });
