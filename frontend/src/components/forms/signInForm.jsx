
import React, { useState, useContext } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextInput from '../textInput';
import SectionTitle from '../sectionTitle';
import AuthContext from '../../context/authContext';
import { Redirect } from 'react-router-dom';
import TelegramLoginButton from 'react-telegram-login';

const SignInForm = () => {
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const { updateAuth } = useContext(AuthContext);
  if (success) {
    return <Redirect to='/' />
  }

  const fetchAuth = url => (values, { setSubmitting }) => {
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (res.status === 200) {
          updateAuth();
          setSuccess(true);
        }
        return res.json()
      })
      .then((json) => {
        if (!success) {
          const error = json.message || 'Server Error';
          setServerError(error);
        }
        if (setSubmitting) setSubmitting(false);
      })
  }

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string()
          .required('Required'),
        password: Yup.string()
          .required('Required'),
      })}
      onSubmit={fetchAuth('http://35.242.202.122:3000/api/accounts/sign-in')}
    >
      <Form>
        <SectionTitle text='' />
        <TextInput
          label='Email Address'
          name='email'
          type='email'
        />
        <TextInput
          label='Password'
          name='password'
          type='password'
        />
        <div className='error'>{serverError}</div>
        <button type='submit' className='dark submit' disabled={Formik.isSubmitting}>Sign In</button>
        <SectionTitle text='Forgot Password' to='/forgot-password' />
        <TelegramLoginButton dataOnauth={fetchAuth('http://35.242.202.122:3000/api/accounts/telegram')} botName='teenLibraryBot'/>
      </Form>
    </Formik >
  );
};

export default SignInForm;
