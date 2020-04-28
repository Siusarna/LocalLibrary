import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextInput from '../textInput';
import { Redirect, useParams } from 'react-router-dom';

const RejectOrderForm = () => {
  const { id } = useParams();
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  if (success) {
    return <Redirect to='/work'/>
  }

  return (
    <>
      <Formik
        initialValues={{ query: 'comment' }}
        validationSchema={Yup.object({
          comment: Yup.string()
        })}
        onSubmit={(values, { setSubmitting }) => {
          setServerError('');
          fetch('https://fathomless-ravine-92681.herokuapp.com/api/orders/confirm', {
            headers: { 
              'Content-Type': 'application/json',
            },
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify({
              comment: values.comment,
              confirmation: 'false',
              orderId: id
            }),
  
          })
            .then((res) => {
              console.dir({ res });
              if (res.status === 200) {
                setSuccess(true);
              } else {
                setServerError('Server error');
              }
              setSubmitting(false);
            })
        }}
      >
        <Form>
          <TextInput
            label='Comment'
            name='comment'
            type='comment'
          />
          <div className='error'>{serverError}</div>
          <button type='submit' className='dark submit' disabled={Formik.isSubmitting}>Reject</button>
        </Form>
      </Formik >
    </>
  );
};

export default RejectOrderForm;
