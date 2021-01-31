import debug from 'debug';

import User from '../models/user.model';
import { ApplicationError } from '../helpers/errors';

const DEBUG = debug('dev');

export default {
  postImageProfile: async (req, res) => {
    try {
      const tmpUser = await User.updateOne({ userName: req.body.userName },
        { profilePicture: req.body.profilePicture }, {});

      if (tmpUser) {
        return res.status(200).json({
          status: 'success',
          data: req.body.profilePicture,
        });
      }
      return res.status(409).json({
        status: 'error',
        error: {
          message: 'Error user does not exist',
        },
      });
    } catch (error) {
      DEBUG(error);
      throw new ApplicationError(500, error);
    }
  },
  getImageProfile: async (req, res) => {
    try {
      const tmpUser = await User.findOne({ userName: req.body.userName }, {});

      if (tmpUser) {
        return res.status(200).json({
          status: 'success',
          data: tmpUser.profilePicture,
        });
      }
      return res.status(409).json({
        status: 'error',
        error: {
          message: 'Error user does not exist',
        },
      });
    } catch (error) {
      DEBUG(error);
      throw new ApplicationError(500, error);
    }
  },
};
