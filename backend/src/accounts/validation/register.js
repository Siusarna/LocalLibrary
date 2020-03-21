const {
  isEmail, matches, isLength, isMobilePhone,
} = require('validator');
const { checkPhoto } = require('./checkPhoto');

const register = (ctx, next) => {
  const {
    email, password, confirmPassword, photo, firstName, lastName, city, address, age, phone,
  } = ctx.request.body;
  if (!email || !isEmail(email)) {
    return ctx.throw(400, 'Wrong email');
  }
  if (!password || !matches(password, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
    return ctx.throw(400, 'Wrong password');
  }
  if (!confirmPassword || !matches(confirmPassword, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
    return ctx.throw(400, 'Wrong confirm password');
  }
  if (!firstName || !isLength(firstName, {
    min: 1,
    max: 128,
  })) {
    return ctx.throw(400, 'Wrong first name');
  }
  if (!lastName || !isLength(lastName, {
    min: 1,
    max: 128,
  })) {
    return ctx.throw(400, 'Wrong last name');
  }
  if (!city || !isLength(city, {
    min: 1,
    max: 128,
  })) {
    return ctx.throw(400, 'Wrong city name');
  }
  if (!address || !isLength(address, {
    min: 1,
    max: 256,
  })) {
    return ctx.throw(400, 'Wrong address');
  }
  if (!age || !isLength(age, {
    min: 1,
    max: 3,
  })) {
    return ctx.throw(400, 'Wrong age');
  }
  if (!phone || !isMobilePhone(phone, ['uk-UA'])) {
    return ctx.throw(400, 'Wrong phone number');
  }
  if (!photo || !checkPhoto(photo)) {
    return ctx.throw(400, 'Wrong photo');
  }
  return next();
};

module.exports = {
  register,
};
