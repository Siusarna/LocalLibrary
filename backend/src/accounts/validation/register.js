const jimp = require('jimp');
const {
  isEmail, matches, isLength, isInt, isMobilePhone,
} = require('validator');

const checkHeightWidthSizeAndExtension = (img, byteLength) => (
  img.bitmap.height >= 512
  && img.bitmap.height <= 1024
  && img.bitmap.width >= 515
  && img.bitmap.height <= 1024
  && (byteLength / 1e6) <= 1
  && ['png', 'jpeg', 'jpg'].includes(img.getExtension()));

const checkPhoto = async (photo) => {
  const base64Data = Buffer.from(photo.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  const img = await jimp.read(base64Data);
  return checkHeightWidthSizeAndExtension(img, base64Data.length);
};

const register = (ctx, next) => {
  const {
    email, password, confirmPassword, photo, firstName, lastName, city, address, age, phone,
  } = ctx.request.body;
  if (!isEmail(email)) {
    return ctx.throw(400, 'Wrong email');
  }
  if (!matches(password, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
    return ctx.throw(400, 'Wrong password');
  }
  if (!matches(confirmPassword, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
    return ctx.throw(400, 'Wrong confirm password');
  }
  if (!isLength(firstName, {
    min: 1,
    max: 128,
  })) {
    return ctx.throw(400, 'Wrong first name');
  }
  if (!isLength(lastName, {
    min: 1,
    max: 128,
  })) {
    return ctx.throw(400, 'Wrong last name');
  }
  if (!isLength(city, {
    min: 1,
    max: 128,
  })) {
    return ctx.throw(400, 'Wrong last name');
  }
  if (!isLength(address, {
    min: 1,
    max: 256,
  })) {
    return ctx.throw(400, 'Wrong address');
  }
  if (!isLength(lastName, {
    min: 1,
    max: 128,
  })) {
    return ctx.throw(400, 'Wrong last name');
  }
  if (!isInt(age, {
    min: 1,
    max: 99,
  })) {
    return ctx.throw(400, 'Wrong age');
  }
  if (!isInt(age, {
    min: 1,
    max: 99,
  })) {
    return ctx.throw(400, 'Wrong age');
  }
  if (!isMobilePhone(phone, ['uk-UA'])) {
    return ctx.throw(400, 'Wrong phone number');
  }
  if (!checkPhoto(photo)) {
    return ctx.throw(400, 'Wrong photo');
  }
  return next();
};

module.exports = {
  register,
};
