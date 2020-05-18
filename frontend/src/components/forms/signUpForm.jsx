
import React, { useState, useContext } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import TextInput from '../inputs/textInput.jsx';
import SectionTitle from '../layout/sectionTitle.jsx';
import AuthContext from '../../context/authContext.jsx';
import FileInput from '../inputs/fileInput.jsx';
import api from '../../config/api.jsx';

const SignUpForm = () => {
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const { updateAuth } = useContext(AuthContext);
  if (success) {
    return <Redirect to='/' />;
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        city: '',
        address: '',
        age: '',
        phone: '',
        photo: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .required('Required')
          .email('Invalid email address'),
        password: Yup.string()
          .required('Required')
          .min(8, 'Must be 8 characters or more')
          .matches(/[0-9]/, 'Must have at least one number')
          .matches(/[a-zA-Z]/, 'Must have at least one character'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        firstName: Yup.string()
          .required('Required')
          .max(20, 'Must be 20 characters or less'),
        lastName: Yup.string()
          .required('Required')
          .max(20, 'Must be 20 characters or less'),
        city: Yup.string()
          .required('Required')
          .max(20, 'Must be 20 characters or less'),
        address: Yup.string()
          .required('Required')
          .max(20, 'Must be 20 characters or less'),
        age: Yup.string()
          .required('Required')
          .matches(/^[1-9][0-9]?[0-9]?$/, 'Wrong age'),
        phone: Yup.string()
          .required('Required')
          .matches(/^\+?[0-9]+$/, 'Wrong phone number format'),
        photo: Yup.string()
          .required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        fetch(api.signUp(), {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(values),
        })
          .then((res) => {
            if (res.status === 201) {
              updateAuth();
              setSuccess(true);
            }
            return res.json();
          })
          .then((json) => {
            if (!success) {
              const error = json.message || 'Server Error';
              setServerError(error);
            }
            setSubmitting(false);
          });
      }}
    >
      <Form>
        <SectionTitle text='' />
        <TextInput type='email' name='email' label='Email' />
        <TextInput type='password' name='password' label='Password' />
        <TextInput type='password' name='confirmPassword' label='Confirm password' />
        <TextInput type='text' name='firstName' label='First Name' />
        <TextInput type='text' name='lastName' label='Last Name' />
        <TextInput type='text' name='city' label='City' />
        <TextInput type='text' name='address' label='Address' />
        <TextInput type='text' name='age' label='Age' />
        <TextInput type='text' name='phone' label='Phone Number' />
        <FileInput name='photo' label='Photo' />
        <div className='error'>{serverError}</div>
        <button type='submit' className='dark submit' disabled={Formik.isSubmitting}>Sign Up</button>
      </Form>
    </Formik >
  );
};

export default SignUpForm;
