import React from 'react';
import ImageTextContainer from './imageTextContainer';
import SectionTitle from './sectionTitle';
import BookList from './bookList';

// Fake data
// Must be replaced by request on server
const author = {
  firstName: 'Jhon',
  lastName: 'Doe',

  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut' +
    'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi' +
    'ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum' +
    'dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia' +
    'deserunt mollit anim id est laborum.',

  dateOfBirth: '24.01.1789',
  dateOfDeath: '07.05.1847',

  image: 'https://res.cloudinary.com/domvzvfy1/image/upload/v1586194528/9f97d77545450042f2a28c407d28896f_v0ylfl.jpg',
  books: ['1', '2', '3', '4', '5', '1', '2', '3', '4', '5'],
}

const AuthorInfo = () => {
  const { image, firstName, lastName, dateOfDeath, dateOfBirth, description, books } = author;
  const fullName = firstName + ' ' + lastName;
  return (
    <div className='AuthorInfo'>
      <ImageTextContainer src={image}>
        <div className='name'>
          {fullName}
        </div>
        <p>
          {
            (dateOfBirth ? dateOfBirth : '???') + ' - ' +
              (dateOfDeath ? dateOfDeath : '???')
          }
        </p>
        <p>{description}</p>
      </ImageTextContainer>
      <SectionTitle text={'Books of ' + fullName}/>
      <BookList books={books}/>
    </div>
  )
}

export default AuthorInfo;
