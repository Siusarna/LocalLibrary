
import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextInput from '../inputs/textInput';
import TextArea from '../inputs/textArea';
import SectionTitle from '../layout/sectionTitle';
import { Redirect, useParams } from 'react-router-dom';
import FileInput from '../inputs/fileInput';
import useFetch from '../../hooks/useFetch';

const AddAuthorForm = () => {
  const { id } = useParams();
  const { data: author, isLoaded } = useFetch('https://fathomless-ravine-92681.herokuapp.com/api/authors/' + id);
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  if (!isLoaded) return true;
  if (success) {
    return <Redirect to={'/authors/' + id}/>
  }

  return (
    <Formik
      initialValues={{
        firstName: author.firstName || '',
        lastName: author.lastName || '',
        yearOfBirthday: author.yearOfBirthday || '',
        yearOfDeath: author.yearOfDeath || '',
        description: author.description || '',
        photo: author.photo || '',
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .required('Required')
          .max(20, 'Must be 20 characters or less'),
        lastName: Yup.string()
          .required('Required')
          .max(20, 'Must be 20 characters or less'),
        yearOfBirthday: Yup.string()
          .matches(/^-?[1-9][0-9]?[0-9]?[0-9]?$/, 'Wrong year format'),
        yearOfDeath: Yup.string()
          .matches(/^-?[1-9][0-9]?[0-9]?[0-9]?$/, 'Wrong year format'),
        description: Yup.string()
          .required('Required'),
        photo: Yup.string(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        values.id = id;
        fetch('https://fathomless-ravine-92681.herokuapp.com/api/authors', {
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
          })
      }}
    >
      <Form>
        <SectionTitle text='' />
        <TextInput type='text' name='firstName' label='First Name' />
        <TextInput type='text' name='lastName' label='Last Name' />
        <TextInput type='text' name='yearOfBirthday' label='Year of Birth' />
        <TextInput type='text' name='yearOfDeath' label='Year of Death' />
        <TextArea type='text' name='description' label='Description' />
        <FileInput name='photo' label='Photo' />
        <div className='error'>{serverError}</div>
        <button type='submit' className='dark submit' disabled={Formik.isSubmitting}>Update Author</button>
      </Form>
    </Formik >
  );
};

export default AddAuthorForm;
