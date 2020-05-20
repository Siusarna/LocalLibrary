
import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Redirect, useParams } from 'react-router-dom';
import TextInput from '../inputs/textInput.jsx';
import TextArea from '../inputs/textArea.jsx';
import SectionTitle from '../layout/sectionTitle.jsx';
import FileInput from '../inputs/fileInput.jsx';
import api from '../../config/api.jsx';
import useFetch from '../../hooks/useFetch.jsx';

const UpdateNewsForm = () => {
  const { id } = useParams();
  const { data: news, isLoaded } = useFetch(api.news(id));
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isLoaded) return null;
  if (success) {
    return <Redirect to={`/news/${id}`} />;
  }

  return (
    <Formik
      initialValues={{
        header: news.header,
        shortDescription: news.shortDescription,
        description: news.description,
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
        if (values.photo === '') delete values.photo;
        fetch(api.news(), {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PUT',
          credentials: 'include',
          body: JSON.stringify(Object.assign(values, { id })),
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
        <button type='submit' className='dark submit' disabled={Formik.isSubmitting}>Update News</button>
      </Form>
    </Formik >
  );
};

export default UpdateNewsForm;
