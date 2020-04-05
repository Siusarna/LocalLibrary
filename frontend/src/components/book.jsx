import React from 'react';
import { Link } from 'react-router-dom';
import LeftRightContainer from './leftRightContainer';

// Fake data
// Must be replaced by request on server
const books = {
  '1': {
    title: 'Lorem Ipsum',
    cover: 'https://res.cloudinary.com/domvzvfy1/image/upload/v1586096630/23377249_cgzt8c.jpg',
    author: 'John Doe',
    rating: 4.6,
  },
  '2': {
    title: 'Lorem Ipsum 2',
    cover: 'https://res.cloudinary.com/domvzvfy1/image/upload/v1586096630/23377249_cgzt8c.jpg',
    author: 'John Doe',
    rating: 5,
  },
  '3': {
    title: 'Lorem Ipsum 3',
    cover: 'https://res.cloudinary.com/domvzvfy1/image/upload/v1586096630/23377249_cgzt8c.jpg',
    author: 'John Doe',
    rating: 4.2,
  },
  '4': {
    title: 'Lorem Ipsum 4',
    cover: 'https://res.cloudinary.com/domvzvfy1/image/upload/v1586096630/23377249_cgzt8c.jpg',
    author: 'John Doe',
    rating: 2.8,
  },
  '5': {
    title: 'Sample Text',
    cover: 'https://res.cloudinary.com/domvzvfy1/image/upload/v1586096630/23377249_cgzt8c.jpg',
    author: 'John Doe',
    rating: 4.5,
  }
}

const Book = (props) => {
  const book = books[props.id];
  return (
    <div className='Book'>
      <Link to={'/books/' + props.id}>
        <div >
          <img src={book.cover} />
          <div className='bookInfo'>
            <div className='title'>{book.title}</div>
            <LeftRightContainer
              left={book.author}
              right={
                <>
                  <img src='/star.png' />
                  {book.rating}
                </>
              }
            />
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Book;
