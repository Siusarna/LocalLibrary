const queries = require('./queries');
const parse = require('./parser');
const { evaluate, toRPN } = require('./eval');

const search = async ({ query }) => {
  const infixExpression = parse(query);
  const expression = toRPN(infixExpression);
  const parsedQuery = evaluate(expression);
  const books = queries.getBooksByQuery(parsedQuery);
  return books;
};

module.exports = { search };
