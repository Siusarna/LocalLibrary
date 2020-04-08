
import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextInput from '../textInput';
import TextArea from '../textArea';
import SectionTitle from '../sectionTitle';
import { Redirect } from 'react-router-dom';
import FileInput from '../fileInput';

const AddAuthorForm = () => {
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  if (success) {
    return <Redirect to='/books/all' />
  }

  return (
    <Formik
      initialValues={{
        authorFirstName: '',
        authorLastName: '',
        title: '',
        description: '',
        isbn: '',
        photo: '',
        yearOfPublishing: '',
        available: true,
      }}
      validationSchema={Yup.object({
        authorFirstName: Yup.string()
          .required('Required')
          .max(20, 'Must be 20 characters or less'),
        authorLastName: Yup.string()
          .required('Required')
          .max(20, 'Must be 20 characters or less'),
        title: Yup.string()
          .required('Required')
          .max(50, 'Must be 50 characters or less'),
        description: Yup.string()
          .required('Required'),
        isbn: Yup.string()
          .required('Required')
          .matches(/$[0-9]+^/, 'Wrong ISBN format'),
        yearOfPublishing: Yup.string()
          .matches(/^-?[1-9][0-9]?[0-9]?[0-9]?$/, 'Wrong year format'),
        photo: Yup.string(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        fetch('https://fathomless-ravine-92681.herokuapp.com/api/books', {
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
          })
      }}
    >
      <Form>
        <SectionTitle text='' />
        <TextInput type='text' name='title'             label='Title' />
        <TextInput type='text' name='authorFirstName'   label='Author First Name' />
        <TextInput type='text' name='authorLastName'    label='Author Last Name' />
        <TextInput type='text' name='isbn'              label='ISBN' />
        <TextInput type='text' name='yearOfPublishing'  label='year of Publishing' />
        <TextArea type='text' name='description'        label='Description' />
        <FileInput name='photo' label='Cover' />
        <div className='error'>{serverError}</div>
        <button type='submit' className='dark submit' disabled={Formik.isSubmitting}>Add Book</button>
      </Form>
    </Formik >
  );
};

export default AddAuthorForm;
