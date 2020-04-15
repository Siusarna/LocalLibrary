const { isLength } = require('validator');
const { checkPhoto } = require('../../utils/checkPhoto');

const addBook = (ctx, next) => {
  const {
    authorFirstName, authorLastName, yearOfPublishing, photo, description, title, available, isbn,
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
  if (!available) {
    return ctx.throw(400, 'Available is require field');
  }
  return next();
};

module.exports = {
  addBook,
};
