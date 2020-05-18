import React from 'react';
import { useParams } from 'react-router-dom';
import AuthorInfo from '../components/authors/authorInfo.jsx';

const AuthorPage = () => {
  const { id } = useParams();
  return (
    <>
      <AuthorInfo id={id}/>
    </>
  );
};

export default AuthorPage;
