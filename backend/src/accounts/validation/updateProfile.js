const { isLength, isInt, isMobilePhone } = require('validator');
const { checkPhoto } = require('./checkPhoto');


const updateProfile = (ctx, next) => {
  const {
    photo, firstName, lastName, city, address, age, phone,
  } = ctx.request.body;
  if (firstName && !isLength(firstName, {
    min: 1,
    max: 128,
  })) {
    return ctx.throw(400, 'Wrong first name');
  }
  if (lastName && !isLength(lastName, {
    min: 1,
    max: 128,
  })) {
    return ctx.throw(400, 'Wrong last name');
  }
  if (city && !isLength(city, {
    min: 1,
    max: 128,
  })) {
    return ctx.throw(400, 'Wrong city name');
  }
  if (address && !isLength(address, {
    min: 1,
    max: 256,
  })) {
    return ctx.throw(400, 'Wrong address');
  }
  if (age && !isInt(age, {
    min: 1,
    max: 99,
  })) {
    return ctx.throw(400, 'Wrong age');
  }
  if (phone && !isMobilePhone(phone, ['uk-UA'])) {
    return ctx.throw(400, 'Wrong phone number');
  }
  if (photo && !checkPhoto(photo)) {
    return ctx.throw(400, 'Wrong photo');
  }
  return next();
};

module.exports = {
  updateProfile,
};
