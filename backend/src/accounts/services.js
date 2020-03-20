const generatePassword = require('generate-password');
const config = require('config');
const { checkPassword, genSalt, genPassword } = require('../utils/password');
const { createAndUpdateTokens } = require('../utils/jwtToken');
const { uploadFile } = require('../utils/s3-bucket');
const { sendEmail } = require('../libs/sendGrid');
const queries = require('./queries');

const authServices = async ({ email, password }) => {
  const [user] = await queries.getUserByEmail(email);
  if (!user || !checkPassword(password, user.password, user.salt)) {
    throw new Error('Email or password is incorrect');
  }
  const { accessToken, refreshToken } = await createAndUpdateTokens(user.id);
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    photo: user.photo,
    role: user.role,
    accessToken,
    refreshToken,
  };
};

const registerServices = async ({
  password, confirmPassword, email, photo, ...rest
}) => {
  if (password !== confirmPassword) {
    throw new Error('Password and confirm password must match');
  }
  const [user] = await queries.getUserByEmail(email);
  if (user) {
    throw new Error('User with this email already exist');
  }
  const salt = genSalt();
  const passwordHash = genPassword(password, salt);
  const [newUser] = await queries.insertNewUser({
    password: passwordHash,
    email,
    salt,
    ...rest,
  });
  const photoUri = await uploadFile(photo, 'User', newUser.id);
  await queries.updateUserById(newUser.id, { photo: photoUri });
  const { accessToken, refreshToken } = await createAndUpdateTokens(newUser.id);
  return {
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    photo: photoUri,
    role: newUser.role,
    accessToken,
    refreshToken,
  };
};

const forgotPasswordServices = async (email) => {
  const [user] = await queries.getUserByEmail(email);
  if (!user) {
    throw new Error('User with this email not exist');
  }
  const password = generatePassword.generate(config.randomPassword);
  const salt = genSalt();
  const passwordHash = genPassword(password, salt);
  await queries.updateUserById(user.id, {
    password: passwordHash,
    salt,
  });
  await sendEmail(user.email, user.firstName, user.lastName, password);
};

module.exports = {
  authServices,
  registerServices,
  forgotPasswordServices,
};
