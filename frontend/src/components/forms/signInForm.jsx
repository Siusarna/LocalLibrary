
import React, { useState, useContext } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextInput from '../textInput';
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
        <SectionTitle text='Forgot Password' to='/forgot-password'/>
      </Form>
    </Formik >
  );
};

export default SignInForm;
