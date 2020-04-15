const { isLength } = require('validator');
const { checkPhoto } = require('../../utils/checkPhoto');

const addAuthor = (ctx, next) => {
  const {
    firstName, lastName, yearOfBirthday, yearOfDeath, photo, description,
  } = ctx.request.body;
  if (!firstName || !isLength(firstName, {
    min: 2,
    max: 128,
  })) {
    return ctx.throw(400, 'Wrong first name');
  }
  if (!lastName || !isLength(lastName, {
    min: 2,
    max: 128,
  })) {
    return ctx.throw(400, 'Wrong last name');
  }
  if (!yearOfBirthday || yearOfBirthday >= 2020 || yearOfBirthday <= 0) {
    return ctx.throw(400, 'Wrong year of birthday');
  }
  if (yearOfDeath && yearOfDeath >= 2020) {
    return ctx.throw(400, 'Wrong year of death');
  }
  if (!photo || !checkPhoto(photo)) {
    return ctx.throw(400, 'Wrong photo');
  }
  if (!description) {
    return ctx.throw(400, 'Wrong description');
  }
  return next();
};

module.exports = {
  addAuthor,
};
