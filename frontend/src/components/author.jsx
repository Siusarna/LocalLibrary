import React from 'react';
import { Link } from 'react-router-dom';
import LeftRightContainer from './leftRightContainer';

const Book = (props) => {
  const author = props.author;
  const fullName = author.firstName + ' ' + author.lastName;
  const life = (author.yearOfBirthday || '???') + ' - ' + (author.yearOfDeath || '???');
  return (
    <div className='Author'>
      <Link to={'/authors/' + author.id}>
        <div>
          <img src={author.photo} />
          <div className='authorInfo'>
            <div className='name'>{fullName}</div>
            <div className='life'>{life}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Book;
