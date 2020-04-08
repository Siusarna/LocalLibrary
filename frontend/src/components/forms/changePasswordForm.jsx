
import React, { useState, useContext } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextInput from '../textInput';
import SectionTitle from '../sectionTitle';
import AuthContext from '../../context/authContext';
import { Redirect } from 'react-router-dom';

const SignUpForm = () => {
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const { updateAuth } = useContext(AuthContext);
  if (success) {
    return <Redirect to='/profile' />
  }

  return (
    <Formik
      initialValues={{
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      }}
      validationSchema={Yup.object({
        currentPassword: Yup.string()
          .required('Required'),
        newPassword: Yup.string()
          .required('Required')
          .min(8, 'Must be 8 characters or more')
          .matches(/[0-9]/, 'Must have at least one number')
          .matches(/[a-zA-Z]/, 'Must have at least one character'),
        confirmNewPassword: Yup.string()
          .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        fetch('https://fathomless-ravine-92681.herokuapp.com/api/accounts/changePassword', {
          headers: { 
            'Content-Type': 'application/json',
          },
          method: 'PUT',
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
        <TextInput type='password'  name='currentPassword'      label='Your password' />
        <TextInput type='password'  name='newPassword'          label='New password' />
        <TextInput type='password'  name='confirmNewPassword'   label='Confirm new password' />
        <div className='error'>{serverError}</div>
        <button type='submit' className='dark submit' disabled={Formik.isSubmitting}>Change Password</button>
      </Form>
    </Formik >
  );
};

export default SignUpForm;
