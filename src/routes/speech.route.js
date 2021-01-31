/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { Router } from 'express';
import debug from 'debug';

const DEBUG = debug('dev');

const speechRouter = Router();

const { format } = require('util');
const fs = require('fs');
const multer = require('multer');

const speech = require('@google-cloud/speech');

const client = new speech.SpeechClient();

const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'fr-FR';

const upload = multer();

speechRouter.post('/upload', upload.single('file'), async (req, res, next) => {
  const file = await req.file;
  console.log('FILE: ', file);
  if (!file) {
    const error = new Error('Please upload a file');
    error.httpStatusCode = 400;
    return next(error);
  }

  const request = {
    config: {
      encoding,
      sampleRateHertz,
      languageCode,
    },
    audio: {
      content: file.buffer.toString('base64'),
    },
  };
  // Stream the audio to the Google Cloud Speech API
  const [response] = await client.recognize(request);
  const transcription = response.results
    .map((result) => result.alternatives[0].transcript)
    .join('\n');

  return res.status(200).json({
    status: 'success',
  });
});

export default speechRouter;
