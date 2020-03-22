const { checkPhoto } = require('./checkPhoto');

const updatePhoto = (ctx, next) => {
  const { photo } = ctx.request.body;
  if (!photo || !checkPhoto(photo)) {
    return ctx.throw(400, 'Wrong photo');
  }
  return next();
};

module.exports = {
  updatePhoto,
};
