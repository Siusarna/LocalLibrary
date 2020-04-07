
import React, { useState, useContext } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextInput from '../textInput';
import Select from '../select';
import SectionTitle from '../sectionTitle';
import AuthContext from '../../context/authContext';
import { Redirect } from 'react-router-dom';

const SignInForm = () => {
  const [ serverError, setServerError ] = useState('');
  const [ success, setSuccess ] = useState(false);
  const { updateAuth } = useContext(AuthContext);
  if (success) {
    return <Redirect to='/'/>
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
      onSubmit={(values, { setSubmitting }) => {
        fetch('https://fathomless-ravine-92681.herokuapp.com/api/accounts/sign-in', {
          headers: { 
            'Content-Type': 'application/json',
          },
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(values),
        })
          .then((res) => {
            console.dir({res});
            if (res.status === 200) {
              updateAuth();
              setSuccess(true);
            }
            return res.json()
          })
          .then((json) => {
            console.dir({json});
            if (!success) {
              const error = json.message || 'Server Error';
              setServerError(error);
            }
            setSubmitting(false); 
          })
      }}
    >
      <Form>
        <SectionTitle text='' />
        <TextInput
          label="Email Address"
          name="email"
          type="email"
        />
        <TextInput
          label="Password"
          name="password"
          type="password"
        />
        <div className='error'>{serverError}</div>
        <button type='submit' className='dark submit' disabled={Formik.isSubmitting}>Sign In</button>
      </Form>
    </Formik >
  );
};

export default SignInForm;

/*
  const login = () => {
    fetch('https://aqueous-refuge-56947.herokuapp.com/api/accounts/sign-in', {
      method: 'POST',
      credentials: 'include',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        'email': 'generalTest1@gmail.com',
        'password': 'test1234'
      }),
      keepalive: true,
    })
      .then((res) => {
        updateAuth();
        return res.json()
      })
      .then((res) => console.log(res));
  }
  */