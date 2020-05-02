const TelegramBot = require('node-telegram-bot-api');
const config = require('config');

const sendNotification = (chatId, message) => {
  const bot = new TelegramBot(config.telegram.botToken, { polling: true });
  return bot.sendMessage(chatId, message);
};

module.exports = {
  sendNotification,
};
