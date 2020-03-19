const crypto = require('crypto');
const {
  crypto: { hash },
} = require('config');

const checkPassword = (inputPassword, passwordFromDb, salt) => {
  if (!inputPassword || !passwordFromDb) return false;
  return (
    crypto
      .pbkdf2Sync(inputPassword, salt, hash.iterations, hash.length, 'sha1')
      .toString('base64') === passwordFromDb
  );
};

const genSalt = () => crypto
  .randomBytes(hash.length)
  .toString('base64');

const genPassword = (password, salt) => crypto
  .pbkdf2Sync(password, salt, hash.iterations, hash.length, 'sha1')
  .toString('base64');

module.exports = {
  checkPassword,
  genSalt,
  genPassword,
};
