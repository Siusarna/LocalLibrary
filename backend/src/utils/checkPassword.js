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

module.exports = {
  checkPassword,
};
