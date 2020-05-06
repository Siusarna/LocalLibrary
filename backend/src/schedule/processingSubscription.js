const { CronJob } = require('cron');
const { sendNotification } = require('../utils/sendNotificationToTelegram');
const queries = require('./queries');

const sendNotificationIfBookAvailable = async (subscription) => {
  const [book] = await queries.getBookById(subscription.bookId);
  if (book.amount === 0) {
    const [user] = await queries.getUserById(subscription.userId);
    await sendNotification(user.telegramId, `Book with title ${book.title} is available now`);
    await queries.deleteSubscriptionByUserAndBookId(subscription.bookId, subscription.userId);
  }
};

const jobFunction = async () => {
  const subscriptions = await queries.getAllSubscription();
  const promises = subscriptions.map(sendNotificationIfBookAvailable);
  await Promise.all(promises);
};

// eslint-disable-next-line no-new
new CronJob('0 */2 * * *', jobFunction, null, true, 'Europe/Kiev', this, true);
