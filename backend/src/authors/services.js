const queries = require('./queries');
const { uploadFile } = require('../utils/s3-bucket');

const addAuthor = async ({
  firstName, lastName, yearOfBirthday, yearOfDeath, photo, description,
}) => {
  const [author] = await queries.getAuthorByName(firstName, lastName);
  if (author) {
    throw new Error('Author with this name already exists');
  }
  const [newAuthor] = await queries.addAuthor({
    firstName,
    lastName,
    yearOfBirthday,
    yearOfDeath,
    description,
  });
  const photoUri = await uploadFile(photo, 'Author', newAuthor.id);
  return queries.updateAuthorById(newAuthor.id, { photo: photoUri });
};

const deleteAuthor = async ({ id }) => {
  const [author] = await queries.getAuthorById(id);
  if (!author) {
    throw new Error('This authors doesnt exist');
  }
  await queries.deleteAuthorById(id);
};

const getAllAuthors = () => queries.getAllAuthors();

const getAuthor = async ({ id }) => {
  const [author] = await queries.getAuthorById(id);
  if (!author) {
    throw new Error('Author with this id doesnt exist');
  }
  return author;
};

const updateAuthor = async ({ id, ...newData }) => {
  const [author] = await queries.getAuthorById(id);
  if (!author) {
    throw new Error('Author with this id doesnt exist');
  }
  if (newData.photo) {
    newData.photo = await uploadFile(newData.photo, 'Author', author.id);
  }
  return queries.updateAuthorById(id, { ...newData });
};

module.exports = {
  addAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthor,
  updateAuthor,
};
