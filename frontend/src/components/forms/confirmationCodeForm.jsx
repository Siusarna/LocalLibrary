import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextInput from '../inputs/textInput';
import { Redirect, useParams } from 'react-router-dom';
import SectionTitle from '../layout/sectionTitle';

const ConfirmationCodeForm = () => {
  const { id } = useParams();
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  if (success) {
    return <Redirect to='/work'/>
  }

  return (
    <>
      <Formik
        initialValues={{ code: '' }}
        validationSchema={Yup.object({
          code: Yup.string()
        })}
        onSubmit={(values, { setSubmitting }) => {
          setServerError('');
          fetch('https://fathomless-ravine-92681.herokuapp.com/api/orders/confirmCode', {
            headers: { 
              'Content-Type': 'application/json',
            },
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
              code: parseInt(values.code),
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
              return res.json();
            }).then(json => console.dir({ json }));
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
