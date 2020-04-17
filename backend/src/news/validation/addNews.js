const { isLength } = require('validator');
const { checkPhoto } = require('../../utils/checkPhoto');

const addNews = (ctx, next) => {
  const {
    photo, description, shortDescription, header,
  } = ctx.request.body;
  if (!header || !isLength(header, {
    min: 2,
    max: 128,
  })) {
    return ctx.throw(400, 'Wrong header');
  }
  if (!shortDescription || !isLength(shortDescription, {
    min: 2,
    max: 256,
  })) {
    return ctx.throw(400, 'Wrong short description');
  }
  if (photo && !checkPhoto(photo)) {
    return ctx.throw(400, 'Wrong photo');
  }
  if (!description) {
    return ctx.throw(400, 'Wrong description');
  }
  return next();
};

module.exports = {
  addNews,
};
