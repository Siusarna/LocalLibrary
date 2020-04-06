import React from 'react';
import AuthorInfo from '../components/authorInfo';
import Header from '../components/header';
import { useParams } from 'react-router-dom';

const AuthorPage = () => {
  const { id } = useParams();
  return (
    <>
      <Header />
      <AuthorInfo id={id}/>
    </>
  )
};

export default AuthorPage;