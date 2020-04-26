/* eslint-disable no-undef */
const chai = require('chai');
const parse = require('../parser');

chai.should();

describe('Query string parser', () => {
  it('should return array of operands and operators: 1', () => {
    const result = parse('title = "Symposium"');
    result.should.be.an('array');
    result.should.be.deep.equal([
      { value: 'title', type: 'operand', operandType: 'field' },
      { value: '=', type: 'binaryOperator' },
      { value: 'symposium', type: 'operand', operandType: 'text' },
    ]);
  });
  it('should return array of operands and operators: 2', () => {
    const result = parse('title = "Symposium" or not rating < 4');
    result.should.be.an('array');
    result.should.be.deep.equal([
      { value: 'title', type: 'operand', operandType: 'field' },
      { value: '=', type: 'binaryOperator' },
      { value: 'symposium', type: 'operand', operandType: 'text' },
      { value: 'or', type: 'binaryOperator' },
      { value: 'not', type: 'unaryOperator' },
      { value: 'rating', type: 'operand', operandType: 'field' },
      { value: '<', type: 'binaryOperator' },
      { value: 4, type: 'operand', operandType: 'number' },
    ]);
  });
  it('should return array of operands and operators: 3', () => {
    const result = parse('title = "Apology of Socrates" or rating > 4');
    result.should.be.an('array');
    result.should.be.deep.equal([
      { value: 'title', type: 'operand', operandType: 'field' },
      { value: '=', type: 'binaryOperator' },
      {
        value: 'apology of socrates',
        type: 'operand',
        operandType: 'text',
      },
      { value: 'or', type: 'binaryOperator' },
      { value: 'rating', type: 'operand', operandType: 'field' },
      { value: '>', type: 'binaryOperator' },
      { value: 4, type: 'operand', operandType: 'number' },
    ]);
  });
  it('should replace author = x with (author.firstName = x or author.lastName = x)', () => {
    const result = parse('author = "Plato"');
    result.should.be.an('array');
    result.should.be.deep.equal([
      { value: '(' },
      {
        value: 'author."firstName"',
        type: 'operand',
        operandType: 'field',
      },
      { value: '=', type: 'binaryOperator' },
      { value: 'plato', type: 'operand', operandType: 'text' },
      { value: 'or', type: 'binaryOperator' },
      {
        value: 'author."lastName"',
        type: 'operand',
        operandType: 'field',
      },
      { value: '=', type: 'binaryOperator' },
      { value: 'plato', type: 'operand', operandType: 'text' },
      { value: ')' },
    ]);
  });
  it(
    'should replace author = "x y" with ((author.firstName = x and author.secondName = y) '
    + 'or (author.firstName = y and author.secondName = x))', () => {
      const result = parse('author = "Andey Platonov"');
      result.should.be.an('array');
      result.should.be.deep.equal([
        { value: '(' },
        { value: '(' },
        {
          value: 'author."firstName"',
          type: 'operand',
          operandType: 'field',
        },
        { value: '=', type: 'binaryOperator' },
        { value: 'andey', type: 'operand', operandType: 'text' },
        { value: 'and', type: 'binaryOperator' },
        {
          value: 'author."lastName"',
          type: 'operand',
          operandType: 'field',
        },
        { value: '=', type: 'binaryOperator' },
        { value: 'platonov', type: 'operand', operandType: 'text' },
        { value: ')' },
        { value: 'or', type: 'binaryOperator' },
        { value: '(' },
        {
          value: 'author."firstName"',
          type: 'operand',
          operandType: 'field',
        },
        { value: '=', type: 'binaryOperator' },
        { value: 'platonov', type: 'operand', operandType: 'text' },
        { value: 'and', type: 'binaryOperator' },
        {
          value: 'author."lastName"',
          type: 'operand',
          operandType: 'field',
        },
        { value: '=', type: 'binaryOperator' },
        { value: 'andey', type: 'operand', operandType: 'text' },
        { value: ')' },
        { value: ')' },
      ]);
    },
  );
  it('should replace "x" with "author = x or title = x"', () => {
    const result = parse('Andrey Platonov');
    result.should.be.an('array');
    result.should.be.deep.equal([
      { value: '(' },
      { value: '(' },
      {
        value: 'author."firstName"',
        type: 'operand',
        operandType: 'field',
      },
      { value: '=', type: 'binaryOperator' },
      { value: 'andrey', type: 'operand', operandType: 'text' },
      { value: 'and', type: 'binaryOperator' },
      {
        value: 'author."lastName"',
        type: 'operand',
        operandType: 'field',
      },
      { value: '=', type: 'binaryOperator' },
      { value: 'platonov', type: 'operand', operandType: 'text' },
      { value: ')' },
      { value: 'or', type: 'binaryOperator' },
      { value: '(' },
      {
        value: 'author."firstName"',
        type: 'operand',
        operandType: 'field',
      },
      { value: '=', type: 'binaryOperator' },
      { value: 'platonov', type: 'operand', operandType: 'text' },
      { value: 'and', type: 'binaryOperator' },
      {
        value: 'author."lastName"',
        type: 'operand',
        operandType: 'field',
      },
      { value: '=', type: 'binaryOperator' },
      { value: 'andrey', type: 'operand', operandType: 'text' },
      { value: ')' },
      { value: ')' },
      { value: 'or', type: 'binaryOperator' },
      { value: 'title', type: 'operand', operandType: 'field' },
      { value: '=', type: 'binaryOperator' },
      { value: 'andrey platonov', type: 'operand', operandType: 'text' },
    ]);
  });
  it('should throw an error if quotes placed wrong', () => {
    try {
      parse('title = "Symplosuim or rating > 4');
    } catch (error) {
      error.should.be.an('error');
      error.message.should.be.equal('Error in quotes');
    }
  });
  it('should throw an error if operand type is unknown', () => {
    try {
      parse('title = "Symplosuim" or hmm > 4');
    } catch (error) {
      error.should.be.an('error');
      error.message.should.be.equal('Unknown operand type: hmm');
    }
  });
});
