const queries = require('./queries');

const checkArg = (arg, expectedType) => {
  if (!arg) throw new Error('No argument');
  if (arg.operandType !== expectedType) {
    throw new Error(`Type error. Expected type: ${expectedType}, your type: ${arg.operandType}`);
  }
};

const operators = {
  '=': {
    priority: 3,
    isAssociative: false,
    invoke(arg1, arg2) {
      checkArg(arg1, 'field');
      checkArg(arg2, 'text');
      return queries.getLikeSubquery(arg1.value, arg2.value);
    },
  },
  '==': {
    priority: 3,
    isAssociative: false,
    invoke(arg1, arg2) {
      checkArg(arg1, 'field');
      checkArg(arg2, 'text');
      return queries.getEqualsSubquery(arg1.value, arg2.value);
    },
  },
  '>': {
    priority: 3,
    isAssociative: false,
    invoke(arg1, arg2) {
      checkArg(arg1, 'field');
      checkArg(arg2, 'number');
      return queries.getMoreSubquery(arg1.value, arg2.value);
    },
  },
  '<': {
    priority: 3,
    isAssociative: false,
    invoke(arg1, arg2) {
      checkArg(arg1, 'field');
      checkArg(arg2, 'number');
      return queries.getLessSubquery(arg1.value, arg2.value);
    },
  },
  and: {
    priority: 1,
    isAssociative: true,
    invoke(arg1, arg2) {
      checkArg(arg1, 'subquery');
      checkArg(arg2, 'subquery');
      return queries.getAndSubquery(arg1.value, arg2.value);
    },
  },
  or: {
    priority: 1,
    isAssociative: true,
    invoke(arg1, arg2) {
      checkArg(arg1, 'subquery');
      checkArg(arg2, 'subquery');
      return queries.getOrSubquery(arg1.value, arg2.value);
    },
  },
  not: {
    priority: 2,
    isAssociative: true,
    invoke(arg) {
      checkArg(arg, 'subquery');
      return queries.getNotSubquery(arg.value);
    },
  },
  '(': {
    isAssociative: false,
    priority: 0,
  },
};

const toRPN = (expression) => {
  const result = [];
  const stack = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const element of expression) {
    if (element.type === 'operand') {
      result.push(element);
    } else if (element.type === 'unaryOperator') {
      stack.push(element);
    } else if (element.value === '(') {
      stack.push(element);
    } else if (element.value === ')') {
      while (stack.length > 0) {
        const topElem = stack.pop();
        if (topElem.value === '(') {
          break;
        } else {
          result.push(topElem);
        }
        if (stack.length === 0) {
          throw new Error('Error in brackets');
        }
      }
    } else if (element.type === 'binaryOperator') {
      const curElem = element;
      while (stack.length > 0) {
        const topElem = stack.pop();
        if (
          operators[topElem.value].priority > operators[curElem.value].priority
          || (operators[topElem.value].isAssociative
            && operators[topElem.value].priority === operators[curElem.value].priority)
        ) {
          result.push(topElem);
        } else {
          stack.push(topElem);
          break;
        }
      }
      stack.push(curElem);
    }
  }

  while (stack.length > 0) {
    const elem = stack.pop();
    if (elem.value === '(') throw new Error('Error in brackets');
    result.push(elem);
  }

  return result;
};

const subQueryToElem = (value) => ({
  operandType: 'subquery',
  value,
});

const evaluate = (expression) => {
  expression.reverse();
  const stack = [];

  while (expression.length > 0) {
    const expTop = expression.pop();
    if (expTop.type === 'operand') {
      stack.push(expTop);
    } else if (expTop.type === 'unaryOperator') {
      const arg1 = stack.pop();
      stack.push(subQueryToElem(operators[expTop.value].invoke(arg1)));
    } else if (expTop.type === 'binaryOperator') {
      const arg2 = stack.pop();
      const arg1 = stack.pop();
      stack.push(subQueryToElem(operators[expTop.value].invoke(arg1, arg2)));
    }
  }
  return stack[0].value;
};

module.exports = { evaluate, toRPN };
