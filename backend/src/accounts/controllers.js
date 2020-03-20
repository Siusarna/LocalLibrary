const config = require('config');
const { parseTimeFromConfig } = require('../utils/parseConfig');
const Services = require('../accounts/services');

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
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

const forgotPassword = async (ctx) => {
  try {
    await Services.forgotPasswordServices(ctx.request.body.email);
    ctx.body = 'New password successfully sent to your email';
    return ctx;
  } catch (error) {
    return ctx.throw(400, error);
  }
};

// const profile = async (req, res) => {
//   const { user } = req;
//   const userProfile = await user.getProfile();
//   return res.json({
//     userProfile,
//   });
// };
//
// const updateProfile = async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json(X({ errors }));
//     }
//     const { _id } = req.user;
//     let user = req.body;
//     user = await User.findByIdAndUpdate(_id, user, { upsert: true });
//     const userProfile = await user.getProfile();
//     return res.json({
//       userProfile,
//     });
//   } catch (err) {
//     return res.status(500).json(X({
//       message: err,
//       code: 'SERVER_ERROR',
//     }));
//   }
// };
//
// const updatePhoto = async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json(X({ errors }));
//     }
//     const { _id } = req.user;
//     const { photo } = req.body;
//     const urlPhoto = await uploadFile(photo, _id);
//     await User.findByIdAndUpdate(_id, { photo: urlPhoto }, { upsert: true });
//     return res.json({
//       photo: urlPhoto,
//     });
//   } catch (err) {
//     return res.status(500).json(X({
//       message: err,
//     }));
//   }
// };
//
// const changePassword = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json(X({ errors }));
//   }
//   const { user } = req;
//   const { currentPassword, newPassword, confirmNewPassword } = req.body;
//
//   if (!user || !user.checkPassword(currentPassword)) {
//     return res.status(400).json(X({
//       fields: {
//         password: 'WRONG_PASSWORD',
//       },
//       code: 'FORMAT_ERROR',
//     }));
//   }
//
//   if (newPassword !== confirmNewPassword) {
//     return res.status(400).json(X({
//       fields: {
//         confirmPassword: 'WRONG_CONFIRM_PASSWORD',
//       },
//       code: 'FORMAT_ERROR',
//     }));
//   }
//   user.changePassword(newPassword);
//   user.save();
//
//   return res.json({
//     message: 'you change password successfully',
//   });
// };
//

//
// const checkCode = async (req, res) => {
//   let { code } = req.params;
//
//   code = await Code.findOne({ codeId: code });
//
//   if (!code) {
//     return res.status(400).json(X({
//       fields: {
//         code: 'NOT_EXIST_CODE',
//       },
//       code: 'FORMAT_ERROR',
//     }));
//   }
//
//   return res.json({
//     code: code.codeId,
//   });
// };
//
// const resetPassword = async (req, res) => {
//   const errors = validationResult(req);
//
//   if (!errors.isEmpty()) {
//     return res.status(400).json(X({ errors }));
//   }
//
//   const { code, newPassword, confirmNewPassword } = req.body;
//
//   if (newPassword !== confirmNewPassword) {
//     return res.status(400).json(X({
//       fields: {
//         confirmPassword: 'WRONG_CONFIRM_PASSWORD',
//       },
//       code: 'FORMAT_ERROR',
//     }));
//   }
//
//   const userId = Code.findOne({ codeId: code });
//   Code.deleteOne({ codeId: code });
//   const user = User.findById(userId);
//   user.changePassword(newPassword);
//   user.save();
//   return res.json({
//     message: 'you change password successfully',
//   });
// };
//
// const logout = async (req, res) => {
//   try {
//     const { _id } = req.user;
//     await Token.findOneAndDelete({ userId: _id });
//     res.json({
//       message: 'logout was successfully',
//     });
//   } catch (e) {
//     res.status(500).json(X({
//       message: e,
//     }));
//   }
// };
//
//
module.exports = {
  auth,
  register,
  forgotPassword,
  // profile,
  // updateProfile,
  // updatePhoto,
  // changePassword,
  // checkCode,
  // resetPassword,
  // logout,
};
