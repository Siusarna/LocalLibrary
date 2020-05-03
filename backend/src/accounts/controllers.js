const config = require('config');
const { parseTimeFromConfig } = require('../utils/parseConfig');
const Services = require('./services');

const auth = async (ctx) => {
  try {
    const { accessToken, refreshToken, ...rest } = await Services.authServices(ctx.request.body);
    ctx.cookies.set('accessToken', accessToken, { maxAge: parseTimeFromConfig(config.jwt.tokens.access.expiresIn) });
    ctx.cookies.set('refreshToken', refreshToken, { maxAge: parseTimeFromConfig(config.jwt.tokens.refresh.expiresIn) });
    ctx.body = rest;
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

const register = async (ctx) => {
  try {
    const { accessToken, refreshToken, ...rest } = await Services.registerServices(ctx.request.body);
    ctx.cookies.set('accessToken', accessToken, { maxAge: parseTimeFromConfig(config.jwt.tokens.access.expiresIn) });
    ctx.cookies.set('refreshToken', refreshToken, { maxAge: parseTimeFromConfig(config.jwt.tokens.refresh.expiresIn) });
    ctx.body = rest;
    ctx.status = 201;
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

const forgotPassword = async (ctx) => {
  try {
    await Services.forgotPasswordServices(ctx.request.body.email);
    ctx.body = {
      success: 'true',
      message: 'New password successfully sent to your email',
    };
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

const facebook = async (ctx) => {
  try {
    const { accessToken, refreshToken, ...rest } = await Services.facebookServices(ctx.request.body);
    ctx.cookies.set('accessToken', accessToken, { maxAge: parseTimeFromConfig(config.jwt.tokens.access.expiresIn) });
    ctx.cookies.set('refreshToken', refreshToken, { maxAge: parseTimeFromConfig(config.jwt.tokens.refresh.expiresIn) });
    ctx.body = rest;
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

const telegram = async (ctx) => {
  try {
    const { accessToken, refreshToken, ...rest } = await Services.telegramServices(ctx.request.body);
    ctx.cookies.set('accessToken', accessToken, { maxAge: parseTimeFromConfig(config.jwt.tokens.access.expiresIn) });
    ctx.cookies.set('refreshToken', refreshToken, { maxAge: parseTimeFromConfig(config.jwt.tokens.refresh.expiresIn) });
    ctx.body = rest;
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

const changePassword = async (ctx) => {
  try {
    await Services.changePasswordServices(ctx.state.user, ctx.request.body);
    ctx.body = {
      success: 'true',
      message: 'Password successfully changed',
    };
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

const profile = async (ctx) => {
  try {
    ctx.body = await Services.profileServices(ctx.state.user);
    return ctx;
  } catch (e) {
    return ctx.throw(e);
  }
};

const updateProfile = async (ctx) => {
  try {
    ctx.body = await Services.updateProfileServices(ctx.state.user.id, ctx.request.body);
    return ctx;
  } catch (err) {
    return ctx.throw(err);
  }
};

const updatePhoto = async (ctx) => {
  try {
    ctx.body = await Services.updatePhotoServices(ctx.state.user.id, ctx.request.body.photo);
    return ctx;
  } catch (err) {
    return ctx.throw(err);
  }
};

const connectTelegram = async (ctx) => {
  try {
    await Services.connectTelegramServices(ctx.state.user, ctx.request.body);
    ctx.body = {
      success: 'true',
      message: 'Telegram successfully connected',
    };
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

const logout = async (ctx) => {
  try {
    await Services.logoutServices(ctx.state.user.id);
    ctx.body = {
      success: 'true',
      message: 'Logout was successfully',
    };
    ctx.cookies.set('accessToken', null);
    ctx.cookies.set('refreshToken', null);
    return ctx;
  } catch (e) {
    return ctx.throw(e);
  }
};

module.exports = {
  auth,
  register,
  forgotPassword,
  facebook,
  telegram,
  changePassword,
  profile,
  updateProfile,
  updatePhoto,
  connectTelegram,
  logout,
};
