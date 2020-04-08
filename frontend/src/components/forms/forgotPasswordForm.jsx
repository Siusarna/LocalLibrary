
import React, { useState, useContext } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextInput from '../textInput';
import SectionTitle from '../sectionTitle';
import AuthContext from '../../context/authContext';
import { Redirect } from 'react-router-dom';

const ForgotPasswordForm = () => {
  const [ serverError, setServerError ] = useState('');
  const [ success, setSuccess ] = useState(false);
  const { updateAuth } = useContext(AuthContext);
  if (success) {
    return <Redirect to='/sign-in'/>
  }

  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={Yup.object({
        email: Yup.string()
          .required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        fetch('https://fathomless-ravine-92681.herokuapp.com/api/accounts/forgotPassword', {
          headers: { 
            'Content-Type': 'application/json',
          },
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(values),
        })
          .then((res) => {
            if (res.status === 200) {
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
        <div className='error'>{serverError}</div>
        <button type='submit' className='dark submit' disabled={Formik.isSubmitting}>Sign In</button>
      </Form>
    </Formik >
  );
};

export default ForgotPasswordForm;
