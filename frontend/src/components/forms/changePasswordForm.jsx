
import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import TextInput from '../inputs/textInput.jsx';
import SectionTitle from '../layout/sectionTitle.jsx';
import api from '../../config/api.jsx';

const SignUpForm = () => {
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  if (success) {
    return <Redirect to='/profile' />;
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
        fetch(api.account.changePassword(), {
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
        <TextInput type='password' name='currentPassword' label='Your password' />
        <TextInput type='password' name='newPassword' label='New password' />
        <TextInput type='password' name='confirmNewPassword' label='Confirm new password' />
        <div className='error'>{serverError}</div>
        <button type='submit' className='dark submit' disabled={Formik.isSubmitting}>Change Password</button>
      </Form>
    </Formik >
  );
};

export default SignUpForm;
