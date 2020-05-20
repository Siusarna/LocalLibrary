import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Redirect, useParams } from 'react-router-dom';
import TextInput from '../inputs/textInput.jsx';
import SectionTitle from '../layout/sectionTitle.jsx';
import api from '../../config/api.jsx';

const ConfirmationCodeForm = () => {
  const { id } = useParams();
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  if (success) {
    return <Redirect to='/work'/>;
  }

  return (
    <>
      <Formik
        initialValues={{ code: '' }}
        validationSchema={Yup.object({
          code: Yup.string(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setServerError('');
          fetch(api.orders.confirmCode(), {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
              code: parseInt(values.code, 10),
              orderId: id,
            }),

          })
            .then((res) => {
              if (res.status === 200) {
                setSuccess(true);
              } else {
                setServerError('Server error');
              }
              setSubmitting(false);
              return res.json();
            });
        }}
      >
        <Form>
          <TextInput
            label='Code'
            name='code'
            type='code'
          />
          <div className='error'>{serverError}</div>
          <button type='submit' className='dark submit' disabled={Formik.isSubmitting}>Confirm</button>
          <SectionTitle text='Cancel' to='/work'/>
        </Form>
      </Formik >
    </>
  );
};

export default ConfirmationCodeForm;
