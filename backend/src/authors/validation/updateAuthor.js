const { isLength } = require('validator');
const { checkPhoto } = require('../../utils/checkPhoto');

const updateAuthor = (ctx, next) => {
  const {
    firstName, lastName, yearOfBirthday, yearOfDeath, photo,
  } = ctx.request.body;
  if (firstName && !isLength(firstName, {
    min: 2,
    max: 128,
  })) {
    return ctx.throw(400, 'Wrong first name');
  }
  if (lastName && !isLength(lastName, {
    min: 2,
    max: 128,
  })) {
    return ctx.throw(400, 'Wrong last name');
  }
  if (yearOfBirthday && (yearOfBirthday >= 2020 || yearOfBirthday <= 0)) {
    return ctx.throw(400, 'Wrong year of birthday');
  }
  if (yearOfDeath && yearOfDeath >= 2020) {
    return ctx.throw(400, 'Wrong year of death');
  }
  if (photo && !checkPhoto(photo)) {
    return ctx.throw(400, 'Wrong photo');
  }
  return next();
};

module.exports = {
  updateAuthor,
};
