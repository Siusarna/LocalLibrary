import React, { useState, useContext } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import ImageTextContainer from '../layout/imageTextContainer.jsx';
import SectionTitle from '../layout/sectionTitle.jsx';
import BookList from '../books/bookList.jsx';
import useFetch from '../../hooks/useFetch.jsx';
import api from '../../config/api.jsx';
import AuthContext from '../../context/authContext.jsx';

const deleteAuthor = (id, setRedirect) => () => {
  // eslint-disable-next-line no-alert
  const isConfirmed = window.confirm('Do you really want to delete this Author ?');
  if (isConfirmed) {
    fetch(api.authors(), {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      credentials: 'include',
      body: JSON.stringify({ id }),
    }).then((res) => {
      if (res.status === 200) {
        setRedirect(true);
      }
    });
  }
};

const AuthorInfo = () => {
  const [isRedirect, setRedirect] = useState(false);
  const { role } = useContext(AuthContext);
  const { id } = useParams();
  const { data: author, isLoaded: isAuthorLoaded } = useFetch(api.authors(id));
  const { data: books, isLoaded: isBooksLoaded } = useFetch(api.authors.books(id));

  if (!isAuthorLoaded) return true;
  if (!isBooksLoaded) return true;
  if (isRedirect) return <Redirect to='/authors/all'/>;

  const {
    photo, firstName, lastName, yearOfDeath, yearOfBirthday, description,
  } = author;
  const fullName = `${firstName} ${lastName}`;
  const life = `${yearOfBirthday || '???'} - ${yearOfDeath || '???'}`;
  return (
    <div className='AuthorInfo'>
      <ImageTextContainer src={photo}>
        <div className='name'>
          {fullName}
        </div>
        <p>{life}</p>
        <p>{description}</p>
      </ImageTextContainer>
      {(role === 'librarian' && books.length === 0)
        && <button className='dark' onClick={deleteAuthor(id, setRedirect)}>Delete Author</button>}
      {role === 'librarian' && <SectionTitle text='Update Author' to={`/authors/${id}/update`} className='center'/>}
      {books.length > 0 && <SectionTitle text={`Books of ${fullName}`} className='center'/>}
      <BookList books={books}/>
    </div>
  );
};

export default AuthorInfo;
