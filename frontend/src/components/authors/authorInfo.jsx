import React, { useState } from 'react';
import ImageTextContainer from '../layout/imageTextContainer';
import SectionTitle from '../layout/sectionTitle';
import BookList from '../books/bookList';
import { useParams, Redirect } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { useContext } from 'react';
import AuthContext from '../../context/authContext';

const deleteAuthor = (id, setRedirect) => () => {
  const isConfirmed = window.confirm('Do you really want to delete this Author ?');
  if (isConfirmed) {
    fetch('https://fathomless-ravine-92681.herokuapp.com/api/authors', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      credentials: 'include',
      body: JSON.stringify({ id }),
    }).then(res => {
      if (res.status === 200) {
        setRedirect(true);
      }
    })
  }
}

const AuthorInfo = () => {
  const [isRedirect, setRedirect] = useState(false);
  const { role } = useContext(AuthContext);
  const { id } = useParams();
  const { data: author, isLoaded: isAuthorLoaded } = useFetch('https://fathomless-ravine-92681.herokuapp.com/api/authors/' + id);
  const { data: books, isLoaded: isBooksLoaded } = useFetch('https://fathomless-ravine-92681.herokuapp.com/api/authors/' + id + '/book');

  if (!isAuthorLoaded) return true;
  if (!isBooksLoaded) return true;
  if (isRedirect) return <Redirect to='/authors/all'/>

  const { photo, firstName, lastName, yearOfDeath, yearOfBirthday, description } = author;
  const fullName = firstName + ' ' + lastName;
  const life = (yearOfBirthday || '???') + ' - ' + (yearOfDeath || '???');
  return (
    <div className='AuthorInfo'>
      <ImageTextContainer src={photo}>
        <div className='name'>
          {fullName}
        </div>
        <p>{life}</p>
        <p>{description}</p>
      </ImageTextContainer>
      {(role === 'librarian' && books.length === 0) && 
        <button className='dark' onClick={deleteAuthor(id, setRedirect)}>Delete Author</button>}
      {role === 'librarian' && <SectionTitle text='Update Author' to={'/authors/' + id + '/update'} className='center'/>}
      {books.length > 0 && <SectionTitle text={'Books of ' + fullName} className='center'/>}
      <BookList books={books}/>
    </div>
  )
}

export default AuthorInfo;
