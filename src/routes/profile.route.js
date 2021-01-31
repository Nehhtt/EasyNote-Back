import { Router } from 'express';
import profileController from '../controllers/profile.controller';
import catchAsync from '../middleware/catchAsync';
import authentication from '../middleware/authenticate';

const { postImageProfile, getImageProfile } = profileController;
const { authenticate } = authentication;

const profileRouter = Router();

profileRouter.get('/postImage', authenticate, catchAsync(postImageProfile));
profileRouter.get('/getImage', authenticate, catchAsync(getImageProfile));

export default profileRouter;
