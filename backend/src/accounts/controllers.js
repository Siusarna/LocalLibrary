const config = require('config');
const crypto = require('crypto');
const knex = require('../libs/knex');
const { checkPassword } = require('../utils/checkPassword');
const { createAndUpdateTokens } = require('../utils/jwtToken');
const { parseTimeFromConfig } = require('../utils/parseConfig');

const auth = async (ctx) => {
  try {
    const { email, password } = ctx.request.body;
    const [user] = await knex('users')
      .where({ login: email })
      .select('*');
    if (!user || !checkPassword(password, user.password)) {
      return ctx.throw(400, 'Email or password is incorrect');
    }
    const { accessToken, refreshToken } = await createAndUpdateTokens(user.id);
    ctx.cookies.set('accessToken', accessToken, { maxAge: parseTimeFromConfig(config.jwt.tokens.access.expiresIn) });
    ctx.cookies.set('refreshToken', refreshToken, { maxAge: parseTimeFromConfig(config.jwt.tokens.refresh.expiresIn) });
    ctx.body = {
      firstName: user.firstName,
      lastName: user.lastName,
      photo: user.photo,
      role: user.role,
    };
    return ctx;
  } catch (err) {
    return ctx.throw(500, err.message);
  }
};

const register = async (ctx) => {
  try {
    const {
      password, confirmPassword, email, ...rest
    } = ctx.request.body;
    if (password !== confirmPassword) {
      return ctx.throw(400, 'Password and confirm password must match');
    }
    const [user] = await knex('users')
      .where({ email })
      .select('*');
    if (user) {
      return ctx.throw(400, 'User with this email already exist');
    }
    const salt = crypto.randomBytes(config.crypto.hash.length)
      .toString('base64');
    const passwordHash = crypto
      .pbkdf2Sync(password, salt, config.crypto.hash.iterations, config.crypto.hash.length, 'sha1')
      .toString('base64');
    const [newUser] = await knex('users')
      .insert({
        email,
        password: passwordHash,
        salt,
        ...rest,
      })
      .returning(['id', 'firstName', 'lastName', 'photo', 'role']);
    const { accessToken, refreshToken } = await createAndUpdateTokens(newUser.id);
    ctx.cookies.set('accessToken', accessToken, { maxAge: parseTimeFromConfig(config.jwt.tokens.access.expiresIn) });
    ctx.cookies.set('refreshToken', refreshToken, { maxAge: parseTimeFromConfig(config.jwt.tokens.refresh.expiresIn) });
    ctx.body = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      photo: newUser.photo,
      role: newUser.role,
    };
    return ctx;
  } catch (err) {
    return ctx.throw(500, err.message);
  }
};
//
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
// const forgotPassword = async (req, res) => {
//   try {
//     const errors = validationResult(req);
//
//     if (!errors.isEmpty()) {
//       return res.status(400).json(X({ errors }));
//     }
//
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//
//     if (!user) {
//       return res.status(400).json(X({
//         fields: {
//           email: 'NOT_EXIST_EMAIL',
//         },
//         code: 'FORMAT_ERROR',
//       }));
//     }
//
//     const codeId = uuid();
//
//     const code = await Code.findOneAndUpdate({ userId: user._id }, { codeId }, {
//       upsert: true,
//       new: true,
//     });
//
//     await sendEmail(email, user.firstName, user.lastName, code);
//     return res.json({
//       message: 'request on changing password sent to your email',
//     });
//   } catch (err) {
//     return res.status(500).json(X({
//       message: err,
//     }));
//   }
// };
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
  // profile,
  // updateProfile,
  // updatePhoto,
  // changePassword,
  // forgotPassword,
  // checkCode,
  // resetPassword,
  // logout,
};
