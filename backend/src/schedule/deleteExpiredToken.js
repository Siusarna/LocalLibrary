const { CronJob } = require('cron');
const config = require('config');
const queries = require('./queries');
const { parseTimeFromConfig } = require('../utils/parseConfig');


const isExpiredAndDelete = async (token) => {
  const now = new Date();
  if ((now - token.updatedAt) > parseTimeFromConfig(config.jwt.tokens.refresh.expiresIn)) {
    await queries.deleteTokenByUserId(token.userId);
  }
};

const jobFunction = async () => {
  const tokens = await queries.getAllToken();
  if (tokens.length !== 0) {
    const promises = tokens.map(isExpiredAndDelete);
    await Promise.all(promises);
  }
};

// eslint-disable-next-line no-new
new CronJob('*/1 * * * *', jobFunction, null, true, 'Europe/Kiev');
