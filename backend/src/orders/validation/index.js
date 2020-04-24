const { create } = require('./create');
const { sendConfirmationCode } = require('./sencConfirmatioCode');
const { confirmCode } = require('./confirmCode');
const { confirm } = require('./confirm');

module.exports = {
  create,
  sendConfirmationCode,
  confirmCode,
  confirm,
};
