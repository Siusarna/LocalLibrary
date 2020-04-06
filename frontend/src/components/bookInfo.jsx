import React from 'react';
import ImageTextContainer from './imageTextContainer';
import LeftRightContainer from './leftRightContainer';
import SectionTitle from './sectionTitle';

// Fake data
// Must be replaced by request on server
const books = {
  '1': {
    title: 'Lorem Ipsum',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut' +
      'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi' +
      'ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum' +
      'dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia' +
      'deserunt mollit anim id est laborum.',
    author: 'Jhon Doe',
    authorID: '1',
    yearOfPublishing: '1984',
    availibleTime: '1 month',
    rating: '4.5',
    isbn: '978-3-16-148410-0',
    cover: 'https://res.cloudinary.com/domvzvfy1/image/upload/v1586096630/23377249_cgzt8c.jpg',
    availible: true,
  }
}

const BookInfo = () => {
  const book = books['1'];

  const orderBook = () => {};
  const followBook = () => {};

  return (
    <div className='BookInfo'>
      <ImageTextContainer src={book.cover}>
        <div className='title'>
          <LeftRightContainer
            left={book.title}
            right={<>
              <img src='/star.png' className='starIcon' />
              {book.rating}
            </>}
          />
        </div>
        <SectionTitle to={'/authors/' + book.authorID} text={book.author}/>
        <p>{'ISBN: ' + book.isbn}</p>
        <p>{'Published in: ' + book.yearOfPublishing}</p>
        <p>{book.description}</p>
      </ImageTextContainer>       
      <button className='dark' onClick={book.availible ? orderBook : followBook}>
        {book.availible ? ('Order for ' + book.availibleTime) : 'Follow'}
      </button>
    </div>
  )
}

export default BookInfo;