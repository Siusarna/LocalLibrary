const { isLength, isInt } = require('validator');
const { checkPhoto } = require('../../utils/checkPhoto');

const addBook = (ctx, next) => {
  const {
    authorFirstName, authorLastName, yearOfPublishing, photo, description, title, amount, isbn,
  } = ctx.request.body;
  if (!authorFirstName || !isLength(authorFirstName, {
    min: 2,
    max: 128,
  })) {
    return ctx.throw(400, 'Wrong author first name');
  }
  if (!authorLastName || !isLength(authorLastName, {
    min: 2,
    max: 128,
  })) {
    return ctx.throw(400, 'Wrong author last name');
  }
  if (!yearOfPublishing || yearOfPublishing <= 0) {
    return ctx.throw(400, 'Wrong year of publishing');
  }
  if (!title || !isLength(title, {
    min: 2,
    max: 128,
  })) {
    return ctx.throw(400, 'Wrong title');
  }
  if (!photo || !checkPhoto(photo)) {
    return ctx.throw(400, 'Wrong photo');
  }
  if (!description) {
    return ctx.throw(400, 'Wrong description');
  }
  if (!isbn || !isLength(isbn, {
    max: 13,
  })) {
    return ctx.throw(400, 'Wrong isbn');
  }
  if (!amount || !isInt(amount)) {
    return ctx.throw(400, 'Amount is require field and its must be a number');
  }
  return next();
};

module.exports = {
  addBook,
};
