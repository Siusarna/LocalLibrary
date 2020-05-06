const knex = require('../libs/knex');

const addNews = ({
  header, shortDescription, description,
}) => knex('news')
  .insert({
    header,
    shortDescription,
    description,
  })
  .returning(['*']);

const getNewsById = (id) => knex('news')
  .where({ 'news.id': id })
  .select('*');

const deleteNewsById = (id) => knex('news')
  .where({ id })
  .del();

const getAllNews = () => knex('news')
  .select('id', 'photo', 'shortDescription', 'header');

const updateNewsById = (id, newData) => knex('news')
  .where({ id })
  .update({ ...newData });


module.exports = {
  addNews,
  getNewsById,
  deleteNewsById,
  getAllNews,
  updateNewsById,
};
