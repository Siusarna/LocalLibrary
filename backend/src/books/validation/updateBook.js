const { isLength, isBoolean } = require('validator');
const { checkPhoto } = require('../../utils/checkPhoto');

const updateBook = (ctx, next) => {
  const {
    authorFirstName, authorLastName, yearOfPublishing, photo, title, available, isbn,
  } = ctx.request.body;
  if (authorFirstName && !isLength(authorFirstName, {
    min: 2,
    max: 128,
  })) {
    return ctx.throw(400, 'Wrong author first name');
  }
  if (authorLastName && !isLength(authorLastName, {
    min: 2,
    max: 128,
  })) {
    return ctx.throw(400, 'Wrong author last name');
  }
  if (yearOfPublishing && yearOfPublishing <= 0) {
    return ctx.throw(400, 'Wrong year of publishing');
  }
  if (title && !isLength(title, {
    min: 2,
    max: 128,
  })) {
    return ctx.throw(400, 'Wrong title');
  }
  if (photo && !checkPhoto(photo)) {
    return ctx.throw(400, 'Wrong photo');
  }
  if (isbn && !isLength(isbn, {
    max: 13,
  })) {
    return ctx.throw(400, 'Wrong isbn');
  }
  if (available && !isBoolean(available)) {
    return ctx.throw(400, 'Wrong available');
  }
  return next();
};

module.exports = {
  updateBook,
};
