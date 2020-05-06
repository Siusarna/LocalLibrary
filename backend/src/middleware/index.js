const fs = require('fs');
const path = require('path');

const addMiddlewareForApp = (app) => {
  const middlewares = fs.readdirSync(path.join(__dirname, './moduleForApp'))
    .sort();
  // eslint-disable-next-line global-require,import/no-dynamic-require
  middlewares.forEach((middleware) => app.use(require(`./moduleForApp/${middleware}`)));
};

module.exports = (app) => {
  addMiddlewareForApp(app);
};
