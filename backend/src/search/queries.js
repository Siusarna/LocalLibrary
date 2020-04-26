/* eslint-disable func-names */
const knex = require('../libs/knex');

const getBooksByQuery = (query) => knex('book')
  .join('author', 'authorId', '=', 'author.id')
  .select('book.id', 'authorId', 'title',
    'book.photo', 'rating', 'book.description',
    'amount', 'isbn', 'yearOfPublishing',
    'author.firstName', 'author.lastName')
  .where(query);

const getLikeSubquery = (field, value) => function () {
  this.whereRaw(`LOWER(${field}) LIKE '%' || ? || '%' `, [value]);
};

const getEqualsSubquery = (field, value) => function () {
  this.whereRaw(`LOWER(${field}) LIKE ? `, [value]);
};

const getMoreSubquery = (field, value) => function () {
  this.where(field, '>', value);
};

const getLessSubquery = (field, value) => function () {
  this.where(field, '<', value);
};

const getAndSubquery = (subquery1, subquery2) => function () {
  this.where(subquery1).andWhere(subquery2);
};

const getOrSubquery = (subquery1, subquery2) => function () {
  this.where(subquery1).orWhere(subquery2);
};

const getNotSubquery = (subquery) => function () {
  this.whereNot(subquery);
};

module.exports = {
  getBooksByQuery,
  getLikeSubquery,
  getEqualsSubquery,
  getMoreSubquery,
  getLessSubquery,
  getAndSubquery,
  getOrSubquery,
  getNotSubquery,
};
