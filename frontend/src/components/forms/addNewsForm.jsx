
import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import TextInput from '../inputs/textInput.jsx';
import TextArea from '../inputs/textArea.jsx';
import SectionTitle from '../layout/sectionTitle.jsx';
import FileInput from '../inputs/fileInput.jsx';
import api from '../../config/api.jsx';

const AddNewsForm = () => {
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  if (success) {
    return <Redirect to='/news/all' />;
  }

  return (
    <Formik
      initialValues={{
        header: '',
        shortDescription: '',
        description: '',
        photo: '',
      }}
      validationSchema={Yup.object({
        header: Yup.string()
          .required('Required')
          .max(50, 'Must be 50 characters or less'),
        shortDescription: Yup.string()
          .required('Required'),
        description: Yup.string()
          .required('Required'),
        yearOfPublishing: Yup.string()
          .matches(/^-?[1-9][0-9]?[0-9]?[0-9]?$/, 'Wrong year format'),
        photo: Yup.string(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        fetch(api.news(), {
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
        <TextInput type='text' name='header' label='Header' />
        <TextArea type='text' name='shortDescription' label='Short Description' />
        <TextArea type='text' name='description' label='Description' />
        <FileInput name='photo' label='Cover' />
        <div className='error'>{serverError}</div>
        <button type='submit' className='dark submit' disabled={Formik.isSubmitting}>Add News</button>
      </Form>
    </Formik >
  );
};

export default AddNewsForm;
