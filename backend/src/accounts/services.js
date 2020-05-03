const generatePassword = require('generate-password');
const config = require('config');
const axios = require('axios');
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

const facebookServices = async ({ accessToken }) => {
  const { data } = await axios({
    url: 'https://graph.facebook.com/me',
    method: 'get',
    params: {
      fields: ['id', 'email', 'first_name', 'last_name', 'hometown', 'birthday', 'picture.type(large)'].join(','),
      access_token: accessToken,
    },
  });
  if (!data.email) {
    throw new Error(
      'Your Facebook account haven\'t email. Please confirm email on Facebook or use other methods for sign-up',
    );
  }
  const [user] = await queries.getUserByEmail(data.email);
  if (user) {
    const { accessToken: jwtAccessToken, refreshToken: jwtRefreshToken } = await createAndUpdateTokens(user.id);
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      photo: user.photo,
      role: user.role,
      accessToken: jwtAccessToken,
      refreshToken: jwtRefreshToken,
    };
  }
  const age = (new Date().getFullYear()) - data.birthday.substring(data.birthday.length - 4);
  const [newUser] = await queries.insertNewUser({
    email: data.email,
    firstName: data.first_name,
    lastName: data.last_name,
    age,
    city: data.hometown.name,
    photo: data.picture.data.url,
  });
  const { accessToken: jwtAccessToken, refreshToken: jwtRefreshToken } = await createAndUpdateTokens(newUser.id);
  return {
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    photo: data.picture.data.url,
    role: newUser.role,
    accessToken: jwtAccessToken,
    refreshToken: jwtRefreshToken,
  };
};

const telegramServices = async (data) => {
  const [user] = await queries.getUserByTelegramId(data.id);
  if (user) {
    const { accessToken, refreshToken } = await createAndUpdateTokens(user.id);
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      photo: user.photo,
      role: user.role,
      accessToken,
      refreshToken,
    };
  }
  const [newUser] = await queries.insertNewUser({
    firstName: data.first_name,
    lastName: data.last_name,
    photo: data.photo_url,
    telegramId: data.id,
  });
  const { accessToken: jwtAccessToken, refreshToken: jwtRefreshToken } = await createAndUpdateTokens(newUser.id);
  return {
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    photo: data.photo_url,
    role: newUser.role,
    accessToken: jwtAccessToken,
    refreshToken: jwtRefreshToken,
  };
};

const changePasswordServices = async (user, { currentPassword, newPassword, confirmNewPassword }) => {
  if (!user || !checkPassword(currentPassword, user.password, user.salt)) {
    throw new Error('Incorrect current password ');
  }
  if (newPassword !== confirmNewPassword) {
    throw new Error('New password and confirm password must match');
  }
  const salt = genSalt();
  const passwordHash = genPassword(newPassword, salt);
  await queries.updateUserById(user.id, {
    password: passwordHash,
    salt,
  });
};

const profileServices = async (user) => queries.getProfileById(user.id);

const updateProfileServices = async (id, newProfile) => {
  await queries.updateUserById(id, { ...newProfile });
  return queries.getProfileById(id);
};

const updatePhotoServices = async (id, photo) => {
  const urlPhoto = await uploadFile(photo, 'User', id);
  await queries.updateUserById(id, { photo: urlPhoto });
  return { photo: urlPhoto };
};

const connectTelegramServices = async (user, { id }) => {
  const [userFromDb] = await queries.getUserByTelegramId(id);
  if (userFromDb) {
    throw new Error('User with this telegram already exist');
  }
  return queries.updateUserById(user.id, { telegramId: id });
};

const logoutServices = async (id) => {
  await queries.deleteTokenByUserId(id);
};

module.exports = {
  authServices,
  registerServices,
  forgotPasswordServices,
  facebookServices,
  telegramServices,
  changePasswordServices,
  profileServices,
  updateProfileServices,
  updatePhotoServices,
  connectTelegramServices,
  logoutServices,
};
