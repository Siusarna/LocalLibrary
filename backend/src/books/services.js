const queries = require('./queries');

const addAuthor = async ({
  firstName, lastName, yearOfBirthday, yearOfDeath,
}) => {
  const [author] = await queries.getAuthorByName(firstName, lastName);
  if (author) {
    throw new Error('Author with this name already exists');
  }
  await queries.addAuthor(firstName, lastName, yearOfBirthday, yearOfDeath);
};

const deleteAuthor = async ({ id }) => {
  const [author] = await queries.getAuthorById(id);
  if (!author) {
    throw new Error('This author doesnt exist');
  }
  await queries.deleteAuthorById(id);
};

const getAllAuthors = async () => queries.getAllAuthors();

const getAuthor = async ({ id }) => queries.getAuthorById(id);

const updateAuthor = async ({ id, ...newData }) => queries.updateAuthorById(id, newData);

module.exports = {
  addAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthor,
  updateAuthor,
};
