const strProxy = (string) => ({
  str: string,
  toLowerCase() {
    this.str = this.str.toLowerCase();
    return this;
  },
  replace(a, b) {
    this.str = this.str.replace(a, b);
    return this;
  },
  addSpaces() {
    this.str = this.str.replace(/[=@()"']/g, ' $& ');
    return this;
  },
  deleteExtraSpaces() {
    this.str = this.str.replace(/ +/g, ' ');
    return this;
  },
  fixYear() {
    this.str = this.str.replace(/( |^)year( |$)/g, ' yearOfPublishing ');
    return this;
  },
  fixShortQuery() {
    if (this.str.match(/^.*(( and )|( or )|(not )).*$/)) return this;
    this.str = this.str.replace(/^([\w ]+)$/g, 'author = "$1" or title = "$1"');
    return this;
  },
  fixSingleName() {
    this.str = this.str.replace(
      /author =(=?) ["'](_[a-zA-Z0-9]+_)["']/g,
      ' ( author.firstName =$1 "$2" or author.lastName =$1 "$2" ) ',
    );
    return this;
  },
  fixFirstLastName() {
    this.str = this.str.replace(
      /author =(=?) ["']_([a-zA-Z0-9]+)_([a-zA-Z0-9]+)_["']/g,
      ' ( ( author.firstName =$1 "_$2_" and author.lastName =$1 "_$3_" ) or '
      + ' ( author.firstName =$1 "_$3_" and author.lastName =$1 "_$2_" ) ) ',
    );
    return this;
  },
  fixName() {
    this.str = this.str.replace(
      /author =(=?) ["'](_[a-zA-Z0-9]+_[a-zA-Z0-9]+_[_a-zA-Z0-9]+_)["']/g,
      ' ( author.firstName =$1 "$2" or author.lastName =$1 "$2" ) ',
    );
    return this;
  },
  deleteSpacesInQuotes() {
    let isInQuotes = false;
    const str = this.str.split('');
    for (let i = 0; i < str.length; i += 1) {
      if (isInQuotes && str[i] === ' ') str[i] = '_';
      if (str[i] === '"' || str[i] === '\'') isInQuotes = !isInQuotes;
    }
    if (isInQuotes) {
      throw new Error('Error in quotes');
    }
    this.str = str.join('');
    return this;
  },
});

const binaryOperators = ['=', '==', 'and', 'or', '>', '<'];
const unaryOperators = ['not'];
const fields = ['author.firstName', 'author.lastName', 'title', 'description', 'yearOfPublishing', 'isbn', 'rating'];
const fieldsConvert = {
  'author.firstName': 'author."firstName"',
  'author.lastName': 'author."lastName"',
  title: 'title',
  description: 'description',
  yearOfPublishing: '"yearOfPublishing"',
  isbn: 'isbn',
  rating: 'rating',
};

const getType = (value) => {
  const result = { value };
  const assignType = (type, operandType) => {
    Object.assign(result, { type });
    if (operandType) Object.assign(result, { operandType });
  };

  if (binaryOperators.includes(value)) {
    assignType('binaryOperator');
  } else if (unaryOperators.includes(value)) {
    assignType('unaryOperator');
  } else if (fields.includes(value)) {
    assignType('operand', 'field');
    result.value = fieldsConvert[value];
  } else if (typeof value === 'string' && value.match(/^["'].*["']$/)) {
    assignType('operand', 'text');
    result.value = value
      .slice(1, value.length - 1)
      .replace(/_/g, ' ')
      .trim();
  // eslint-disable-next-line no-restricted-globals
  } else if (!isNaN(value)) {
    assignType('operand', 'number');
    result.value = parseFloat(value);
  } else if (value !== '(' && value !== ')') {
    throw new Error(`Unknown operand type: ${value.toString()}`);
  }

  return result;
};

const parse = (str) => strProxy(str)
  .toLowerCase()
  .replace(/-/g, ' ')
  .replace(/==/g, '@')
  .fixShortQuery()
  .addSpaces()
  .deleteSpacesInQuotes()
  .deleteExtraSpaces()
  .replace(/@/g, '==')
  .fixYear()
  .fixSingleName()
  .fixFirstLastName()
  .fixName()
  .deleteExtraSpaces()
  .str
  .trim()
  .split(' ')
  .map(getType);

module.exports = parse;
