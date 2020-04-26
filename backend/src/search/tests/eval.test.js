/* eslint-disable no-undef */
const chai = require('chai');
const { evaluate } = require('../eval');

chai.should();

describe('Evaluate reverse polish notation', () => {
  it('should return function', () => {
    const result = evaluate([
      { value: 'rating', type: 'operand', operandType: 'field' },
      { value: 4, type: 'operand', operandType: 'number' },
      { value: '>', type: 'binaryOperator' },
    ]);
    result.should.be.a('function');
  });
  it('should throw type error, where number expected', () => {
    try {
      evaluate([
        { value: 'rating', type: 'operand', operandType: 'field' },
        { value: '4', type: 'operand', operandType: 'text' },
        { value: '>', type: 'binaryOperator' },
      ]);
    } catch (error) {
      error.should.be.an('error');
      error.message.should.be.equal('Type error. Expected type: number, your type: text');
    }
  });
  it('should throw type error, where subquery expected', () => {
    try {
      evaluate([
        { value: 4, type: 'operand', operandType: 'number' },
        { value: 'not', type: 'unaryOperator' },
      ]);
    } catch (error) {
      error.should.be.an('error');
      error.message.should.be.equal('Type error. Expected type: subquery, your type: number');
    }
  });
  it('should throw type error, where text expected', () => {
    try {
      evaluate([
        { value: 'title', type: 'operand', operandType: 'field' },
        { value: 4, type: 'operand', operandType: 'number' },
        { value: '=', type: 'binaryOperator' },
      ]);
    } catch (error) {
      error.should.be.an('error');
      error.message.should.be.equal('Type error. Expected type: text, your type: number');
    }
  });
  it('should throw type error, where field expected', () => {
    try {
      evaluate([
        { value: 4, type: 'operand', operandType: 'number' },
        { value: 4, type: 'operand', operandType: 'number' },
        { value: '>', type: 'binaryOperator' },
      ]);
    } catch (error) {
      error.should.be.an('error');
      error.message.should.be.equal('Type error. Expected type: field, your type: number');
    }
  });
});
