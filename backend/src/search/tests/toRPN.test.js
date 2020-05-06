/* eslint-disable no-undef */
const chai = require('chai');
const { toRPN } = require('../eval');

chai.should();

describe('Converter to reversed polish notation', () => {
  it('should return expression in reversed polish notation 1', () => {
    const result = toRPN([
      { value: 'title', type: 'operand', operandType: 'field' },
      { value: '=', type: 'binaryOperator' },
      { value: 'symposium', type: 'operand', operandType: 'text' },
    ]);
    result.should.be.an('array');
    result.should.be.deep.equal([
      { value: 'title', type: 'operand', operandType: 'field' },
      { value: 'symposium', type: 'operand', operandType: 'text' },
      { value: '=', type: 'binaryOperator' },
    ]);
  });
  it('should return expression in reversed polish notation and handle brackets right', () => {
    const result = toRPN([
      { value: 'title', type: 'operand', operandType: 'field' },
      { value: '=', type: 'binaryOperator' },
      { value: 'symposium', type: 'operand', operandType: 'text' },
      { value: 'or', type: 'binaryOperator' },
      { value: '(' },
      { value: 'rating', type: 'operand', operandType: 'field' },
      { value: '>', type: 'binaryOperator' },
      { value: 3, type: 'operand', operandType: 'number' },
      { value: 'and', type: 'binaryOperator' },
      { value: 'rating', type: 'operand', operandType: 'field' },
      { value: '<', type: 'binaryOperator' },
      { value: 4, type: 'operand', operandType: 'number' },
      { value: ')' },
      { value: 'or', type: 'binaryOperator' },
      { value: 'rating', type: 'operand', operandType: 'field' },
      { value: '<', type: 'binaryOperator' },
      { value: 2, type: 'operand', operandType: 'number' },
    ]);
    result.should.be.an('array');
    result.should.be.deep.equal([
      { value: 'title', type: 'operand', operandType: 'field' },
      { value: 'symposium', type: 'operand', operandType: 'text' },
      { value: '=', type: 'binaryOperator' },
      { value: 'rating', type: 'operand', operandType: 'field' },
      { value: 3, type: 'operand', operandType: 'number' },
      { value: '>', type: 'binaryOperator' },
      { value: 'rating', type: 'operand', operandType: 'field' },
      { value: 4, type: 'operand', operandType: 'number' },
      { value: '<', type: 'binaryOperator' },
      { value: 'and', type: 'binaryOperator' },
      { value: 'or', type: 'binaryOperator' },
      { value: 'rating', type: 'operand', operandType: 'field' },
      { value: 2, type: 'operand', operandType: 'number' },
      { value: '<', type: 'binaryOperator' },
      { value: 'or', type: 'binaryOperator' },
    ]);
  });
  it('should throw error if brackets placed wrong 1', () => {
    try {
      toRPN([
        { value: 'title', type: 'operand', operandType: 'field' },
        { value: '=', type: 'binaryOperator' },
        { value: 'symposium', type: 'operand', operandType: 'text' },
        { value: 'or', type: 'binaryOperator' },
        { value: '(' },
        { value: 'rating', type: 'operand', operandType: 'field' },
        { value: '>', type: 'binaryOperator' },
        { value: 3, type: 'operand', operandType: 'number' },
        { value: 'and', type: 'binaryOperator' },
        { value: 'rating', type: 'operand', operandType: 'field' },
        { value: '<', type: 'binaryOperator' },
        { value: 4, type: 'operand', operandType: 'number' },
        { value: 'or', type: 'binaryOperator' },
        { value: 'rating', type: 'operand', operandType: 'field' },
        { value: '<', type: 'binaryOperator' },
        { value: 2, type: 'operand', operandType: 'number' },
      ]);
    } catch (error) {
      error.should.be.an('error');
      error.message.should.be.equal('Error in brackets');
    }
  });
  it('should throw error if brackets placed wrong 2', () => {
    try {
      toRPN([
        { value: 'title', type: 'operand', operandType: 'field' },
        { value: '=', type: 'binaryOperator' },
        { value: 'symposium', type: 'operand', operandType: 'text' },
        { value: 'or', type: 'binaryOperator' },
        { value: 'rating', type: 'operand', operandType: 'field' },
        { value: '>', type: 'binaryOperator' },
        { value: 3, type: 'operand', operandType: 'number' },
        { value: 'and', type: 'binaryOperator' },
        { value: 'rating', type: 'operand', operandType: 'field' },
        { value: '<', type: 'binaryOperator' },
        { value: 4, type: 'operand', operandType: 'number' },
        { value: ')' },
        { value: 'or', type: 'binaryOperator' },
        { value: 'rating', type: 'operand', operandType: 'field' },
        { value: '<', type: 'binaryOperator' },
        { value: 2, type: 'operand', operandType: 'number' },
      ]);
    } catch (error) {
      error.should.be.an('error');
      error.message.should.be.equal('Error in brackets');
    }
  });
  it('should throw error if brackets placed wrong 3', () => {
    try {
      toRPN([
        { value: 'title', type: 'operand', operandType: 'field' },
        { value: '=', type: 'binaryOperator' },
        { value: 'symposium', type: 'operand', operandType: 'text' },
        { value: 'or', type: 'binaryOperator' },
        { value: '(' },
        { value: 'rating', type: 'operand', operandType: 'field' },
        { value: '>', type: 'binaryOperator' },
        { value: 3, type: 'operand', operandType: 'number' },
        { value: 'and', type: 'binaryOperator' },
        { value: 'rating', type: 'operand', operandType: 'field' },
        { value: '<', type: 'binaryOperator' },
        { value: 4, type: 'operand', operandType: 'number' },
        { value: ')' },
        { value: 'or', type: 'binaryOperator' },
        { value: 'rating', type: 'operand', operandType: 'field' },
        { value: '<', type: 'binaryOperator' },
        { value: 2, type: 'operand', operandType: 'number' },
        { value: ')' },
      ]);
    } catch (error) {
      error.should.be.an('error');
      error.message.should.be.equal('Error in brackets');
    }
  });
});
