const { isLength } = require('validator');
const { checkPhoto } = require('../../utils/checkPhoto');

const updateNews = (ctx, next) => {
  const {
    photo, shortDescription, header,
  } = ctx.request.body;
  if (!header && !isLength(header, {
    min: 2,
    max: 128,
  })) {
    return ctx.throw(400, 'Wrong header');
  }
  if (!shortDescription && !isLength(shortDescription, {
    min: 2,
    max: 256,
  })) {
    return ctx.throw(400, 'Wrong short description');
  }
  if (photo && !checkPhoto(photo)) {
    return ctx.throw(400, 'Wrong photo');
  }
  return next();
};

module.exports = {
  updateNews,
};
