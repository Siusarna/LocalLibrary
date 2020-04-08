import React from 'react';
import SignInForm from "../components/forms/signInForm";
import SectionTitle from '../components/sectionTitle';

const SignInPage = () => {
  return (
    <>
      <SignInForm/>
      <SectionTitle text='Forgot Password' to='/forgot-password'/>
    </>
  )
}

export default SignInPage;
