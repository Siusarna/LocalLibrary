/* eslint-disable no-undef */
const chai = require('chai');
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);
chai.should();

const server = require('../../../app');
const queries = require('../../accounts/queries');
const { addAuthor, deleteAuthorById } = require('../../authors/queries');
const { addBook, deleteBookById } = require('../queries');
const TestUtil = require('../../utils/test')(server);
const { createAndUpdateTokens } = require('../../utils/jwtToken');
const { deleteAllFileFromFolder } = require('../../utils/s3-bucket');

const credentialForRegisterLibrarian = {
  email: 'siusarnasite@gmail.com',
  password: '1234567a',
  confirmPassword: '1234567a',
  salt: 'test',
  firstName: 'Test',
  lastName: 'Testovich',
  phone: '+380682898284',
  city: 'Kyiv',
  address: 'Yan',
  age: '18',
  role: 'librarian',
  // eslint-disable-next-line max-len
  photo: 'data:image/png;base64,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',
};

const credentialForRegisterAuthor = {
  firstName: 'Author',
  lastName: 'AuthorLastName',
  yearOfBirthday: 1500,
  yearOfDeath: 1800,
  // eslint-disable-next-line max-len
  photo: 'https://local-library.s3.eu-central-1.amazonaws.com/User/30/5f5b3bf7-5da6-4e09-b3e3-bb78812fc626.png',
  // eslint-disable-next-line max-len
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
};

const credentialForChangingBook = {
  authorFirstName: 'Author',
  authorLastName: 'AuthorLastName',
  yearOfPublishing: '1821',
  title: 'Book test999',
  available: 'false',
  isbn: '1234764281',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
};

const uriPhoto = 'https://local-library.s3.eu-central-1.amazonaws.com/User/30/5f5b3bf7-5da6-4e09-b3e3-bb78812fc626.png';

const credentialForAddBook = {
  authorFirstName: 'Author',
  authorLastName: 'AuthorLastName',
  yearOfPublishing: '1814',
  title: 'Book test',
  available: 'true',
  isbn: '1234534281',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
  photo: uriPhoto,
};

const credentialForAddBook2 = {
  authorFirstName: 'Author',
  authorLastName: 'AuthorLastName',
  yearOfPublishing: '1814',
  title: 'Book test',
  available: 'true',
  isbn: '123543523281',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
  // eslint-disable-next-line max-len
  photo: 'data:image/png;base64,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',
};

describe('Books CRUD', () => {
  let token;
  let author;
  let book;
  before(async () => {
    const { confirmPassword, photo, ...rest } = credentialForRegisterLibrarian;
    const [user] = await queries.insertNewUser({
      ...rest,
      photo: uriPhoto,
    });
    author = await addAuthor(credentialForRegisterAuthor);
    token = await createAndUpdateTokens(user.id);
    book = await addBook(credentialForAddBook);
  });
  it('should get all books on /api/books', async () => {
    await TestUtil.checkGettingResource(
      {
        url: '/api/books',
      },
      {
        type: 'array',
      },
    );
  });

  it('should create new book on /api/book', async () => {
    await TestUtil.checkPostingResource(
      {
        url: '/api/books',
        method: 'post',
        body: {
          ...credentialForAddBook2,
        },
        headers: {
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        },
      },
      [
        {
          name: 'id',
          type: 'number',
        },
        {
          name: 'authorId',
          type: 'number',
        },
        {
          name: 'title',
          type: 'string',
        },
        {
          name: 'photo',
          type: 'string',
        },
        {
          name: 'description',
          type: 'string',
        },
        {
          name: 'available',
          type: 'boolean',
        },
        {
          name: 'isbn',
          type: 'string',
        },
        {
          name: 'yearOfPublishing',
          type: 'number',
        },
        {
          name: 'firstName',
          type: 'string',
        },
        {
          name: 'lastName',
          type: 'string',
        },
      ],
    );
  });

  it('should get book on /api/books/:id', async () => {
    await TestUtil.checkGettingResource(
      {
        url: `/api/books/${book[0].id + 1}`,
      },
      [
        {
          name: 'id',
          type: 'number',
        },
        {
          name: 'authorId',
          type: 'number',
        },
        {
          name: 'title',
          type: 'string',
        },
        {
          name: 'photo',
          type: 'string',
        },
        {
          name: 'description',
          type: 'string',
        },
        {
          name: 'available',
          type: 'boolean',
        },
        {
          name: 'isbn',
          type: 'string',
        },
        {
          name: 'yearOfPublishing',
          type: 'number',
        },
        {
          name: 'firstName',
          type: 'string',
        },
        {
          name: 'lastName',
          type: 'string',
        },
      ],
    );
  });

  it('should change book on /api/book', async () => {
    await TestUtil.checkPostingResource(
      {
        url: '/api/books',
        method: 'put',
        body: {
          id: book[0].id + 1,
          ...credentialForChangingBook,
        },
        headers: {
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        },
      },
      [
        {
          name: 'id',
          type: 'number',
        },
        {
          name: 'authorId',
          type: 'number',
        },
        {
          name: 'title',
          type: 'string',
        },
        {
          name: 'photo',
          type: 'string',
        },
        {
          name: 'description',
          type: 'string',
        },
        {
          name: 'available',
          type: 'boolean',
        },
        {
          name: 'isbn',
          type: 'string',
        },
        {
          name: 'yearOfPublishing',
          type: 'number',
        },
        {
          name: 'firstName',
          type: 'string',
        },
        {
          name: 'lastName',
          type: 'string',
        },
      ],
    );
  });

  it('should delete book on /api/books', async () => {
    await TestUtil.checkPostingResource(
      {
        url: '/api/books',
        method: 'delete',
        body: {
          id: book[0].id + 1,
        },
        headers: {
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        },
      },
      [
        {
          name: 'success',
          type: 'string',
        },
        {
          name: 'message',
          type: 'string',
        },
      ],
    );
  });
  after(async () => {
    const [user] = await queries.getUserByEmail(credentialForRegisterLibrarian.email);
    await queries.deleteTokenByUserId(user.id);
    await queries.deleteUserByEmail(credentialForRegisterLibrarian.email);
    await deleteAllFileFromFolder('User', user.id);
    await deleteBookById(book[0].id);
    await deleteBookById(book[0].id + 1);
    await deleteAuthorById(author[0].id);
  });
});
