function generateErrMessage(errArr) {
  return Object.values(errArr)
    .map((err) => err.message)
    .join(' ');
}

module.exports = async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (e) {
    ctx.status = e.status || 500;
    let message = e.errors ? generateErrMessage(e.errors) : e.message;

    if (e.name === 'ValidationError') {
      message = e.details[0].message;
    }
    ctx.body = {
      success: false,
      message,
    };
  }
};
