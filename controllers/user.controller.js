import Subscription from '../models/subscription.model.js';
import User from '../models/user.model.js';

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({ success: true, data: users });
  } catch(error) {
    next(error);
  }
}

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); //get all fields except password

    if(!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: user });
  } catch(error) {
    next(error);
  }
}

export const updateUser = async (req, res, next) => {
  try { 
    const { name, email, password } = req.body;
    const user = await User.findById(req.params.id);

    if(!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    if(name) user.name = name;
    if(email) user.email = email;
    if(password) user.password = password;

    await user.save();
    
    res.status(204).json({ success: true, message: 'Update successuful' });
  } catch(error) {
    next(error);
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if(!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    const userId = req.params.id;
    await Subscription.deleteMany({ user: userId });
    await User.findByIdAndDelete(userId);

    res.status(200).json({ success: true, message: 'User and subscriptions deleted successfully' })
  } catch(error) {
    next(error);
  }
}