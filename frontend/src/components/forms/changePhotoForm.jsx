
import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import SectionTitle from '../layout/sectionTitle.jsx';
import FileInput from '../inputs/fileInput.jsx';
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
        photo: '',
      }}
      validationSchema={Yup.object({
        photo: Yup.string()
          .required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        fetch(api.accounts.photo(), {
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
        <FileInput name='photo' label='Photo' />
        <div className='error'>{serverError}</div>
        <button type='submit' className='dark submit' disabled={Formik.isSubmitting}>Change Photo</button>
      </Form>
    </Formik >
  );
};

export default SignUpForm;
