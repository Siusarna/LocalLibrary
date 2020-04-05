const queries = require('./queries');

const addAuthor = async ({
  firstName, lastName, yearOfBirthday, yearOfDeath,
}) => {
  const [author] = await queries.getAuthorByName(firstName, lastName);
  if (author) {
    throw new Error('Author with this name already exists');
  }
  return queries.addAuthor({
    firstName,
    lastName,
    yearOfBirthday,
    yearOfDeath,
  });
};

const deleteAuthor = async ({ id }) => {
  const [author] = await queries.getAuthorById(id);
  if (!author) {
    throw new Error('This authors doesnt exist');
  }
  await queries.deleteAuthorById(id);
};

const getAllAuthors = () => queries.getAllAuthors();

const getAuthor = ({ id }) => queries.getAuthorById(id);

const updateAuthor = ({ id, ...newData }) => queries.updateAuthorById(id, { ...newData });

module.exports = {
  addAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthor,
  updateAuthor,
};
