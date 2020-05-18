import React from 'react';
import { Link } from 'react-router-dom';
import LeftRightContainer from '../layout/leftRightContainer.jsx';

const Book = (props) => {
  const SAMPLE_COVER = 'https://res.cloudinary.com/domvzvfy1/image/upload/v1586096630/23377249_cgzt8c.jpg';
  const { book } = props;
  const authorName = `${book.firstName} ${book.lastName}`;
  return (
    <div className='Book'>
      <Link to={`/books/${book.id}`}>
        <div >
          <img src={book.photo || SAMPLE_COVER} alt='book cover'/>
          <div className='bookInfo'>
            <div className='title'>{book.title}</div>
            <LeftRightContainer
              left={authorName}
              right={book.rating
                && <>
                  <img src='/star.png' className='starIcon' alt='star (for rating)'/>
                  {book.rating}
                </>
              }
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Book;
