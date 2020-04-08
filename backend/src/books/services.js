const queries = require('./queries');
const { uploadFile } = require('../utils/s3-bucket');

const addBook = async ({
  authorFirstName, authorLastName, yearOfPublishing, photo, description, title, isbn, available,
}) => {
  const [author] = await queries.getAuthorByName(authorFirstName, authorLastName);
  if (!author) {
    throw new Error('Author with this name doesnt exists');
  }
  const [book] = await queries.getBookByIsbn(isbn);
  if (book) {
    throw new Error('Book with this isbn already exists');
  }
  const [newBook] = await queries.addBook({
    authorId: author.id,
    yearOfPublishing,
    description,
    title,
    isbn,
    available,
  });
  const photoUri = await uploadFile(photo, 'Books', newBook.id);
  await queries.updateBookById(newBook.id, { photo: photoUri });
  return queries.getBookById(newBook.id);
};

const deleteBook = async ({ id }) => {
  const [book] = await queries.getBookById(id);
  if (!book) {
    throw new Error('This book doesnt exist');
  }
  await queries.deleteBookById(id);
};

const getAllBooks = () => queries.getAllBooks();

const getBook = async ({ id }) => {
  const [book] = await queries.getBookById(id);
  if (!book) {
    throw new Error('Book with this id doesnt exist');
  }
  return book;
};

const updateBook = async ({
  id, authorFirstName, authorLastName, rating, isbn, ...newData
}) => {
  const [book] = await queries.getBookById(id);
  if (!book) {
    throw new Error('Book with this id doesnt exist');
  }
  if (authorFirstName && authorLastName) {
    const [author] = await queries.getAuthorByName(authorFirstName, authorLastName);
    if (!author) {
      throw new Error('Author with this name doesnt exist');
    }
    newData.authorId = author.id;
  }
  if (newData.photo) {
    newData.photo = await uploadFile(newData.photo, 'Book', book.id);
  }
  if (isbn) {
    const [existBook] = await queries.getBookByIsbn(isbn);
    if (existBook) {
      throw new Error('Book with this isbn already exists');
    }
  }
  await queries.updateBookById(book.id, { ...newData });
  return queries.getBookById(book.id);
};

module.exports = {
  addBook,
  deleteBook,
  getAllBooks,
  getBook,
  updateBook,
};
