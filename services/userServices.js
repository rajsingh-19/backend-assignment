
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const UserModel = require('../models/userSchema');

dotenv.config();

//      api service for user register
const registerUser = async ( fullName, email, dateOfBirth, gender, country, password) => {
  const isUserExist = await UserModel.findOne({ email });

  if (isUserExist) {
    const error = new Error('A User already exist with this email');
    error.status = 400;
    throw error; //Throwing the error to the controller
  }

  //  Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await UserModel.create({
    fullName,
    email,
    dateOfBirth,
    gender,
    country,
    password: hashPassword,
  });

  return newUser; // Return created user object
};

//      api service for user login
const loginUser = async (email, password) => {
  const isUserValid = await UserModel.findOne({ email });

  if (!isUserValid) {
    const error = new Error('This email is not associated with any account');
    error.status = 400;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, isUserValid.password);

  if (!isPasswordValid) {
    const error = new Error('Credential is wrong');
    error.status = 400;
    throw error;
  }

  //   Set the mongodb user id as payload
  const payload = {
    id: isUserValid._id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return {
    token,
    userId: isUserValid._id,
    email: isUserValid.email,
  };
};

//    api service for fetching the user info
const infoUser = async (email) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    const error = new Error('This User is not associated with any account');
    error.status = 404;
    throw error;
  };

  // Extract the required fields from the userInfo object
  return {
    fullName: user.fullName,
    email: user.email,
    gender: user.gender,
    dateOfBirth: user.dateOfBirth,
    country: user.country,
    _id: user._id,
  };
};

module.exports = { registerUser, loginUser, infoUser };
