
import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Redirect, useParams } from 'react-router-dom';
import TextInput from '../inputs/textInput.jsx';
import TextArea from '../inputs/textArea.jsx';
import SectionTitle from '../layout/sectionTitle.jsx';
import api from '../../config/api.jsx';

const AddReviewForm = () => {
  const { bookId } = useParams();
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  if (success) {
    return <Redirect to={`/books/${bookId}`} />;
  }

  return (
    <Formik
      initialValues={{
        title: '',
        content: '',
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .required('Required')
          .max(50, 'Must be 50 characters or less'),
        content: Yup.string()
          .required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        fetch(api.reviews(), {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({ ...values, bookId }),
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
        <TextInput type='text' name='title' label='Title' />
        <TextArea type='text' name='content' label='Content' />
        <div className='error'>{serverError}</div>
        <button type='submit' className='dark submit' disabled={Formik.isSubmitting}>Add Review</button>
      </Form>
    </Formik >
  );
};

export default AddReviewForm;
