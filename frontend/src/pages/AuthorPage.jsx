import React from 'react';
import AuthorInfo from '../components/authors/authorInfo';
import { useParams } from 'react-router-dom';

const AuthorPage = () => {
  const { id } = useParams();
  return (
    <>
      <AuthorInfo id={id}/>
    </>
  )
};

export default AuthorPage;