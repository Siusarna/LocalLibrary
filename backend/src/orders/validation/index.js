const { create } = require('./create');
const { sendConfirmationCode } = require('./sencConfirmatioCode');
const { confirmCode } = require('./confirmCode');
const { confirm } = require('./confirm');
const { finish } = require('./finish');

module.exports = {
  create,
  sendConfirmationCode,
  confirmCode,
  confirm,
  finish,
};
